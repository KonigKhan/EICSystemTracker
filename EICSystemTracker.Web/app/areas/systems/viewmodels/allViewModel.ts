import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

import eicDataController from '../controllers/EICSystemTrackerDataController';
import systemsCacheService from '../../../services/systemscacheservice';
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

    public ToLocalDate = (sys: IEICSystem): string => {
        var latestTrackedFaction: IEICSystemFaction = (<Array<IEICSystemFaction>>sys.TrackedFactions).sort((a: IEICSystemFaction, b: IEICSystemFaction) => {
            var dateA = new Date(a.LastUpdated);
            var dateB = new Date(b.LastUpdated);
            return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
        })[0];

        if (latestTrackedFaction) {
            var date = new Date(latestTrackedFaction.LastUpdated);
            var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            var day = date.getDate().toString().length < 2 ? '0' + date.getDate() : date.getDate();
            var hr = date.getHours().toString().length < 2 ? '0' + date.getHours() : date.getHours();
            var min = date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes();
            var sec = date.getSeconds().toString().length < 2 ? '0' + date.getSeconds() : date.getSeconds();

            var formatted = date.getFullYear() + '-' + month + '-' + day + ' ' + hr + ':' + min + ':' + sec;    
            return formatted;
        }

        return "No Information";
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