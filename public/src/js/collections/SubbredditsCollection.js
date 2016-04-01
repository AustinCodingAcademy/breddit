var Backbone = require('backbone');

var SubbredditModel = require('../models/SubbredditModel.js');

var SubbredditsCollection = Backbone.Collection.extend({
	url: '/api/subbreddits/',
	model: SubbredditModel
});

module.exports = SubbredditsCollection;