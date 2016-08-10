// Mapping function handler.
var Handler = function(errorList){
  return function(app){
      for(var i in errorList)
        app.use(errorList[i]);

    return app;
  }
}

module.exports = Handler;
