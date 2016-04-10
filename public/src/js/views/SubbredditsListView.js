var Backbone = require('backbone');
var _ = require('underscore');

var SubbredditModel = require('../models/SubbredditModel.js');
var PostsListView = require('./PostsListView.js');
var SubbredditModalView = require('./SubbredditModalView.js');


var SubbredditsListView = Backbone.View.extend({
	el: '<ul></ul>',

	template: _.template('\
		<% subbreddits.each(function(subbreddit) { %>\
			<li><a id="subbreddit" data-id="<%= subbreddit.id %>" href="#"><%= subbreddit.get("name") %></a></li>\
		<% }) %>\
		<li><a href="#" id="add-subbreddit" data-reveal-id="modal">Add Subbreddit</a>\
	'),

	events: {
		'click #subbreddit': function(event) {
			event.preventDefault();
			var subbredditId = $(event.target).data('id');
			var subbreddit = new SubbredditModel({id: subbredditId});
			subbreddit.fetch({
				success: function() {
					var postsListView = new PostsListView({ 
						collection: subbreddit.get('posts')
					});
					$('#posts').html(postsListView.render().el);
				}
			});
		},

		'click #add-subbreddit': function(event) {
			var subbredditModalView = new SubbredditModalView({
				collection: this.collection
			});
			$('#modal').html(subbredditModalView.el);
			subbredditModalView.render();
		}
	},

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function() {
		this.$el.html(this.template({ subbreddits: this.collection }));
		return this;
	}
});

module.exports = SubbredditsListView;