# Basic Openshift 3.2 Node.js microservice.

## Node.js basic scaffolding

- node@v6.2.0 

- Mocha framework
 - Chai.js assertions library.
 - Sinon.js testing tool.


- Error handling mechanism.
- CORS
- BodyParser
- [Mongoskin](https://github.com/kissjs/node-mongoskin)


## How to run this


```sh
oc login https://10.2.2.2:8443   
oc create -f openshift/node-mongo.json
```


## Relevant links


- Docker
  - [Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
  - [Docker Security Bench](https://github.com/docker/docker-bench-security)
