import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

import eicDataController from '../controllers/EICSystemTrackerDataController';
import systemsCacheService from '../../../services/systemscacheservice';
import SystemUtils from '../../../framework/systemutils';
import trackingData from './factionTrackingViewModel';

class LogActivityViewModel extends PageViewModel {

    constructor() {
        super();
    }

    Shown() {
        super.Shown();
    }

}

export default LogActivityViewModel;