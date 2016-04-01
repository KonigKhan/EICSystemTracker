"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PageViewModel_1 = require('../../../framework/domain/PageViewModel');
var knockout_1 = require('../../../lib/knockout');
var EICSystemTrackerDataController_1 = require('../controllers/EICSystemTrackerDataController');
var factionTrackingViewModel_1 = require('./factionTrackingViewModel');
var TrackSystemViewModel = (function (_super) {
    __extends(TrackSystemViewModel, _super);
    function TrackSystemViewModel() {
        var _this = this;
        _super.call(this);
        this.systemName = knockout_1.default.observable("");
        this.traffic = knockout_1.default.observable(0);
        this.population = knockout_1.default.observable(0);
        this.security = knockout_1.default.observable("");
        this.government = knockout_1.default.observable("");
        this.allegiance = knockout_1.default.observable("");
        this.cmdrName = knockout_1.default.observable("");
        this.factions = knockout_1.default.observableArray([]);
        this.isLoading = knockout_1.default.observable(false);
        this.stateOptions = ["None", "Boom", "Bust", "Expansion", "Lockdown", "CivilUnrest", "Outbreak", "War", "Civil War", "Election"];
        this.governmentOptions = ["Corporatation", "Democracy", "Patronage", "Anarchy", "Feudalist"];
        this.allegianceOptions = ["Empire", "Federation", "Alliance", "Independent"];
        this.securityOptions = ["None", "High", "Medium", "Low"];
        this.submitData = function () {
            // TODO: Add missing properties to entry form
            var trackedFacs = [];
            var arrLen = _this.factions().length;
            for (var i = 0; i < arrLen; i++) {
                var curData = _this.factions()[i].getTrackingData();
                curData.UpdatedBy = _this.cmdrName();
                trackedFacs.push(curData);
            }
            var submitSystem = {
                Name: _this.systemName(),
                Traffic: _this.traffic(),
                Population: _this.population(),
                Government: _this.government(),
                Allegiance: _this.allegiance(),
                State: "",
                Security: _this.security(),
                Economy: "",
                Power: "",
                PowerState: "",
                NeedPermit: false,
                LastUpdated: "",
                TrackedFactions: trackedFacs,
                ChartColor: null
            };
            try {
                _this.isLoading(true);
                EICSystemTrackerDataController_1.default.UpdateSystemFactionInfo(submitSystem).done(function (result) {
                    console.debug("eicDataController.UpdateSystemFactionInfo Result: " + JSON.stringify(result));
                    _this.reset();
                }).fail(function (resError) {
                    var errorobj = JSON.parse(resError.error().responseText);
                    var errorMsg = "Error While Saving\r\nMessage: " + errorobj.Message + "\r\nExceptionMessage: " + errorobj.ExceptionMessage;
                    console.error(errorMsg);
                    alert(errorMsg);
                }).always(function () {
                    _this.isLoading(false);
                });
            }
            catch (e) {
                alert('error while saving... ' + e);
                _this.isLoading(false);
            }
        };
        this.addFaction = function () {
            console.debug('addNewFaction');
            var newFactionTrackingData = new factionTrackingViewModel_1.default();
            _this.factions.push(newFactionTrackingData);
        };
        this.removeFaction = function (trackedFaction) {
            _this.factions.remove(trackedFaction);
        };
        this.setControllingFaction = function (faction) {
            var arrLen = _this.factions().length;
            for (var i = 0; i < arrLen; i++) {
                var f = _this.factions()[i];
                if (f.factionName !== faction.factionName) {
                    f.controllingFaction(false);
                }
            }
        };
        this.reset = function () {
            _this.systemName("");
            _this.traffic(0);
            _this.population(0);
            _this.security("");
            _this.government("");
            _this.allegiance("");
            _this.factions([]);
        };
    }
    TrackSystemViewModel.prototype.Shown = function () {
        _super.prototype.Shown.call(this);
    };
    return TrackSystemViewModel;
}(PageViewModel_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrackSystemViewModel;
//# sourceMappingURL=trackSystemViewModel.js.map