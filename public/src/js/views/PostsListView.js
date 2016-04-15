var Backbone = require('backbone');
var PostsListTemplate = require('../templates/PostsListTemplate.ejs');

var PostsListView = Backbone.View.extend({
	el: '<ul></ul>',

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function() {
		this.$el.html(PostsListTemplate({ posts: this.collection }));
		return this;
	}
});

module.exports = PostsListView;