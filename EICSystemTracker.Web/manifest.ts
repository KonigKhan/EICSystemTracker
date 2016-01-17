// global variables
// todo: see if there is a better way to handle this.

export module Manifest {

    // TODO: Load Areas dynamically.
    export var GlobalVariables = {
        applicationName: 'EIC System Tracker',
        areas: <string[]>[
            'home',
            'systems'
        ],
        fadeSpeed: 300
    };

}

export default Manifest;