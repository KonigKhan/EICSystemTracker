import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';
import eicDataController from '../controllers/EICSystemDataController';

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
            this.resetValues();
            this.isLoading(false);
        }).fail((res) => {
            //console.debug("eicDataController.UpdateSystemFactionInfo Failure: " + JSON.stringify(res));
            var errorobj = JSON.parse(res.error().responseText);
            alert("Error While Saving\r\nMessage: " + errorobj.Message + "\r\nExceptionMessage: " + errorobj.ExceptionMessage);
            this.isLoading(false);
        });

    }

    private resetValues() {

        this.systemName("");
        this.traffic(0);
        this.population(0);
        this.security("");
        this.government("");
        this.allegiance("");
        this.partyName("");
        this.partyInfluence(0);
        this.partyState("");
        this.partyPendingStates([]);
        this.partyRecoveringStates([]);
        this.partyAllegiance("");
    }
}

export default startViewModel;