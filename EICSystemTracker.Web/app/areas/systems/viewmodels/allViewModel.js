var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PageViewModel_1 = require('../../../framework/domain/PageViewModel');
var knockout_1 = require('../../../lib/knockout');
var EICSystemTrackerDataController_1 = require('../controllers/EICSystemTrackerDataController');
var systemscacheservice_1 = require('../../../services/systemscacheservice');
var AllViewModel = (function (_super) {
    __extends(AllViewModel, _super);
    function AllViewModel() {
        _super.call(this);
        this.isLoading = knockout_1.default.observable(false);
        this.TrackedSystems = knockout_1.default.observableArray([]);
        this.SelectSystem = function (selected) {
            var systemUrl = 'start/systems/system/' + selected.Name;
            location.hash = systemUrl;
        };
        this.ToLocalDate = function (sys) {
            var latestTrackedFaction = sys.TrackedFactions.sort(function (a, b) {
                var dateA = new Date(a.LastUpdated);
                var dateB = new Date(b.LastUpdated);
                return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
            })[0];
            if (latestTrackedFaction) {
                var date = new Date(latestTrackedFaction.LastUpdated);
                var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                var day = date.getDate().toString().length < 2 ? '0' + date.getDate() : date.getDate();
                var hr = date.getHours().toString().length < 2 ? '0' + date.getHours() : date.getHours();
                var min = date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes();
                var sec = date.getSeconds().toString().length < 2 ? '0' + date.getSeconds() : date.getSeconds();
                var formatted = date.getFullYear() + '-' + month + '-' + day + ' ' + hr + ':' + min + ':' + sec;
                return formatted;
            }
            return "No Information";
        };
        console.log('AllViewModel ctor');
        this.TrackedSystems.subscribe(function (newListOfSystems) {
            systemscacheservice_1.default.SetSystems(newListOfSystems);
        });
    }
    AllViewModel.prototype.Shown = function () {
        _super.prototype.Shown.call(this);
        this._init();
    };
    AllViewModel.prototype._init = function () {
        var _this = this;
        this.isLoading(true);
        EICSystemTrackerDataController_1.default.GetLatestSystemTrackingData().done(function (returnData) {
            _this.TrackedSystems(returnData);
        }).always(function () {
            _this.isLoading(false);
        });
    };
    return AllViewModel;
})(PageViewModel_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllViewModel;
//# sourceMappingURL=allViewModel.js.map