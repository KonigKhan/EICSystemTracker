System.defaultJSExtensions = true;
System.config(<SystemConfig>{
    map: {
        'jquery': 'scripts/jquery-2.1.4.js',
        'knockout': 'scripts/knockout-3.4.0.js',
        'pager': 'node_modules/pagerjs/pager.js',
        'traceur': 'scripts/traceur.min.js',
        'css': '/node_modules/systemjs/plugins/css.js',
        'chartjs': 'scripts/chart.js',

        // external plugin mappings.
        'bootstrapJs': 'Scripts/bootstrap.js'
    },
    meta: {
        'scripts/kendo/2016.1.112/kendo.ui.core.min.js': {
            format: "global"
        },
        'scripts/chart.js': {
            format: "global"
        }
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
        System.import('Content/kendo/2016.1.112/kendo.default.min.css!css'),
        System.import('Content/Loader.css!css'),
        System.import('appStyles.css!css'),

        // External Plugins.
        System.import('bootstrapJs'),
        System.import('scripts/kendo/2016.1.112/kendo.ui.core.min.js'),
        System.import('scripts/chart.js')
    ]);

}).then(() => {
    // Load the main viewmodel page...
    Promise.all([
        System.import('scripts/chartjs/knockout-chartjs.js'),
        System.import('scripts/knockout/knockout-kendo.js')
    ]).then(() => {
        System.import('app.js');
    });
});