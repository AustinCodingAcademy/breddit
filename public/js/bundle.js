(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var HomeView = require('./views/HomeView.js');

$(document).on('ready', function() {

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  var homeView = new HomeView();
  $('#content').html(homeView.render().el);

})







},{"./views/HomeView.js":6}],2:[function(require,module,exports){
var PostModel = require('../models/PostModel.js');

var PostsCollection = Backbone.Collection.extend({
	url: '/api/posts/',
	model: PostModel
});

module.exports = PostsCollection;
},{"../models/PostModel.js":4}],3:[function(require,module,exports){
var SubbredditModel = require('../models/SubbredditModel.js');

var SubbredditsCollection = Backbone.Collection.extend({
	url: '/api/subbreddits/',
	model: SubbredditModel
});

module.exports = SubbredditsCollection;
},{"../models/SubbredditModel.js":5}],4:[function(require,module,exports){
var PostModel = Backbone.Model.extend({
	urlRoot: '/api/posts/',
	idAttribute: 'id',

	parse: function(response) {
		if (response.subbreddit) {
			var SubbredditModel = require('./SubbredditModel.js');
			response.subbreddit = new SubbredditModel(response.subbreddit);
		}
		return response;
	}
});

module.exports = PostModel;
},{"./SubbredditModel.js":5}],5:[function(require,module,exports){
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
},{"../collections/PostsCollection.js":2}],6:[function(require,module,exports){
var HomeView = Backbone.View.extend({
	el:'\
		<div class="container">\
			<div class="row">\
				<div class="three columns"></div>\
				<div class="six columns">\
					<div class="row">\
						<div class="twelve columns" id="posts"></div>\
					</div>\
					<div class="row">\
						<div class="twelve columns"></div>\
					</div>\
				</div>\
				<div class="three columns" id="all-subbreddits"></div>\
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

		return this;
	}
});

module.exports = HomeView;
},{"../collections/PostsCollection.js":2,"../collections/SubbredditsCollection.js":3,"./PostsListView.js":7,"./SubbredditsListView.js":8}],7:[function(require,module,exports){
var PostsListView = Backbone.View.extend({
	el: '<ul></ul>',
	template: _.template('\
		<% posts.each(function(post) { %>\
			<li>\
				<a href="#"><%= post.get("title") %></a>\
				<% if (post.get("subbreddit")) { %>\
					<small><%= post.get("subbreddit").get("name") %></small>\
				<% } %>\
			</li>\
		<% }) %>\
	'),

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function() {
		this.$el.html(this.template({ posts: this.collection }));
		return this;
	}
});

module.exports = PostsListView;
},{}],8:[function(require,module,exports){
var SubbredditsListView = Backbone.View.extend({
	el: '<ul></ul>',

	template: _.template('\
		<% subbreddits.each(function(subbreddit) { %>\
			<li><a data-id="<%= subbreddit.id %>" href="#"><%= subbreddit.get("name") %></a></li>\
		<% }) %>\
	'),

	events: {
		'click a': function(event) {
			event.preventDefault();
			var subbredditId = $(event.target).data('id');
			var SubbredditModel = require('../models/SubbredditModel.js');
			var subbreddit = new SubbredditModel({id: subbredditId});
			subbreddit.fetch({
				success: function() {
					var PostsListView = require('./PostsListView.js');
					var postsListView = new PostsListView({ 
						collection: subbreddit.get('posts')
					});
					$('#posts').html(postsListView.render().el);
				}
			});
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
},{"../models/SubbredditModel.js":5,"./PostsListView.js":7}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc3JjL2pzL2FwcC5qcyIsInB1YmxpYy9zcmMvanMvY29sbGVjdGlvbnMvUG9zdHNDb2xsZWN0aW9uLmpzIiwicHVibGljL3NyYy9qcy9jb2xsZWN0aW9ucy9TdWJicmVkZGl0c0NvbGxlY3Rpb24uanMiLCJwdWJsaWMvc3JjL2pzL21vZGVscy9Qb3N0TW9kZWwuanMiLCJwdWJsaWMvc3JjL2pzL21vZGVscy9TdWJicmVkZGl0TW9kZWwuanMiLCJwdWJsaWMvc3JjL2pzL3ZpZXdzL0hvbWVWaWV3LmpzIiwicHVibGljL3NyYy9qcy92aWV3cy9Qb3N0c0xpc3RWaWV3LmpzIiwicHVibGljL3NyYy9qcy92aWV3cy9TdWJicmVkZGl0c0xpc3RWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIEhvbWVWaWV3ID0gcmVxdWlyZSgnLi92aWV3cy9Ib21lVmlldy5qcycpO1xuXG4kKGRvY3VtZW50KS5vbigncmVhZHknLCBmdW5jdGlvbigpIHtcblxuICAkLmFqYXhTZXR1cCh7XG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JylcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBob21lVmlldyA9IG5ldyBIb21lVmlldygpO1xuICAkKCcjY29udGVudCcpLmh0bWwoaG9tZVZpZXcucmVuZGVyKCkuZWwpO1xuXG59KVxuXG5cblxuXG5cblxuIiwidmFyIFBvc3RNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9Qb3N0TW9kZWwuanMnKTtcblxudmFyIFBvc3RzQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcblx0dXJsOiAnL2FwaS9wb3N0cy8nLFxuXHRtb2RlbDogUG9zdE1vZGVsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0c0NvbGxlY3Rpb247IiwidmFyIFN1YmJyZWRkaXRNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9TdWJicmVkZGl0TW9kZWwuanMnKTtcblxudmFyIFN1YmJyZWRkaXRzQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcblx0dXJsOiAnL2FwaS9zdWJicmVkZGl0cy8nLFxuXHRtb2RlbDogU3ViYnJlZGRpdE1vZGVsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdWJicmVkZGl0c0NvbGxlY3Rpb247IiwidmFyIFBvc3RNb2RlbCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG5cdHVybFJvb3Q6ICcvYXBpL3Bvc3RzLycsXG5cdGlkQXR0cmlidXRlOiAnaWQnLFxuXG5cdHBhcnNlOiBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGlmIChyZXNwb25zZS5zdWJicmVkZGl0KSB7XG5cdFx0XHR2YXIgU3ViYnJlZGRpdE1vZGVsID0gcmVxdWlyZSgnLi9TdWJicmVkZGl0TW9kZWwuanMnKTtcblx0XHRcdHJlc3BvbnNlLnN1YmJyZWRkaXQgPSBuZXcgU3ViYnJlZGRpdE1vZGVsKHJlc3BvbnNlLnN1YmJyZWRkaXQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RNb2RlbDsiLCJ2YXIgU3ViYnJlZGRpdE1vZGVsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcblx0dXJsUm9vdDogJy9hcGkvc3ViYnJlZGRpdHMvJyxcblx0aWRBdHRyaWJ1dGU6ICdpZCcsXG5cblx0cGFyc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0aWYgKHJlc3BvbnNlLnBvc3RzKSB7XG5cdFx0XHR2YXIgUG9zdHNDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi4vY29sbGVjdGlvbnMvUG9zdHNDb2xsZWN0aW9uLmpzJyk7XG5cdFx0XHRyZXNwb25zZS5wb3N0cyA9IG5ldyBQb3N0c0NvbGxlY3Rpb24ocmVzcG9uc2UucG9zdHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1YmJyZWRkaXRNb2RlbDsiLCJ2YXIgSG9tZVZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG5cdGVsOidcXFxuXHRcdDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXFxuXHRcdFx0PGRpdiBjbGFzcz1cInJvd1wiPlxcXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0aHJlZSBjb2x1bW5zXCI+PC9kaXY+XFxcblx0XHRcdFx0PGRpdiBjbGFzcz1cInNpeCBjb2x1bW5zXCI+XFxcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicm93XCI+XFxcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ0d2VsdmUgY29sdW1uc1wiIGlkPVwicG9zdHNcIj48L2Rpdj5cXFxuXHRcdFx0XHRcdDwvZGl2PlxcXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJvd1wiPlxcXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidHdlbHZlIGNvbHVtbnNcIj48L2Rpdj5cXFxuXHRcdFx0XHRcdDwvZGl2PlxcXG5cdFx0XHRcdDwvZGl2PlxcXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0aHJlZSBjb2x1bW5zXCIgaWQ9XCJhbGwtc3ViYnJlZGRpdHNcIj48L2Rpdj5cXFxuXHRcdFx0PC9kaXY+XFxcblx0XHQ8L2Rpdj5cXFxuXHQnLFxuXG5cdGluc2VydFN1YmJyZWRkaXRzOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgU3ViYnJlZGRpdHNDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi4vY29sbGVjdGlvbnMvU3ViYnJlZGRpdHNDb2xsZWN0aW9uLmpzJyk7XG5cdFx0dmFyIHN1YmJyZWRkaXRzID0gbmV3IFN1YmJyZWRkaXRzQ29sbGVjdGlvbigpO1xuXHRcdHN1YmJyZWRkaXRzLmZldGNoKCk7XG5cdFx0dmFyIFN1YmJyZWRkaXRzTGlzdFZpZXcgPSByZXF1aXJlKCcuL1N1YmJyZWRkaXRzTGlzdFZpZXcuanMnKTtcblx0XHR2YXIgc3ViYnJlZGRpdHNMaXN0VmlldyA9IG5ldyBTdWJicmVkZGl0c0xpc3RWaWV3KHsgXG5cdFx0XHRjb2xsZWN0aW9uOiBzdWJicmVkZGl0c1xuXHRcdH0pO1xuXHRcdHRoaXMuJGVsLmZpbmQoJyNhbGwtc3ViYnJlZGRpdHMnKS5odG1sKHN1YmJyZWRkaXRzTGlzdFZpZXcucmVuZGVyKCkuZWwpO1xuXHR9LFxuXG5cdGluc2VydFBvc3RzOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgUG9zdHNDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi4vY29sbGVjdGlvbnMvUG9zdHNDb2xsZWN0aW9uLmpzJyk7XG5cdFx0dmFyIHBvc3RzID0gbmV3IFBvc3RzQ29sbGVjdGlvbigpO1xuXHRcdHBvc3RzLmZldGNoKCk7XG5cdFx0dmFyIFBvc3RzTGlzdFZpZXcgPSByZXF1aXJlKCcuL1Bvc3RzTGlzdFZpZXcuanMnKTtcblx0XHR2YXIgcG9zdHNMaXN0VmlldyA9IG5ldyBQb3N0c0xpc3RWaWV3KHsgXG5cdFx0XHRjb2xsZWN0aW9uOiBwb3N0c1xuXHRcdH0pO1xuXHRcdHRoaXMuJGVsLmZpbmQoJyNwb3N0cycpLmh0bWwocG9zdHNMaXN0Vmlldy5yZW5kZXIoKS5lbCk7XG5cdH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmluc2VydFN1YmJyZWRkaXRzKCk7XG5cdFx0dGhpcy5pbnNlcnRQb3N0cygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVWaWV3OyIsInZhciBQb3N0c0xpc3RWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuXHRlbDogJzx1bD48L3VsPicsXG5cdHRlbXBsYXRlOiBfLnRlbXBsYXRlKCdcXFxuXHRcdDwlIHBvc3RzLmVhY2goZnVuY3Rpb24ocG9zdCkgeyAlPlxcXG5cdFx0XHQ8bGk+XFxcblx0XHRcdFx0PGEgaHJlZj1cIiNcIj48JT0gcG9zdC5nZXQoXCJ0aXRsZVwiKSAlPjwvYT5cXFxuXHRcdFx0XHQ8JSBpZiAocG9zdC5nZXQoXCJzdWJicmVkZGl0XCIpKSB7ICU+XFxcblx0XHRcdFx0XHQ8c21hbGw+PCU9IHBvc3QuZ2V0KFwic3ViYnJlZGRpdFwiKS5nZXQoXCJuYW1lXCIpICU+PC9zbWFsbD5cXFxuXHRcdFx0XHQ8JSB9ICU+XFxcblx0XHRcdDwvbGk+XFxcblx0XHQ8JSB9KSAlPlxcXG5cdCcpLFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCAndXBkYXRlJywgdGhpcy5yZW5kZXIpO1xuXHR9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgcG9zdHM6IHRoaXMuY29sbGVjdGlvbiB9KSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RzTGlzdFZpZXc7IiwidmFyIFN1YmJyZWRkaXRzTGlzdFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG5cdGVsOiAnPHVsPjwvdWw+JyxcblxuXHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnXFxcblx0XHQ8JSBzdWJicmVkZGl0cy5lYWNoKGZ1bmN0aW9uKHN1YmJyZWRkaXQpIHsgJT5cXFxuXHRcdFx0PGxpPjxhIGRhdGEtaWQ9XCI8JT0gc3ViYnJlZGRpdC5pZCAlPlwiIGhyZWY9XCIjXCI+PCU9IHN1YmJyZWRkaXQuZ2V0KFwibmFtZVwiKSAlPjwvYT48L2xpPlxcXG5cdFx0PCUgfSkgJT5cXFxuXHQnKSxcblxuXHRldmVudHM6IHtcblx0XHQnY2xpY2sgYSc6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dmFyIHN1YmJyZWRkaXRJZCA9ICQoZXZlbnQudGFyZ2V0KS5kYXRhKCdpZCcpO1xuXHRcdFx0dmFyIFN1YmJyZWRkaXRNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9TdWJicmVkZGl0TW9kZWwuanMnKTtcblx0XHRcdHZhciBzdWJicmVkZGl0ID0gbmV3IFN1YmJyZWRkaXRNb2RlbCh7aWQ6IHN1YmJyZWRkaXRJZH0pO1xuXHRcdFx0c3ViYnJlZGRpdC5mZXRjaCh7XG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHZhciBQb3N0c0xpc3RWaWV3ID0gcmVxdWlyZSgnLi9Qb3N0c0xpc3RWaWV3LmpzJyk7XG5cdFx0XHRcdFx0dmFyIHBvc3RzTGlzdFZpZXcgPSBuZXcgUG9zdHNMaXN0Vmlldyh7IFxuXHRcdFx0XHRcdFx0Y29sbGVjdGlvbjogc3ViYnJlZGRpdC5nZXQoJ3Bvc3RzJylcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQkKCcjcG9zdHMnKS5odG1sKHBvc3RzTGlzdFZpZXcucmVuZGVyKCkuZWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sICd1cGRhdGUnLCB0aGlzLnJlbmRlcik7XG5cdH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoeyBzdWJicmVkZGl0czogdGhpcy5jb2xsZWN0aW9uIH0pKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ViYnJlZGRpdHNMaXN0VmlldzsiXX0=
