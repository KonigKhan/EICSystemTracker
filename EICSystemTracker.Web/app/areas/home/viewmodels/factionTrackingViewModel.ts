import ko from '../../../lib/knockout';

class factionTrackingViewModel {

    public factionName: KnockoutObservable<string> = ko.observable("");
    public allegiance: KnockoutObservable<string> = ko.observable("");
    public influence: KnockoutObservable<number> = ko.observable(0);
    public currentState: KnockoutObservable<string> = ko.observable("");
    public pendingState: KnockoutObservableArray<string> = ko.observableArray([]);
    public recoveringState: KnockoutObservableArray<string> = ko.observableArray([]);
    public controllingFaction: KnockoutObservable<boolean> = ko.observable(false);

    public getTrackingData = (): IEICSystemFaction => {

        var faction: IEICFaction = {
            Name: this.factionName()
        };

        var trackingData: IEICSystemFaction = {
            Faction: faction,
            Influence: this.influence(),
            CurrentState: this.currentState().toString(),
            PendingState: this.pendingState().toString(),
            RecoveringState: this.recoveringState().toString(),
            UpdatedBy: null,
            ControllingFaction: this.controllingFaction(),
            LastUpdated: null
        };

        return trackingData;
    };
}

export default factionTrackingViewModel;