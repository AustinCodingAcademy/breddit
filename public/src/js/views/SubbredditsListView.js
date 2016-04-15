var Backbone = require('backbone');
var _ = require('underscore');

var SubbredditModel = require('../models/SubbredditModel.js');
var PostsListView = require('./PostsListView.js');
var SubbredditModalView = require('./SubbredditModalView.js');


var SubbredditsListView = Backbone.View.extend({
	el: '<ul></ul>',

	template: _.template('\
		<% subbreddits.each(function(subbreddit) { %>\
			<li>\
				<a id="subbreddit" data-id="<%= subbreddit.id %>" href="#"><%= subbreddit.get("name") %></a>\
				<small><a href="#" id="subscribe" data-id="<%= subbreddit.id %>">subscribe</a></small>\
			</li>\
		<% }) %>\
		<li><a ref="#" id="add-subbreddit" data-reveal-id="modal">Add Subbreddit</a>\
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
			})
		},

		'click #subscribe': function(event) {
			var that = this;
			event.preventDefault();
			var subbredditId = $(event.target).data('id');
			console.log(subbredditId);
			$.ajax('/api/subbreddituser', {
				type: "post",
				data: {
					subbreddit_id: subbredditId
				},
				success: function() {
					if (that.currentUser) {
						var subscribedSubbreddit = that.collection.get(subbredditId);
						that.currentUser.get('subscribed_subbreddits').add(subscribedSubbreddit);
					}
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

	initialize: function(options) {
		this.listenTo(this.collection, 'update', this.render);
		this.currentUser = options.currentUser;
	},

	render: function() {
		this.$el.html(this.template({ subbreddits: this.collection }));
		return this;
	}
});

module.exports = SubbredditsListView;