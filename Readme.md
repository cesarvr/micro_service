# Basic Openshift 3.2 Node.js Microservice.

Node6, Docker & Openshift 3 ready microservice template.

## Node.js RESTful scaffolding

## Folders

### lib/routes
  [Documentation](https://github.com/cesarvr/micro_service/tree/master/lib/routes)

### controller/crud
  - Class for CRUD functionality.

### controller/
  - Put here classes to decorate crud default behaviour. (eg *you want to implement a special type of search*.)
  - [Documentation](https://github.com/cesarvr/micro_service/tree/master/lib/controller)

### db/
  - basic DB CRUD actions.
  - [DAO](https://en.wikipedia.org/wiki/Data_access_object) pattern.
  - [Documentation](https://github.com/cesarvr/micro_service/tree/master/lib/db)

### ws
  - node soap client [node-soap](https://github.com/vpulim/node-soap) for quick integration with soap endpoints service.
  - long pulling functionality plus circuit breaker.


### util/errors
  - error handling middleware.

### routers/basic
  - create a basic router with body-parser and CORS enabled.

### Dependencies

- Mocha framework
- Chai assertions library.
- CORS
- BodyParser
- [Mongoskin](https://github.com/kissjs/node-mongoskin)

## How to run this

### Openshift 3

#### Using Openshift Dashboard
![Openshift 3.x](https://github.com/cesarvr/micro_service/blob/master/docs/origin.gif)


#### Console

```sh
oc login https://10.2.2.2:8443    #if your are using vagrant box; https://ip-addr:8443 otherwise.   

# Install the openshift-template, you need to edit the template to use the appropiate builder-image for Node.js v6.
# You just need to edit the BuilderConfig object for this.  
oc create -f openshift3/node-mongo.json

oc project <your project>  # jump to the project

# create the new app, this will create two pods one node.js & mongodb.
oc new-app nodejs6-mongodb  
  -p APPLICATION_NAME=<name_of_your_app> \
     SOURCE_REPOSITORY_URL=https://github.com/cesarvr/micro_service \
     DATABASE_USER=<user> \
     DATABASE_PASSWORD=<psw> \
     DATABASE_NAME=<dbname> \
     DATABASE_ADMIN_PASSWORD=<admin_db>          
```

### Docker

```sh
# boot up your docker mongodb
# docker run -d -p 27017:27017 mongo

#clone the repo and jump inside.
docker build -t node6 .

# it just create a container and make that container mount your work(current) folder.
docker run -it -d -e "MONGO_URL=mongodb://@ip-addr:27017/test" \
       -m "300M" --memory-swap "1G" \
       -p 8080:8080 -v $(echo $PWD):/usr/src/app  \
       --name micro_service node6 node application
```

```sh
http://localhost:8080  #Service deployed here.
```
## Relevant links

### Logging
- [EFK](https://github.com/openshift/origin-aggregated-logging/tree/master/deployer)

### Containers and Orchestration
- [Openshift 3 Documentation](https://docs.openshift.com/enterprise/3.0/dev_guide/index.html)
- [Docker Docs](https://docs.docker.com/)
- [Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
- [Docker Security Bench](https://github.com/docker/docker-bench-security), good app to check vulnerabilities in your docker container.
