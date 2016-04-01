"use strict";
var jquery_1 = require('../../../lib/jquery');
var EICSystemDataController = (function () {
    function EICSystemDataController() {
        //var _controller = "/api/EICSystemTrackerData/";
        this.GetSystems = function () {
            var dfd = jquery_1.default.Deferred();
            return dfd.resolve().promise();
        };
    }
    EICSystemDataController.GetLatestSystemTrackingData = function () {
        var dfd = jquery_1.default.Deferred();
        jquery_1.default.get("/api/EICSystemTrackerData/GetLatestSystemTrackingData").done(function (result) {
            dfd.resolve(result);
        });
        return dfd.promise();
    };
    EICSystemDataController.UpdateSystemFactionInfo = function (systemFaction) {
        var dfd = jquery_1.default.Deferred();
        jquery_1.default.ajax({
            type: "POST",
            url: "/api/EICSystemTrackerData/UpdateSystemFactionInfo",
            data: systemFaction,
            dataType: 'json'
        }).done(function (res) {
            dfd.resolve(res);
        }).fail(function (res) {
            dfd.reject(res);
        });
        return dfd.promise();
    };
    return EICSystemDataController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EICSystemDataController;
//# sourceMappingURL=EICSystemDataController.js.map