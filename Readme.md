# Basic Openshift 3.2 Node.js micro-service.

Node6, Docker & Openshift 3 ready micro-service template.

## Node.js RESTful scaffolding

## Folders:

### ws
  - node soap client [node-soap](https://github.com/vpulim/node-soap) for quick integration with soap endpoints service.
  - long pulling functionality plus circuit breaker.

### controller/crud
  - Class for CRUD functionality.

### controller/
  - Put here classes to decorate crud default behaviour, *you want to implement and especial type of search*.

### db/
  - basic DB CRUD actions.
  - [DAO](https://en.wikipedia.org/wiki/Data_access_object) pattern.

### util/errors
  - error handling middleware.

### routers/basic
  - create a basic router with body-parser and CORS enabled.

- Mocha framework
- Chai assertions library.
- Error handling mechanism.
- CORS
- BodyParser
- [Mongoskin](https://github.com/kissjs/node-mongoskin)

## How to run this

### Openshift 3

```sh
 oc login https://10.2.2.2:8443    #if your are using vagrant box; https://ip-addr:8443 otherwise.   
 oc create -f openshift3/node-mongo.json
```

### Docker

```sh
# boot up your docker mongodb
# docker run -d -p 27017:27017 mongo

#clone the repo and jump inside.
docker build -t node6 .
docker run -it -d -e "MONGO_URL=mongodb://@ip-addr:27017/test" -m "300M" --memory-swap "1G" -p 8080:8080 -v $(echo $PWD):/usr/src/app --name micro_service node6 node application
```

```sh
  http://localhost:8080
```
## Relevant links

  - [Docker Docs](https://docs.docker.com/)
  - [Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
  - [Docker Security Bench](https://github.com/docker/docker-bench-security), good app to check vulnerabilities in your docker container.
