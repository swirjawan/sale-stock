// Dependencies
var chai = require('chai');
var should = chai.should();
var request = require('supertest');
var server = require('../server');
var url = 'http://localhost:3000';

// Models
var Product = require('../models/product');
		
describe('A Basic Test Suite', function(){
	
	beforeEach(function(done){
		Product.remove({}, function(){
			done();
		});
	});
	
	
	afterEach(function(done){
		Product.remove({}, function(){
			done();
		});
	});
	
	describe('Product CRUD', function() {
		var path = '/api/products/';
		var body = {
			"name": "My Product",
			"sku": "ASDF1234",
			"price": 32.50
		};	
			
		it('should create a product successfully', function(done){	
			request(url)
				.post(path)
				.send(body)
				.end(function(error, response){
					response.body.name.should.equal("My Product");
					response.body.sku.should.equal("ASDF1234");
					response.body.price.should.equal(32.50);
					done();
				});
		});
		
		it('should read a product successfully', function(done){
			request(url)
				.post(path)
				.send(body)
				.end(function(error, response){
					request(url)
						.get(path + response.body._id)
						.end(function(err, res){
							res.body.name.should.equal("My Product");
							res.body.sku.should.equal("ASDF1234");
							res.body.price.should.equal(32.50);
							done();
						});
				});
		});
		
		it('should update a product successfully', function(done){
			request(url)
				.post(path)
				.send(body)
				.end(function(error, response){
					request(url)
						.put(path + response.body._id)
						.send({"name": "Cool Product"})
						.end(function(err, res){
							res.ok.should.equal(true);
							res.statusCode.should.equal(200);
							done();
						});
				});
		});
		
		it('should delete a product successfully', function(done){
			request(url)
				.post(path)
				.send(body)
				.end(function(error, response){
					request(url)
						.delete(path + response.body._id)
						.end(function(err, res){
							res.ok.should.equal(true);
							res.statusCode.should.equal(204);
							done();
						});
				});
		});
	});
});