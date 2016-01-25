import $ from '../../../lib/jquery';
import ko from '../../../lib/knockout';

import PageViewModel from '../../../framework/domain/PageViewModel';
import eicDataController from '../controllers/EICSystemTrackerDataController';
import SystemUtils from '../../../framework/systemutils';

class systemsViewModel extends PageViewModel {

    public SystemFactions: KnockoutObservableArray<IEICSystemFaction> = ko.observableArray([]);
    public TrackedSystems: KnockoutObservableArray<IEICSystem> = ko.observableArray([]);

    constructor() {
        super();
        console.debug('New Systems View Model!');

        this._init();
    }

    private _init(): void {
        eicDataController.GetLatestSystemTrackingData().done((returnData: Array<IEICSystemFaction>) => {
            this.SystemFactions(returnData);

            // Add to unique systems collection.
            var uniqueSystems: Array<IEICSystem> = [];
            for (var i = 0, len = this.SystemFactions().length; i < len; i++) {

                var curItem: IEICSystemFaction = this.SystemFactions()[i];
                var existingSystem = uniqueSystems.filter((s: IEICSystem) => {
                    return s.Name === curItem.System.Name;
                })[0];

                if (!existingSystem) {
                    uniqueSystems.push(curItem.System);
                }
            }

            this.TrackedSystems(uniqueSystems);
        });
    }
}

export default systemsViewModel;