define([
    "backbone",
    "lodash",
    "templateEditor/element/elementView"
], function (Backbone, _, ElementView) {

    "use strict";

    return ElementView.extend({

        className: "element",

        attributes: {

        },

        initialize: function() {

        },

        events: function() {
            return _.extend(_.clone(ElementView.prototype.events), {
                "dblclick": "enableEdit"
            });
        },

        setContent: function() {
            this.$el.html("<div id='" + this.cid + "' class='content' style='height: 100%; width: 100%; padding: 1px;'>" + this.model.get("content") + "</div>");
        },

        handles: ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w']

//        this.$el.append('<div class="handle nw" data-dir="nw">');
//    this.$el.append('<div class="handle ne" data-dir="ne">');
//    this.$el.append('<div class="handle sw" data-dir="sw">');
//    this.$el.append('<div class="handle se" data-dir="se">');
//    this.$el.append('<div class="handle n" data-dir="n">');
//    this.$el.append('<div class="handle s" data-dir="s">');
//    this.$el.append('<div class="handle e" data-dir="e">');
//    this.$el.append('<div class="handle w" data-dir="w">');
    });
});
