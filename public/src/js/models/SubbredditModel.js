var SubbredditModel = Backbone.Model.extend({
	urlRoot: '/api/subbreddits/',
	idAttribute: 'id',

	parse: function(response) {
		if (response.posts) {
			var PostsCollection = require('../collections/PostsCollection.js');
			response.posts = new PostsCollection(response.posts);
		}
		return response;
	}
});

module.exports = SubbredditModel;