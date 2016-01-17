// global variables
// todo: see if there is a better way to handle this.
var Manifest;
(function (Manifest) {
    // TODO: Load Areas dynamically.
    Manifest.GlobalVariables = {
        applicationName: 'EIC System Tracker',
        areas: [
            'home',
            'systems'
        ],
        fadeSpeed: 300
    };
})(Manifest = exports.Manifest || (exports.Manifest = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Manifest;
//# sourceMappingURL=manifest.js.map