import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

import eicDataController from '../controllers/EICSystemTrackerDataController';
import systemsCacheService from '../services/SystemsCacheService';
import SystemUtils from '../../../framework/systemutils';

class AllViewModel extends PageViewModel {

    public isLoading: KnockoutObservable<boolean> = ko.observable(false);
    public TrackedSystems: KnockoutObservableArray<IEICSystem> = ko.observableArray([]);

    constructor() {
        super();

        console.log('AllViewModel ctor');

        this.TrackedSystems.subscribe((newListOfSystems: Array<IEICSystem>) => {
            systemsCacheService.SetSystems(newListOfSystems);
        });
    }

    Shown() {
        super.Shown();
        this._init();
    }

    public SelectSystem = (selected: IEICSystem) => {
        var systemUrl = 'start/systems/system/' + selected.Name
        location.hash = systemUrl;
    }

    private _init(): void {
        this.isLoading(true);
        eicDataController.GetLatestSystemTrackingData().done((returnData: Array<IEICSystem>) => {
            
            this.TrackedSystems(returnData);

        }).always(() => {
            this.isLoading(false);
        });
    }
}

export default AllViewModel;