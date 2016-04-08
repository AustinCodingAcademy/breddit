var Backbone = require('backbone');
var _ = require('underscore');

var HomeView = Backbone.View.extend({
	el:'\
		<div class="container">\
			<div class="row">\
				<div class="small-7 columns">\
					<div class="row">\
						<div class="small-12 columns" id="posts"></div>\
					</div>\
					<div class="row">\
						<div class="small-12 columns"></div>\
					</div>\
				</div>\
				<div class="small-5 columns">\
					<ul class="tabs" data-tab>\
					  <li class="tab-title active"><a href="#panel1">All</a></li>\
					  <li class="tab-title"><a href="#panel2">Subscribed</a></li>\
					</ul>\
					<div class="tabs-content">\
					  <div class="content active" id="panel1">\
					    <div id="all-subbreddits"></div>\
					  </div>\
					  <div class="content" id="panel2">\
					    <p>This is the second panel of the basic tab example. This is the second panel of the basic tab example.</p>\
					  </div>\
					</div>\
				</div>\
			</div>\
		</div>\
	',

	insertSubbreddits: function() {
		var SubbredditsCollection = require('../collections/SubbredditsCollection.js');
		var subbreddits = new SubbredditsCollection();
		subbreddits.fetch();
		var SubbredditsListView = require('./SubbredditsListView.js');
		var subbredditsListView = new SubbredditsListView({ 
			collection: subbreddits
		});
		this.$el.find('#all-subbreddits').html(subbredditsListView.render().el);
	},

	insertPosts: function() {
		var PostsCollection = require('../collections/PostsCollection.js');
		var posts = new PostsCollection();
		posts.fetch();
		var PostsListView = require('./PostsListView.js');
		var postsListView = new PostsListView({ 
			collection: posts
		});
		this.$el.find('#posts').html(postsListView.render().el);
	},

	render: function() {
		this.insertSubbreddits();
		this.insertPosts();
		$(document).foundation('reflow', 'tabs');
		return this;
	}
});

module.exports = HomeView;