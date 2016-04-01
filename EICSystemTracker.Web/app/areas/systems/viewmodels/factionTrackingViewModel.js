"use strict";
var knockout_1 = require('../../../lib/knockout');
var factionTrackingViewModel = (function () {
    function factionTrackingViewModel() {
        var _this = this;
        this.factionName = knockout_1.default.observable("");
        this.allegiance = knockout_1.default.observable("");
        this.influence = knockout_1.default.observable(0);
        this.currentState = knockout_1.default.observable("");
        this.pendingState = knockout_1.default.observableArray([]);
        this.recoveringState = knockout_1.default.observableArray([]);
        this.controllingFaction = knockout_1.default.observable(false);
        this.getTrackingData = function () {
            var faction = {
                Name: _this.factionName(),
                ChartColor: null
            };
            var trackingData = {
                Faction: faction,
                Influence: _this.influence(),
                CurrentState: _this.currentState().toString(),
                PendingState: _this.pendingState().toString(),
                RecoveringState: _this.recoveringState().toString(),
                UpdatedBy: null,
                ControllingFaction: _this.controllingFaction(),
                LastUpdated: null
            };
            return trackingData;
        };
    }
    return factionTrackingViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = factionTrackingViewModel;
//# sourceMappingURL=factionTrackingViewModel.js.map