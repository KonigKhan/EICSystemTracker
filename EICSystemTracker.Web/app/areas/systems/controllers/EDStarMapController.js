"use strict";
var jquery_1 = require('../../../lib/jquery');
var EDStarMapController;
(function (EDStarMapController) {
    var edStarMapBaseUrl = "http://www.edsm.net/api-v1/";
    var cacheKey = "StarMapSystems";
    // TODO: Update to use only when needed.
    function GetSystemsByName(name) {
        var searchUrl = edStarMapBaseUrl + 'systems/';
        return jquery_1.default.get(searchUrl);
    }
    EDStarMapController.GetSystemsByName = GetSystemsByName;
    ;
})(EDStarMapController || (EDStarMapController = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EDStarMapController;
//# sourceMappingURL=EDStarMapController.js.map