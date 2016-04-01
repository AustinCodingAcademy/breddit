var Backbone = require('backbone');

var CommentModel = Backbone.Model.extend({
	urlRoot: '/api/comments/',
	idAttribute: 'id'
});

module.exports = CommentModel;