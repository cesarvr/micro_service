var restful_base = require('./restful');


// Just add some quick new behaviour to the CRUD. 
function restful_decorate(rest){
  
  console.log(' ## applying enhancement to restful class. ##');

  //base create
  var create = rest.CRUD.create; 
  
  rest.CRUD.create = function(service){
    console.log('creating =>', rest.params(service));
    create(service);
  }


  //base update
  var update = rest.CRUD.update; 
  
  rest.CRUD.update = function(service){
    console.log('update =>', rest.params(service));
    update(service);
  }



  return rest;
}


module.exports = restful_decorate(restful_base);
