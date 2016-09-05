var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Promise = require('bluebird');

DBHandler = function(argument) {
	this.det = {
		host: 		"localhost",
		port: 		"27017",
		database: 	"israpython"
	};
};


DBHandler.prototype.get_buildins_names = function() {
	var buildins = [];

	MongoClient.connect("mongodb://" + this.det.host + ":" + this.det.port + "/" + this.det.database,
		function(err, db) {
			assert.equal(err, null);
		
			var cursor = db.collection('buildins').find({}, {'_id': 0, 'name': 1});

			cursor.forEach(function(doc) {
				buildins.push(doc.name);
			}, function(err) {
				assert.equal(err, null);
				db.close()
				return buildins;
			});
		});
};