require.config({
    paths: {
        'jquery': 'bower_components/jquery/jquery',
        'lodash': 'bower_components/lodash/dist/lodash.min',
        'text'  : 'bower_components/requirejs-text/text',
        'backbone': 'bower_components/backbone/backbone',
        'jquery-ui': 'bower_components/jquery-ui/ui/minified/jquery-ui.custom.min'
    },
    shim: {
        'backbone': {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },
        'jquery-ui': {
            deps: ['jquery']
        } 
    }
});

require([
    "jquery",
    "templateEditor/templateEditorView"
], function($, HTMLEditor) {
   
    var htmlEditor = new HTMLEditor();
    
    $('body').html(htmlEditor.el);

    htmlEditor.render();

    $(window).on('resize', function() {
        htmlEditor.resize.call(htmlEditor);
    });

    setTimeout(function() {
        htmlEditor.$('iframe').attr('height', '100%');
    }, 200);
});
