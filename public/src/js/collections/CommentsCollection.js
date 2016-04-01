var Backbone = require('backbone');

var CommentModel = require('CommentModel.js');

var CommentsCollection = Backbone.Collection.extend({
	url: '/api/comments/',
	model: CommentModel
});

module.exports = CommentsCollection;