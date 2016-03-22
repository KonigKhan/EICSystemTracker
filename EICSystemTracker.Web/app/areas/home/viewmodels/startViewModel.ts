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

        // TODO: Add missing properties to entry form.
        var submitSystem: IEICSystem = {
            Id: 0,
            Name: this.systemName(),
            ControllingFaction: "Test",
            Traffic: this.traffic(),
            Population: this.population(),
            Government: this.government(),
            Allegiance: this.allegiance(),
            State: "Test",
            Security: this.security(),
            Economy: "Test",
            Power: "Test",
            PowerState: "Test",
            NeedPermit: false,
            LastUpdated: ""
        };

        var submitFaction: IEICFaction = {
            Id: 0,
            Allegiance: this.partyAllegiance(),
            Name: this.partyName()
        };

        // TODO: Add missing properties to entry form.
        var submitSystemFaction: IEICSystemFaction = {
            Id: 0,
            System: submitSystem,
            Faction: submitFaction,
            Influence: this.partyInfluence(),
            CurrentState: this.partyState(),
            PendingState: this.partyPendingStates().toString(),
            RecoveringState: this.partyRecoveringStates().toString(),
            UpdatedBy: this.cmdrName()
        };

        console.debug("Submitting form with data: " + JSON.stringify(submitSystemFaction));

        this.isLoading(true);
        eicDataController.UpdateSystemFactionInfo(submitSystemFaction).done((result) => {
            console.debug("eicDataController.UpdateSystemFactionInfo Result: " + JSON.stringify(result));
            this.isLoading(false);
        }).fail((res) => {
            //console.debug("eicDataController.UpdateSystemFactionInfo Failure: " + JSON.stringify(res));
            var errorobj = JSON.parse(res.error().responseText);
            alert("Error While Saving\r\nMessage: " + errorobj.Message + "\r\nExceptionMessage: " + errorobj.ExceptionMessage);
            this.isLoading(false);
        });

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
            // todo: set is controlling to false.
        }

        // TODO: set faction to controlling true
    }
}

export default startViewModel;