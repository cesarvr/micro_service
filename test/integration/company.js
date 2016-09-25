var superagent = require('superagent')
var expect = require('chai').expect

const URL = process.env.INTEGRATION_HOST || 'http://0.0.0.0:8080';

describe('Integration Testing for ' + URL, function() {
    var _id = null;

    before((done) => {
        superagent.post(URL + '/company')
            .send({
                name: 'Red Hat',
                registry: '666000666'
            })
            .end(function(e, res) {
                var results = res.body.ops;

                //console.log('results: ',results);
                _id = results[0]._id

                //console.log('id: ', _id);
                done();
            })
    });

    after((done) => {
        //console.log('cleaning up:', _id);
        superagent
            .del(URL + '/company/' + _id)
            .end(function(e, res) {
                done();
            })
    })

    console.log('Testing: ' + URL);

    it('creating a new company with invalid data [POST]', function(done) {
        superagent.post(URL + '/company')
            .send({
                name: 'John',
                email: 'john@rpjs.co'
            })
            .end(function(e, res) {
                //console.log('error:', e)
                expect(e.status).to.eql(400)
                expect(res.body.message).to.eql('invalid values expected name,registry')
                done()
            })
    })


    it('creating an existing company [POST]', function(done) {
        superagent.post(URL + '/company')
            .send({
                name: 'Red Hat',
                registry: '666000666'
            })
            .end(function(e, res) {
                //console.log('error:', e)
                expect(e.status).to.eql(400)
                expect(res.body.message).to.eql('duplicated company')
                done()
            })
    })

    var __id = null;

    it('creating a new company [POST]', function(done) {
        superagent.post(URL + '/company')
            .send({
                name: 'IcBM',
                registry: '000555000'
            })
            .end(function(e, res) {
                //console.log('error:', e)

                var results = res.body.ops;
                expect(e).to.eql(null)
                expect(results.length).to.eql(1)
                expect(results[0]._id.length).to.eql(24)
                __id = results[0]._id
                done()
            })
    })


    it('removes an object', function(done) {
        //console.log('remove id: ', __id);
        superagent.del(URL + '/company/' + __id)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(res.body).to.eql(true)
                done()
            })
    })
})
