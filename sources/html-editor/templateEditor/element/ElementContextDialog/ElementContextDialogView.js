define([
	'backbone', 'lodash',
	'text!templateEditor/element/ElementContextDialog/elementContextDialog.html',
    'jquery-ui'
], function(Backbone, _, template) {

	"use strict";

	var ElementContextDialogView = Backbone.View.extend({
		_template: _.template(template),
		
		className: 'elementContextDialog whiteDialog clickWrapper',

		initialize: function(options) {
            this.$element = this.options.element.$el;
		},

		render: function() {			

            this.$el.html(this._template());

            this.$el.show("blind", 200);

			return this;
		},

        events: {
            "click .borders": "toggleBorders",
            "click .edit"   : "editElement",
            "click .delete" : "deleteElement"
        },

        toggleBorders: function() {
            this.options.element.setBorder(!this.options.element.hasBorder());
        },

        editElement: function() {
            this.options.element.enableEdit.call(this.options.element);
        },

        deleteElement: function() {
            this.options.element.parent.collection.remove(this.model.cid);
        }
	});

	return ElementContextDialogView;
});
