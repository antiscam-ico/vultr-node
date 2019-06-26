exports.initialize = config => {
  const util = require('./util')
  const account = require('./api/account')
  const app = require('./api/app')
  const auth = require('./api/auth')
  const backup = require('./api/backup')
  const block = require('./api/block')
  const plans = require('./api/plans')
  const userConfiguration = config

  /**
   * Creates a function that allows a user to pass parameters to the functions
   * defined in the returned object of the initialize function. The function returned
   * allows a user to pass parameters to the functions called by passing an Object. This
   * function will then check the endpoint configuration to ensure all parameters passed
   * are valid and complete before sending out an API request.
   *
   * @param {String} endpoint the API endpoint configuration as defined in /api
   */
  const createRequestFunction = endpoint => {
    return parameters => {
      // Check if the endpoint requires an API key
      if (endpoint.apiKeyRequired) {
        if (!userConfiguration.apiKey) {
          throw new Error(`API key required for ${endpoint.url}`)
        }
      }

      // Check if the endpoint has parameters specified
      if (endpoint.parameters) {
        if (parameters) {
          if (typeof parameters !== 'object') {
            throw new Error('Parameters must be passed in as an object.')
          } else {
            // Validate the parameters the user passed in
            let requestParameters = {}

            for (let parameter in endpoint.parameters) {
              if (
                !endpoint.parameters[parameter].optional &&
                !parameters[parameter]
              ) {
                throw new Error(`Missing parameter: ${parameter}`)
              } else if (parameters[parameter]) {
                requestParameters[parameter] = parameters[parameter]
              }
            }

            return util.makeApiRequest(
              userConfiguration,
              endpoint,
              requestParameters
            )
          }
        } else {
          // No parameters passed, check that none are required
          for (let parameter in endpoint.parameters) {
            if (!endpoint.parameters[parameter].optional) {
              throw new Error(`Missing parameter: ${parameter}`)
            }
          }
        }
      }

      // All options are validated, return a function to call the endpoint
      return util.makeApiRequest(userConfiguration, endpoint)
    }
  }

  return {
    account: {
      info: createRequestFunction(account.info)
    },
    app: {
      list: createRequestFunction(app.list)
    },
    auth: {
      info: createRequestFunction(auth.info)
    },
    backup: {
      list: createRequestFunction(backup.list)
    },
    block: {
      attach: createRequestFunction(block.attach)
    },
    plans: {
      list: createRequestFunction(plans.list)
    }
  }
}