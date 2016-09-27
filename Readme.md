# Basic Openshift 3.2 Node.js micro-service.

Docker & Openshift 3 ready micro-service template.

## Node.js basic scaffolding

- Node.js 6

- /ws
  - node soap client [node-soap](https://github.com/vpulim/node-soap) for quick integration with soap endpoints service.
  - long pulling functionality plus circuit breaker.

- /controller/crud
  - Class for CRUD functionality.

- /controller
  - put here classes to decorate crud default behaviour, *you want to implement and especial type of search*.

- /db
  - basic MongoDB actions.
  - [DAO](https://en.wikipedia.org/wiki/Data_access_object) pattern.

- /util/errors
  - error handling middleware.

- /routers/basic
  - create a basic router with body-parser and CORS enabled.


- Mocha framework
- Chai assertions library.
- Error handling mechanism.
- CORS
- BodyParser
- [Mongoskin](https://github.com/kissjs/node-mongoskin)



## How to run this

```sh
 oc login https://10.2.2.2:8443   
 oc create -f openshift/node-mongo.json
```

```sh
docker build -t node6 .
docker run -it -d -e "MONGO_URL=mongodb://@192.168.177.150:27017/test" -m "300M" --memory-swap "1G" -p 8089:8080 -v $(echo $PWD):/usr/src/app --name micro_service node6 node application
```


## Relevant links

- Docker
  - [Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
  - [Docker Security Bench](https://github.com/docker/docker-bench-security)
