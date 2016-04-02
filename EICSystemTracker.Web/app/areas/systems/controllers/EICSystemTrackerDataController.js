var jquery_1 = require('../../../lib/jquery');
var EICSystemTrackerDataController = (function () {
    function EICSystemTrackerDataController() {
        //var _controller = "/api/EICSystemTrackerData/";
        this.GetSystems = function () {
            var dfd = jquery_1.default.Deferred();
            return dfd.resolve().promise();
        };
    }
    EICSystemTrackerDataController.GetLatestSystemTrackingData = function () {
        var dfd = jquery_1.default.Deferred();
        jquery_1.default.get("/api/EICSystemTrackerData/GetLatestSystemTrackingData").done(function (result) {
            dfd.resolve(result);
        });
        return dfd.promise();
    };
    EICSystemTrackerDataController.GetSystem = function (systemName) {
        var dfd = jquery_1.default.Deferred();
        jquery_1.default.get("/api/EICSystemTrackerData/GetSystem?systemName=" + systemName).done(function (result) {
            dfd.resolve(result);
        });
        return dfd.promise();
    };
    EICSystemTrackerDataController.UpdateSystemFactionInfo = function (systemFaction) {
        var dfd = jquery_1.default.Deferred();
        jquery_1.default.ajax({
            type: "POST",
            url: "/api/EICSystemTrackerData/UpdateSystemFactionInfo",
            data: systemFaction,
            success: function (res) {
                dfd.resolve(res);
            },
            dataType: 'json'
        });
        return dfd.promise();
    };
    return EICSystemTrackerDataController;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EICSystemTrackerDataController;
//# sourceMappingURL=EICSystemTrackerDataController.js.map