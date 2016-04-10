import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

import eicDataController from '../controllers/EICSystemTrackerDataController';
import systemsCacheService from '../../../services/systemscacheservice';
import SystemUtils from '../../../framework/systemutils';
import trackingData from './factionTrackingViewModel';

class LogActivityViewModel extends PageViewModel {

    public activityTypeOptions: Array<DropDownOption> = [
        <DropDownOption>{
            Text: "Missions",
            Value: "1"
        },
        <DropDownOption>{
            Text: "Bounty Hunting",
            Value: "2"
        },
        <DropDownOption>{
            Text: "Conflict Zone",
            Value: "3"
        },
        <DropDownOption>{
            Text: "Trade",
            Value: "4"
        },
        <DropDownOption>{
            Text: "Exploration",
            Value: "5"
        },
        <DropDownOption>{
            Text: "Piracy",
            Value: "6"
        },
        <DropDownOption>{
            Text: "MurderHobo",
            Value: "7"
        }
    ];
    public cmdrName: KnockoutObservable<string> = ko.observable("");
    public activityType: KnockoutObservable<string> = ko.observable("");


    constructor() {
        super();
    }

    Shown() {
        super.Shown();
    }

}

export default LogActivityViewModel;