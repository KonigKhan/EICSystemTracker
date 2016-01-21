System.defaultJSExtensions = true;
System.config(<SystemConfig>{
    map: {
        'jquery': 'scripts/jquery-2.1.4.min.js',
        'knockout': 'scripts/knockout-3.4.0.js',
        'pager': 'node_modules/pagerjs/pager.js',
        'traceur': 'scripts/traceur.min.js'
    },
    traceurOptions: {
        sourceMaps: false
    }
});

Promise.all([
    // CSS
    System.import('content/bootstrap.css'),
    System.import('content/kendo/2016.1.112/kendo.common.min.css'),
    System.import('appStyles.css'),

    // External Plugins.
    System.import('Scripts/bootstrap.js'),
    System.import('scripts/kendo/2016.1.112/kendo.core.min.js'),
    System.import('app')
]);