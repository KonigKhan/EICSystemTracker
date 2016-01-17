System.defaultJSExtensions = true;
System.config({
    map: {
        'jquery': 'scripts/jquery-2.1.4.min.js',
        'knockout': 'scripts/knockout-3.4.0.js',
        'traceur': 'scripts/traceur.min.js'
    },
    traceurOptions: {
        sourceMaps: false
    }
});
System.import('app');
//# sourceMappingURL=init.js.map