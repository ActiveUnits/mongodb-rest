var APIeasy = require('api-easy'),
	assert = require('assert'),
	sys = require("sys");

var testContext = {};
var initialDocument = {testField: 1, testField2: 'string'};
var initialDocument2 = {testField: 2, testField2: 'string2'};
var endpoint = "/test-db/test-collection-limit-offset";

var suite = APIeasy.describe('mongodb-rest post test');
suite.discuss('When using mongodb-rest API create/retrieve')
		.use('localhost', 3000)
		.setHeader('Content-Type', 'application/json')
		.post(endpoint, initialDocument)
			.expect(200)
			.expect('should respond with created document containing ID', function(err, res, body){
				var result = JSON.parse(body);
				assert.isObject(result.data);
				assert.isString(result.data._id);
				for(var i in initialDocument)
					assert.equal(result.data[i], initialDocument[i]);
			})
		.next()
        .post(endpoint, initialDocument2)
			.expect(200)
			.expect('should respond with created document containing ID', function(err, res, body){
				var result = JSON.parse(body);
				assert.isObject(result.data);
				assert.isString(result.data._id);
				for(var i in initialDocument)
					assert.equal(result.data[i], initialDocument2[i]);
			})
		.next()
		.post(endpoint, initialDocument)
			.expect(200)
			.expect('should respond with created document containing ID', function(err, res, body){
				var result = JSON.parse(body);
				assert.isObject(result.data);
				assert.isString(result.data._id);
				for(var i in initialDocument)
					assert.equal(result.data[i], initialDocument[i]);
			})
		.next()
        .get(endpoint)
			.expect(200)
			.expect('should respond with previously updated document', function(err, res, body){
				var result = JSON.parse(body);
				
				assert.isArray(result.data);
				assert.equal(result.data.length, 3);
                assert.equal(result.allCount, 3);
			})
        .next()
        .get(endpoint+"?limit=1")
			.expect(200)
			.expect('should respond with previously updated document', function(err, res, body){
				var result = JSON.parse(body);
				
				assert.isArray(result.data);
                assert.equal(result.data.length, 1);
				assert.isString(result.data[0]._id);
				for(var i in initialDocument)
					assert.equal(result.data[0][i], initialDocument[i]);
			})
        .next()
        .get(endpoint+"?limit=1&skip=1")
			.expect(200)
			.expect('should respond with previously updated document', function(err, res, body){
				var result = JSON.parse(body);
				
				assert.isArray(result.data);
                assert.equal(result.data.length, 1);
				assert.isString(result.data[0]._id);
				for(var i in initialDocument2)
					assert.equal(result.data[0][i], initialDocument2[i]);
			})
        .next()
        .del("/test-db")
            .expect(200)
.export(module);
