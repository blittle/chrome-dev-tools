define([
    "backbone",
    "lodash",
    "templateEditor/element/elementView"
], function (Backbone, _, ElementView) {

    "use strict";

    return ElementView.extend({

        className: "element line",

        borderOnSelect: false,

        attributes: {
            "style": "background-color: black;"
        },

        initialize: function() {
            if(this.model.get('type') === 'horizontal') {
                this.handles = ['e', 'w'];
            } else {
                this.handles = ['n', 's'];
            }
        },

//        setContent: function() {
//            this.$el.html("<div class='content' style='height: 100%; width: 100%;'></div>");
//        },

        minDimensions: {
            x: 10,
            y: 10
        }
    });
});
