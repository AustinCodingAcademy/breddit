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

var PostCollection = Backbone.Collection.extend({
	url: '/api/posts/',
	model: PostModel
});

var PostItemView = Backbone.View.extend({
	el:'<div></div>',

	template: _.template('<h2><%= post.get("title") %></h2>'),

	render: function() {
		this.$el.html(this.template({ post: this.model }));
	}
});

var post = new PostModel({id: 1});

post.fetch({
	success: function() {
		var postItemView = new PostItemView({ model: post });
		postItemView.render();

		$('#content').html(postItemView.el);
	}
});






