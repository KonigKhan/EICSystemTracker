import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

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

    public isLoading: KnockoutObservable<boolean> = ko.observable(false);

    public systemName: KnockoutObservable<string> = ko.observable("System Name");
    public traffic: KnockoutObservable<number> = ko.observable(0);
    public population: KnockoutObservable<number> = ko.observable(0);
    public security: KnockoutObservable<string> = ko.observable("");
    public allegiance: KnockoutObservable<string> = ko.observable("");

    public partyName: KnockoutObservable<string> = ko.observable("");
    public partyInfluence: KnockoutObservable<number> = ko.observable(0);
    public partyState: KnockoutObservable<string> = ko.observable("");
    public partyPendingState: KnockoutObservable<string> = ko.observable("");
    public partyRecoveringState: KnockoutObservable<string> = ko.observable("");

    public cmdrName: KnockoutObservable<string> = ko.observable("");



    constructor() {
        super();
        console.debug('New Start View Model!');
    }

    public submitData = () => {
        
    }
}

export default startViewModel;