import $ from '../../../lib/jquery';
import ko from '../../../lib/knockout';

import PageViewModel from '../../../framework/domain/PageViewModel';
import eicDataController from '../controllers/EICSystemTrackerDataController';
import SystemUtils from '../../../framework/systemutils';

class systemsViewModel extends PageViewModel {

    public TrackedSystems: KnockoutObservableArray<IEICSystem> = ko.observableArray([]);
    public selectedSystem: KnockoutObservable<IEICSystem> = ko.observable(null);
    public isLoading: KnockoutObservable<boolean> = ko.observable(false);

    constructor() {
        super();
        console.debug('New Systems View Model!');
    }

    public SelectSystem = (selected: IEICSystem) => {
        this.selectedSystem(selected);
    }

    Shown() {
        this._init();
    }

    private _init(): void {
        this.isLoading(true);
        eicDataController.GetLatestSystemTrackingData().done((returnData: Array<IEICSystem>) => {
            //this.SystemFactions(returnData);

            //// Add to unique systems collection.
            //var uniqueSystems: Array<IEICSystem> = [];
            //for (var i = 0, len = this.SystemFactions().length; i < len; i++) {

            //    var curItem: IEICSystemFaction = this.SystemFactions()[i];
            //    var existingSystem = uniqueSystems.filter((s: IEICSystem) => {
            //        return s.Name === curItem.System.Name;
            //    })[0];

            //    if (!existingSystem) {
            //        uniqueSystems.push(curItem.System);
            //    }
            //}

            //this.TrackedSystems(uniqueSystems);
            this.TrackedSystems(returnData);

        }).always(() => {
            this.isLoading(false);
        });
    }
}

export default systemsViewModel;