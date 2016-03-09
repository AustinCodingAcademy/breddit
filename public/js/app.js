'use strict';

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var PostModel = Backbone.Model.extend({
	urlRoot: '/api/posts/',
	idAttribute: 'id',
});

var SubbredditModel = Backbone.Model.extend({
	urlRoot: '/api/subbreddits/',
	idAttribute: 'id'
});

var CommentModel = Backbone.Model.extend({
	urlRoot: '/api/comments/',
	idAttribute: 'id'
});

var PostsCollection = Backbone.Collection.extend({
	url: '/api/posts/',
	model: PostModel
});

var SubbredditsCollection = Backbone.Collection.extend({
	url: '/api/subbreddits/',
	model: SubbredditModel
});

var CommentsCollection = Backbone.Collection.extend({
	url: '/api/comments/',
	model: CommentModel
});

var PostItemView = Backbone.View.extend({
	el:'<li class="hello"></li>',

	template: _.template('<h2><%= post.get("title") %></h2>'),

	events: {
		'click h2': function(e) {
			this.model.destroy();
		}
	},

	initialize: function() {
		// this.listenTo(this.model, 'all', function() {
		// 	console.log(arguments);
		// });
		this.listenTo(this.model, 'sync', this.render);
	},

	render: function() {
		this.$el.html(this.template({ post: this.model }));
	}
});

var PostsListView = Backbone.View.extend({
	el: '<ul></ul>',

	template: undefined,

	initialize: function() {
		this.listenTo(this.collection, 'all', function(event) {
			console.log(event);
		});
		this.listenTo(this.collection, 'sync update', this.render);
	},

	render: function() {
		var that = this;
		this.$el.html('');
		this.collection.each(function(postModel) {
			var postItemView = new PostItemView({ model: postModel });
			postItemView.render();
			that.$el.append(postItemView.el);
		});
		return this;
	}
});

var posts = new PostsCollection();

posts.fetch();

var postsListView = new PostsListView({collection: posts});
postsListView.render();

$('#content').html(postsListView.el);
console.log('view inserted!');


