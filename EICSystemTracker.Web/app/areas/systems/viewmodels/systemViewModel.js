var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PageViewModel_1 = require('../../../framework/domain/PageViewModel');
var knockout_1 = require('../../../lib/knockout');
var EICSystemTrackerDataController_1 = require('../controllers/EICSystemTrackerDataController');
var systemscacheservice_1 = require('../../../services/systemscacheservice');
var SystemViewModel = (function (_super) {
    __extends(SystemViewModel, _super);
    function SystemViewModel() {
        var _this = this;
        _super.call(this);
        this.selectedSystem = knockout_1.default.observable(null);
        this.isLoading = knockout_1.default.observable(false);
        this.systemName = knockout_1.default.observable("");
        this.pieChartData = knockout_1.default.observableArray([]);
        this.selectedSystemChartCfg = {
            PieChartOptions: {
                segmentShowStroke: true,
                segmentStrokeColor: "#fff",
                segmentStrokeWidth: 2,
                percentageInnerCutout: 0,
                animationSteps: 200,
                animationEasing: "easeOutBounce",
                animateRotate: true,
                animateScale: false,
                legendTemplate: null //String - A legend template
            },
            PieChartData: this.pieChartData
        };
        this.selectedSystem.subscribe(function () {
            if (_this.selectedSystem()) {
                var factionChartData = _this.selectedSystem().TrackedFactions.filter(function (tf) {
                    return tf.Influence > 0;
                }).map(function (fac) {
                    return {
                        label: fac.Faction.Name,
                        value: fac.Influence,
                        color: fac.Faction.ChartColor,
                        highlight: fac.Faction.ChartColor
                    };
                });
                _this.pieChartData(factionChartData);
            }
        });
    }
    SystemViewModel.prototype.Shown = function () {
        var _this = this;
        _super.prototype.Shown.call(this);
        var sysName = location.hash.substring(location.hash.lastIndexOf("/") + 1);
        var sys = systemscacheservice_1.default.GetSystems().filter(function (s) {
            return s.Name.toLowerCase() === sysName.toLowerCase();
        })[0];
        if (sys) {
            console.info('Found System! ' + sys.Name);
            this.selectedSystem(sys);
        }
        else {
            this.isLoading(true);
            EICSystemTrackerDataController_1.default.GetLatestSystemTrackingData().done(function (returnData) {
                console.info('Found System! ' + returnData[0].Name);
                _this.selectedSystem(returnData[0]);
            }).always(function () {
                _this.isLoading(false);
            });
        }
    };
    return SystemViewModel;
})(PageViewModel_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemViewModel;
//# sourceMappingURL=systemViewModel.js.map