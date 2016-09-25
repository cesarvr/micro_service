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

```sh
docker build -t node6 .
docker run -it -d -e "MONGO_URL=mongodb://@192.168.177.150:27017/test" -m "300M" --memory-swap "1G" -p 8089:8080 -v $(echo $PWD):/usr/src/app --name micro_service node6 node application 
```



## Relevant links


- Docker
  - [Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
  - [Docker Security Bench](https://github.com/docker/docker-bench-security)

