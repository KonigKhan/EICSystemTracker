var jquery_1 = require('../../../lib/jquery');
var systemutils_1 = require('../../../framework/systemutils');
var EDStarMapController;
(function (EDStarMapController) {
    var edStarMapBaseUrl = "http://www.edsm.net/api-v1/";
    var cacheKey = "StarMapSystems";
    function GetSystems(resetCache) {
        var dfd = jquery_1.default.Deferred();
        if (!resetCache && systemutils_1.default.GetSessionCacheValue(cacheKey) !== null) {
            console.debug("get star map data from local storage...");
            var allSystems = systemutils_1.default.GetSessionCacheValue(cacheKey);
            dfd.resolve(allSystems);
        }
        else {
            console.debug("get star map data from edsm web service...");
            var searchUrl = edStarMapBaseUrl + 'systems';
            jquery_1.default.get(searchUrl).done(function (rtnData) {
                console.debug("store data from edsm service in session cache...");
                //tempCache = rtnData;
                systemutils_1.default.AddToSessionCache(cacheKey, rtnData);
                console.debug("return edsm systems...");
                var allSystems = systemutils_1.default.GetSessionCacheValue(cacheKey);
                dfd.resolve(allSystems);
            }).fail(function () {
                console.error("Failed SearchSystemsByName");
                dfd.reject();
            });
        }
        return dfd.promise();
    }
    EDStarMapController.GetSystems = GetSystems;
    ;
})(EDStarMapController || (EDStarMapController = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EDStarMapController;
//# sourceMappingURL=EDStarMapController.js.map