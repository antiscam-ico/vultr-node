# NodeVultr

Official Vultr client node module.

## Installation

`npm install node-vultr`

## Usage

### Initialize
```
const vultr = require('vultr-node')

// Initialize the instance with your configuration
vultr.initialize({
  apiKey: 'your-api-key-here'
  baseUrl: 'https://example.com' // Optional
})
```

### Calling Endpoints
```
// Call endpoints using Promises
vultr.account.info().then(response => {
  console.log(response)
})
```

## Versioning

This project follows [SemVer](https://semver.org/) for versioning. 

## Documentation

This implements the V1 Vultr API. For documentation on all endpoints, please visit https://www.vultr.com/api/

## Contributing

Feel free to send pull requests our way! Please see the [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.