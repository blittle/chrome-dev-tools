define([
	'backbone', 'lodash',
	'text!templateEditor/templatePage/templatePage.html',
    "templateEditor/element/textBlockView",
    "templateEditor/element/lineView"
], function(Backbone, _, template, TextBlockView, LineView) {

	"use strict";

    var LEGAL   = {
        x: 11,
        y: 14
    };

    var LETTER  = {
        x: 8.5,
        y: 11
    };

    var DPI = 300;

    var Element = Backbone.Model.extend();

    var ElementCollection = Backbone.Collection.extend({
        url: "",
        model: Element
    });

    var Views = {
        TextBlockView: TextBlockView,
        LineView: LineView
    };


	var templatePageView = Backbone.View.extend({
		_template: _.template(template),

		className: 'templatePage',

		initialize: function(options) {
			this.letterSize = LEGAL;

            this.collection = new ElementCollection();

            _.bindAll(this);

            this.listenTo(this.collection, "add", this.renderElements);
            this.listenTo(this.collection, "remove", this.removeElement);

            this.currentElement = new Backbone.Model();

            this.listenTo(this.currentElement, "change", this.selectElement);

            this.elementViews = {};
		},

		serialize: function() { return {}; },

		render: function() {

            this.$el.html(this._template());

            this.resize();

            this.renderElements();

			return this;
		},

        events: {
            "mousedown .element .content": "clickElement",
            "mousedown .element.line"    : "clickElement"
        },

        renderElements: function() {
            var $pageContent = this.$('.pageContent');

            $pageContent.empty();

            this.collection.each(function(element) {
                if (!this.elementViews[element.cid]) {
                    this.elementViews[element.cid] = new Views[element.get('view')]({
                        model: element
                    });

                    this.elementViews[element.cid].parent = this;
                }
            }, this);

            for (var i in this.elementViews) {
                $pageContent.append(this.elementViews[i].el);
                this.elementViews[i].render();
            }
        },

        clickElement: function(e) {
            var id = this.$(e.target).closest('.element').attr('data-model');
            this.currentElement.set({index: id});
        },

        selectElement: function(model, options) {

            var index = model.get('index');

            _.each(this.elementViews, function(element, id) {
                id === index ? element.addHandles.call(element) : element.removeHandles.call(element);
            });
        },

        removeElement: function(model, collection, options) {
            this.elementViews[model.cid].remove();
            delete this.elementViews[model.cid];
        },

        createTextBlock: function() {
            var element = this.collection.create({
                x: 0,
                y: 0,
                width: 500,
                height: 500,
                content: "",
                view: "TextBlockView"
            });

            this.currentElement.set({index: element.cid});
        },

        createLine: function(horizontal) {
            var line = this.collection.create({
                x: 1000,
                y: 200,
                width: horizontal ? 800 : 10,
                height: horizontal ? 10 : 800,
                type: horizontal ? "horizontal" : "vertical",
                view: "LineView"
            });

            this.currentElement.set({index: line.cid});
        },

        resize: function() {
            var height = this.letterSize.y * DPI,
                width  = this.letterSize.x * DPI;


            var relativeHeight = $(window).height() - 170,
                relativeWidth  = relativeHeight * (this.letterSize.x / this.letterSize.y);

            if(relativeWidth > $(window).width() - 372) {
                relativeWidth = $(window).width() - 420;
                relativeHeight = relativeWidth / (this.letterSize.x / this.letterSize.y);
            }

            this.$el.css({
                height: height,
                width: width,
                zoom: relativeWidth / width
            });

            this.$('.pageContent').css({
                margin: "150px",
                width: "-webkit-calc(100% - 300px)",
                height: "-webkit-calc(100% - 300px)"
            });
        }
	});

	return templatePageView;
});
