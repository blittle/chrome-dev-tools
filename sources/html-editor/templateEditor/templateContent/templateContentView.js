define([
	'backbone', 'lodash',
    "templateEditor/templatePage/templatePageView"
], function(Backbone, _, PageView) {

	"use strict";

	var templateContentView = Backbone.View.extend({

        tagName: "iframe",

		initialize: function(options) {
			this.collection = new Backbone.Collection([
                {
                    id: _.uniqueId("tpage_"),
                    blocks: []
                }
            ]);

            this.pageViews = [];
		},

        getFrame: function(selector) {
            return selector ? this.$el.contents().find(selector) : this.$el.contents();
        },

		render: function() {

            this.getFrame('head').append($("<link/>",
                { rel: "stylesheet", href: "templateEditor/templatePage/template.css", type: "text/css" }
            ));

            this.collection.each(this.buildPage, this);

            this.$el.addClass('templateContent');

			return this;
		},

        buildPage: function(page, index) {

            var pageView = new PageView({
                model: page
            });

            pageView.parent = this;

            this.getFrame('body').append(pageView.el);

            pageView.render();

            this.pageViews.push(pageView);
        },

        resize: function() {
            _.each(this.pageViews, function(pageView) {
                pageView.resize();
            });
        }
	});

	return templateContentView;
});
