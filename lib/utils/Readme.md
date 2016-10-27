# Utilities folder.

Here we can find:

## Error Handling
  Error handling modules to report errors and return generic error responses.

## DB Discovery
  Modules that help with the discovery of nearby services. For more information, check [sdiscovery module](https://www.npmjs.com/package/sdiscovery).


```javascript
// discovery example.
let discover = require('./discover');

//assuming you have deploy a kube-service called mongodb.
discover('mongodb'); // you get back {service:'cluster ip address', port:''....}

```
