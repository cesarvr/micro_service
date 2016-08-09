var superagent = require('superagent');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('GET /', function() {
  it('respond with json', function(done) {

    superagent.get('http://localhost:8001/')
      .end(function(e, res){

        //console.log(res.body);
        expect(e.response.status).to.eql(500);
        expect(e.response.body).to.deep.equal({error: 'Something failed!'});

        assert.isEqual(e.response.status,500, 'This should be 500');


        done();
      });
  });

  it('testing /user/', function(done) {
    superagent
    .get('http://localhost:8001/user/')
    .end(function(e, res){

        //console.log(res.body);
        expect(e.response.status).to.eql(500);
        expect(e.response.body).to.deep.equal({error: 'Something failed!'});

        assert.isEqual(e.response.status,500, 'This should be 500');

        done();
      });
  });
});
