System.defaultJSExtensions = true;
System.config(<SystemConfig>{
    map: {
        'jquery': 'scripts/jquery-2.1.4.min.js',
        'knockout': 'scripts/knockout-3.4.0.js',
        'pager': 'node_modules/pagerjs/pager.js',
        'traceur': 'scripts/traceur.min.js',
        'css': '/node_modules/systemjs/plugins/css.js',

        // external plugin mappings.
        'kendo': 'scripts/kendo/2016.1.112/kendo.core.min.js',
        'kendoBindings': 'scripts/knockout/kendoBindings.js',
        'bootstrapJs' : 'Scripts/bootstrap.js'
    },
    traceurOptions: {
        sourceMaps: false
    },
    buildCSS: false
});

Promise.all([

    // Load frameworks first...
    System.import('jquery'),
    System.import('knockout')


]).then(() => {

    // Load all plugins...    
    Promise.all([

        // CSS
        System.import('Content/bootstrap.css!css'),
        System.import('Content/kendo/2016.1.112/kendo.common.min.css!css'),
        System.import('appStyles.css!css'),

        // External Plugins.
        System.import('bootstrapJs'),
        System.import('kendo'),
        System.import('kendoBindings'),

        // Load the main viewmodel page...
        System.import('app.js')
    ]);

});