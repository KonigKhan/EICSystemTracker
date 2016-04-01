"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PageViewModel_1 = require('../../../framework/domain/PageViewModel');
var startViewModel = (function (_super) {
    __extends(startViewModel, _super);
    //public stateOptions: Array<string> = [
    //    "None",
    //    "Boom",
    //    "Bust",
    //    "Expansion",
    //    "Lockdown",
    //    "CivilUnrest",
    //    "Outbreak",
    //    "War",
    //    "Civil War",
    //    "Election"
    //];
    //public governmentOptions: Array<string> = [
    //    "Corporatation",
    //    "Democracy",
    //    "Patronage",
    //    "Anarchy",
    //    "Feudalist"
    //];
    //public allegianceOptions: Array<string> = [
    //    "Empire",
    //    "Federation",
    //    "Alliance",
    //    "Independent"
    //];
    //public securityOptions: Array<string> = [
    //    "None",
    //    "High",
    //    "Medium",
    //    "Low"
    //];
    //public isLoading: KnockoutObservable<boolean> = ko.observable(false);
    //public systemName: KnockoutObservable<string> = ko.observable("");
    //public traffic: KnockoutObservable<number> = ko.observable(0);
    //public population: KnockoutObservable<number> = ko.observable(0);
    //public security: KnockoutObservable<string> = ko.observable("");
    //public government: KnockoutObservable<string> = ko.observable("Test");
    //public allegiance: KnockoutObservable<string> = ko.observable("");
    //public partyName: KnockoutObservable<string> = ko.observable("");
    //public partyInfluence: KnockoutObservable<number> = ko.observable(0);
    //public partyState: KnockoutObservable<string> = ko.observable("");
    //public partyPendingStates: KnockoutObservableArray<string> = ko.observableArray([]);
    //public partyRecoveringStates: KnockoutObservableArray<string> = ko.observableArray([]);
    //public partyAllegiance: KnockoutObservable<string> = ko.observable("");
    //public cmdrName: KnockoutObservable<string> = ko.observable("");
    //public factions: KnockoutObservableArray<trackingData> = ko.observableArray([]);
    function startViewModel() {
        _super.call(this);
        console.debug('New Start View Model!');
    }
    return startViewModel;
}(PageViewModel_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = startViewModel;
//# sourceMappingURL=startViewModel.js.map