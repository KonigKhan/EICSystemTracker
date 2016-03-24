import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';
import eicDataController from '../controllers/EICSystemDataController';
import trackingData from './factionTrackingViewModel';

class startViewModel extends PageViewModel {

    public stateOptions: Array<string> = [
        "None",
        "Boom",
        "Bust",
        "Expansion",
        "Lockdown",
        "CivilUnrest",
        "Outbreak",
        "War",
        "Civil War",
        "Election"
    ];
    public governmentOptions: Array<string> = [
        "Corporatation",
        "Democracy",
        "Patronage",
        "Anarchy",
        "Feudalist"
    ];
    public allegianceOptions: Array<string> = [
        "Empire",
        "Federation",
        "Alliance",
        "Independent"
    ];
    public securityOptions: Array<string> = [
        "None",
        "High",
        "Medium",
        "Low"
    ];

    public isLoading: KnockoutObservable<boolean> = ko.observable(false);

    public systemName: KnockoutObservable<string> = ko.observable("");
    public traffic: KnockoutObservable<number> = ko.observable(0);
    public population: KnockoutObservable<number> = ko.observable(0);
    public security: KnockoutObservable<string> = ko.observable("");
    public government: KnockoutObservable<string> = ko.observable("Test");
    public allegiance: KnockoutObservable<string> = ko.observable("");

    public partyName: KnockoutObservable<string> = ko.observable("");
    public partyInfluence: KnockoutObservable<number> = ko.observable(0);
    public partyState: KnockoutObservable<string> = ko.observable("");
    public partyPendingStates: KnockoutObservableArray<string> = ko.observableArray([]);
    public partyRecoveringStates: KnockoutObservableArray<string> = ko.observableArray([]);
    public partyAllegiance: KnockoutObservable<string> = ko.observable("");

    public cmdrName: KnockoutObservable<string> = ko.observable("");
    public factions: KnockoutObservableArray<trackingData> = ko.observableArray([]);

    constructor() {
        super();
        console.debug('New Start View Model!');
    }

    public submitData = () => {

        // TODO: Add missing properties to entry form
        var trackedFacs: Array<IEICSystemFaction> = [];
        var arrLen = this.factions().length;
        for (var i = 0; i < arrLen; i++) {

            var curData: IEICSystemFaction = this.factions()[i].getTrackingData();
            curData.UpdatedBy = "Test abc 123";

            trackedFacs.push(curData);
        }

        var submitSystem: IEICSystem = {
            Name: this.systemName(),
            Traffic: this.traffic(),
            Population: this.population(),
            Government: this.government(),
            Allegiance: this.allegiance(),
            State: "TODO",
            Security: this.security(),
            Economy: "TODO",
            Power: "TODO",
            PowerState: "TODO",
            NeedPermit: false,
            LastUpdated: "",
            TrackedFactions: trackedFacs
        };

        try {

            this.isLoading(true);
            eicDataController.UpdateSystemFactionInfo(submitSystem).done((result) => {
                console.debug("eicDataController.UpdateSystemFactionInfo Result: " + JSON.stringify(result));
            }).fail((resError) => {
                var errorobj = JSON.parse(resError.error().responseText);
                console.error("Error While Saving\r\nMessage: " + errorobj.Message + "\r\nExceptionMessage: " + errorobj.ExceptionMessage);
            }).always(() => {
                this.isLoading(false);
            });
        }
        catch (e) {
            this.isLoading(false);
        }
    }

    public addFaction = () => {

        console.debug('addNewFaction');

        var newFactionTrackingData = new trackingData();
        this.factions.push(newFactionTrackingData);
    }

    public removeFaction = (trackedFaction: trackingData) => {
        this.factions.remove(trackedFaction);
    }

    public setControllingFaction = (faction: trackingData) => {

        var arrLen = this.factions().length;
        for (var i = 0; i < arrLen; i++) {
            var f: trackingData = this.factions()[i];
            f.controllingFaction(false);
        }

        faction.controllingFaction(true);
    }
}

export default startViewModel;