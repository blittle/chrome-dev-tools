define([
	'backbone', 'lodash',
	'text!templateEditor/templateEditor.html',
    "templateEditor/templateContent/templateContentView",
    "templateEditor/templateControls/templateControlsView"
], function(Backbone, _, template, TemplateContentView, TemplateControlsView) {

	"use strict";

	var templateEditorView = Backbone.View.extend({

		_template: _.template(template),
		
		className: 'templateEditor',

		initialize: function(options) {
            this.controls = new TemplateControlsView(this.options);
            this.content = new TemplateContentView(this.options);

            this.controls.parent = this;
            this.content.parent = this;
		},

		render: function() {

            this.$el.html(this._template());

            this.$el.append(this.controls.el);
            this.$el.append(this.content.el);
          
            this.controls.render();
            this.content.render();

            this.resize();

			return this;
		},

        resize: function() {
            this.$el.css({
                height: $(window).height() - 84
            });

            this.content.resize();
        },

        remove: function() {
            this.controls.remove();
            this.content.remove();
            Backbone.View.prototype.remove.call(this);
        }
	});

	return templateEditorView;
});
