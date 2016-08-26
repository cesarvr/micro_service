var superagent = require('superagent')
var expect = require('chai').expect

const URL = process.env.INTEGRATION_HOST || 'http://0.0.0.0:8001';

describe('Integration Testing for ' + URL, function() {
    var id

    console.log('Testing: ' + URL);

    it('post object', function(done) {
        superagent.post(URL + '/user')
            .send({
                name: 'John',
                email: 'john@rpjs.co'
            })
            .end(function(e, res) {
                //  console.log(res.body)
                var results = res.body.ops;
                expect(e).to.eql(null)
                expect(results.length).to.eql(1)
                expect(results[0]._id.length).to.eql(24)
                id = results[0]._id
                done()
            })
    })

    it('retrieves an object', function(done) {
        superagent.get(URL + '/user/' + id)
            .end(function(e, res) {

                //console.log(res.body)

                expect(e).to.eql(null)
                expect(res.body._id).to.be.equal(id);
                done()
            })
    })

    it('retrieves a collection', function(done) {
        superagent.get(URL + '/user')
            .end(function(e, res) {
                //console.log(res.body)
                //console.log(e)
                var results = res.body;

                expect(e).to.eql(null)
                expect(results.length).to.be.above(0)
                expect(results.map(function(item) {
                    return item._id
                })).to.contain(id)
                done()
            })
    })

    it('updates an object', function(done) {
        superagent.put(URL + '/user/' + id)
            .send({
                name: 'Peter',
                email: 'peter@yahoo.com'
            })
            .end(function(e, res) {
                // console.log(res.body)
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body.msg).to.eql('success')
                done()
            })
    })


    it('removes an object', function(done) {
        superagent.del(URL + '/user/' + id)
            .end(function(e, res) {
                //console.log(res.body)
                expect(e).to.eql(null)
                expect(res.body).to.eql(true)
                done()
            })
    })


})
