define([
	'backbone', 'lodash',
    "templateEditor/element/ElementContextDialog/ElementContextDialogView",
    "jquery-ui"
], function(Backbone, _, ElementContextDialogView) {

	"use strict";

    var getNumberFromPixels = function(num) {
        return parseInt(num, 10);
    };

	var elementView = Backbone.View.extend({

        className: "element",

        borderOnSelect: true,

        minDimensions: {
            x: 320,
            y: 160
        },

        attributes: {

        },

        initialize: function() {
            this.model.on("change", this.render, this);
        },

        remove: function() {
            Backbone.View.prototype.remove.call(this);
        },

        render: function() {

            if(this.setContent) {
                this.setContent();
            }

            this.$el.css({
                top: this.model.get("y") + "px",
                left: this.model.get("x") + "px",
                width: this.model.get("width") + "px",
                height: this.model.get("height") + "px"
            });

            this.$('.content').on('blur', _.bind(this.saveContent, this));

            this.$el.attr("data-model", this.model.cid);

            this.delegateEvents();

            // Put an event on the parent iframe to discontinue any drag actions on mouseup
            this.parent.parent.getFrame().on('mouseup', _.bind(this.stopDrag, this));
        },

        events: {
            "mousedown": "startDrag",
            "mousedown .content": "startDrag",
            "mouseup"  : "stopDrag",
            "mouseup .content"  : "stopDrag",
            "click": "focus",
            "contextmenu": "showMenu"
        },

        getIframe: function() {
            if(!this.$iframe) this.$iframe = this.parent.parent.getFrame('.pageContent').parent();

            return this.$iframe;
        },

        startDrag: function(e) {

            if(e.button !== 0) return;

            var $iframe = this.getIframe(),
                direction = this.$(e.target).attr('data-dir'),
                scope = this;

            this.anchor = {
                x: getNumberFromPixels(this.$el.css('left')),
                y: getNumberFromPixels(this.$el.css('top')),
                mx: e.clientX,
                my: e.clientY,
                width: this.$el.width(),
                height: this.$el.height(),
                direction: direction
            };

            if(!direction) {
                $iframe.on('mousemove.drag', _.bind(this.moveElement, this));
            } else {
                $iframe.on('mousemove.drag', _.bind(this.resizeElement, this));
            }
        },

        resizeElement: function(e) {

            var zoom    = this.parent.$el.css('zoom');

            var y = (e.clientY - this.anchor.my) / zoom,
                x = (e.clientX - this.anchor.mx) / zoom;

            var dir = this.anchor.direction;

            var width  = this.$el.width(),
                height = this.$el.height();

            var top = this.anchor.y,
                left = this.anchor.x;

            if (dir === 'se') {
                width  = this.anchor.width + x;
                height = this.anchor.height + y;
            } else if(dir === 'nw') {
                width  = this.anchor.width - x;
                height = this.anchor.height - y;
                this.setPosition(left + x, top + y);
            } else if(dir === 'sw') {
                width  = this.anchor.width - x;
                height = this.anchor.height + y;
                this.setPosition(left + x, top);
            } else if(dir === 'ne') {
                width  = this.anchor.width + x;
                height = this.anchor.height - y;
                this.setPosition(left, top + y);
            }else if(dir === 'e') {
                width = this.anchor.width + x;
            } else if(dir === 'w') {
                width = this.anchor.width - x;
                this.setPosition(left + x, top);
            } else if(dir === 's') {
                height = this.anchor.height + y;
            } else if(dir === 'n') {
                height = this.anchor.height - y;
                this.setPosition(left, top + y);
            }

            this.setDimensions(
                width < this.minDimensions.x ? this.minDimensions.x : width,
                height < this.minDimensions.y ? this.minDimensions.y : height
            );
        },

        moveElement: function(e) {

            var zoom  = this.parent.$el.css('zoom');

            var top  = this.anchor.y + (e.clientY - this.anchor.my) / zoom,
                left = this.anchor.x + (e.clientX - this.anchor.mx) / zoom;

            this.setPosition(left, top);
        },

        stopDrag: function() {
            if(this.$iframe) this.$iframe.off("mousemove.drag");
        },

        stopPropagation: function(e) {
            e.stopPropagation();
        },

        focus: function() {

            var zoom    = this.parent.$el.css('zoom'),
                left    = parseInt(this.$el.css('left'), 10),
                top     = parseInt(this.$el.css('top'), 10);
        },

        addHandles: function() {

            var scope = this;

            _.each(this.handles, function(handle) {
                scope.$el.append('<div class="handle ' + handle + '" data-dir="' + handle + '">');
            });

            this.selected = true;

            if(this.borderOnSelect) this.$el.addClass('selected');
        },

        removeHandles: function() {
            this.$('.handle').remove();

            var border = this.$el.css('border');

            this.selected = false;

            this.$el.removeClass('selected');
        },

        setBorder: function(border) {
            if(border) {
                this.$el.css({'border': 'solid black 15px'});
                this.$el.attr('data-border', true);
            } else {
                this.$el.css({'border': ""});
                this.$el.removeAttr('data-border');
            }
        },

        hasBorder: function() {
            return this.$el.attr('data-border');
        },

        enableEdit: function() {
            this.$('.content').attr('contenteditable', true);
        },

        saveContent: function() {
            this.model.set("content", this.$('.content').html(), {silent: true});
//            this.$('.content').removeAttr('contenteditable');
        },

        setPosition: function(left, top) {

            var $iframe = this.getIframe();

            var oldTop = this.model.get('y'),
                oldLeft = this.model.get('x');

            var width  = this.$el.width(),
                height = this.$el.height();

            // If the box is moved beyond the borders of the document, cancel move action
            if( left < 0 || (left + width) > $iframe.width() ) {
                left = oldLeft;
            }

            if( top < 0  || (top + height) > $iframe.height() ) {
                top = oldTop;
            }

            this.model.set({
                x: left,
                y: top
            }, {silent: true});

            this.$el.css({
                top: top,
                left: left
            });
        },

        setDimensions: function(width, height) {

            var $iframe = this.getIframe();

            if( ( this.anchor.x + width + 30 ) > $iframe.width()
                || this.anchor.y + height > $iframe.height()
                ) {
                return this.stopDrag();
            }

            this.model.set({
                width: width,
                height: height
            }, {silent: true});

            this.$el.css({
                height: height,
                width: width
            });
        },

        showMenu: function(e) {

            var scope = this;

            if(this.$menu) this.$menu.remove();

            this.menu = new ElementContextDialogView({
                model: this.model,
                element: this
            });

            this.parent.parent.getFrame().on('click.element', function(e) {
                scope.closeMenu.call(scope, e);
            });

            $(document).on('click.element', function(e) {
                scope.closeMenu.call(scope, e);
            });

            this.menu.$el.css({
                left: e.clientX + 372,
                top: e.clientY + 108,
                position: "absolute",
                "z-index": "1"
            });

            $('body').append(this.menu.el);

            this.menu.render();

            return false;
        },

        closeMenu: function(e) {
            this.menu.remove();
            $(document).off('click.element');
            this.parent.parent.getFrame().off('click.element');
        }
	});

	return elementView;
});
