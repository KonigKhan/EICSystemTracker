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

System.import('app');