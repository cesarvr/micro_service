var superagent = require('superagent')
var expect = require('chai').expect

const URL = process.env.INTEGRATION_HOST || 'http://0.0.0.0:8080';

describe('Integration Testing for ' + URL, function() {
    var id

    console.log('Testing: ' + URL);

    it('POST /user', function(done) {
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

    it('GET /user/id', function(done) {
        superagent.get(URL + '/user/' + id)
            .end(function(e, res) {

                //console.log(res.body)

                expect(e).to.eql(null)
                expect(res.body._id).to.be.equal(id);
                done()
            })
    })

    it('GET /user', function(done) {
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

    it('PUT user', function(done) {
        superagent.put(URL + '/user/' + id)
            .send({
                name: 'Peter',
                email: 'peter@yahoo.com'
            })
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(res.body).to.deep.equal({ ok: 1,  n: 1 });
                done()
            })
    })


    it('DELETE /user', function(done) {
        superagent.del(URL + '/user/' + id)
            .end(function(e, res) {
                //console.log(res.body)
                expect(e).to.eql(null)
                expect(res.body).to.eql(true)
                done()
            })
    })

    /*
        Testing decorated service.
    */
    it('POST /account', function(done) {
        superagent.post(URL + '/account')
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

    it('GET /account/id', function(done) {
        superagent.get(URL + '/account/' + id)
            .end(function(e, res) {

                //console.log(res.body)

                expect(e).to.eql(null)
                expect(res.body._id).to.be.equal(id);
                done()
            })
    })

    it('GET /account', function(done) {
        superagent.get(URL + '/account')
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

    it('PUT account', function(done) {
        superagent.put(URL + '/account/' + id)
            .send({
                name: 'Peter',
                email: 'peter@yahoo.com'
            })
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(res.body).to.deep.equal({ ok: 1,  n: 1 });
                done()
            })
    })


    it('DELETE /account', function(done) {
        superagent.del(URL + '/account/' + id)
            .end(function(e, res) {
                //console.log(res.body)
                expect(e).to.eql(null)
                expect(res.body).to.eql(true)
                done()
            })
    })


})
