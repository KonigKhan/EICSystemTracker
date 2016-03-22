import ko from '../../../lib/knockout';

class factionTrackingViewModel {

    public factionName: KnockoutObservable<string> = ko.observable("");
    public allegiance: KnockoutObservable<string> = ko.observable("");
    public influence: KnockoutObservable<number> = ko.observable(0);
    public currentState: KnockoutObservable<string> = ko.observable("");
    public pendingState: KnockoutObservableArray<string> = ko.observableArray([]);
    public recoveringState: KnockoutObservableArray<string> = ko.observableArray([]);

    public getTrackingData = (): IEICSystemFaction => {

        var faction: IEICFaction = {
            Id: 0,
            Allegiance: this.allegiance(),
            Name: this.factionName()
        };

        var trackingData: IEICSystemFaction = {
            Id: 0,
            System: null,
            Faction: faction,
            Influence: this.influence(),
            CurrentState: this.currentState(),
            PendingState: this.pendingState().toString(),
            RecoveringState: this.recoveringState().toString(),
            UpdatedBy: null
        };

        return trackingData;
    };
}

export default factionTrackingViewModel;