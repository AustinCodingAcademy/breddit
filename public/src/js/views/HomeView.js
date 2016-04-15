var Backbone = require('backbone');
var _ = require('underscore');

var SubbredditsListView = require('./SubbredditsListView.js');
var SubbredditsCollection = require('../collections/SubbredditsCollection.js');
var PostsCollection = require('../collections/PostsCollection.js');
var UserModel = require('../models/UserModel.js');
var HomeTemplate = require('../templates/HomeTemplate.ejs');


var HomeView = Backbone.View.extend({
	el:'<div class="container"></div>',

	currentUser: new UserModel({id: $('[data-user-id]').data('user-id')}),

	insertAllSubbreddits: function() {
		var subbreddits = new SubbredditsCollection();
		subbreddits.fetch();
		var subbredditsListView = new SubbredditsListView({ 
			collection: subbreddits,
			currentUser: this.currentUser
		});
		this.$el.find('#all-subbreddits').html(subbredditsListView.render().el);
	},

	insertSubscribedSubbreddits: function() {
		var that = this;
	  
		this.currentUser.fetch({
			success: function() {
				var subbredditsListView = new SubbredditsListView({ 
					collection: that.currentUser.get('subscribed_subbreddits')
				});

				that.$el.find('#subscribed-subbreddits').html(subbredditsListView.el);
  			subbredditsListView.render();
			}
		});
	},

	insertPosts: function() {
		var posts = new PostsCollection();
		posts.fetch();
		var PostsListView = require('./PostsListView.js');
		var postsListView = new PostsListView({ 
			collection: posts
		});
		this.$el.find('#posts').html(postsListView.render().el);
	},

	render: function() {
		this.$el.html(HomeTemplate());
		this.insertAllSubbreddits();
		this.insertSubscribedSubbreddits();
		this.insertPosts();
		$(document).foundation('reflow', 'tabs');
		return this;
	}
});

module.exports = HomeView;