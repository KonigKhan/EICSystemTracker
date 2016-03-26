import $ from '../../../lib/jquery';
import ko from '../../../lib/knockout';

import PageViewModel from '../../../framework/domain/PageViewModel';
import eicDataController from '../controllers/EICSystemTrackerDataController';
import systemsCacheService from '../services/SystemsCacheService';
import SystemUtils from '../../../framework/systemutils';

class systemsViewModel extends PageViewModel {

    public Pages = ko.observableArray<IPagerDiv>([
        <IPagerDiv>{
            config: this._page('system', 'System', 'app/areas/systems', 'system')
        },
        <IPagerDiv>{
            config: this._page('all', 'All', 'app/areas/systems', 'all')
        }
    ]);
    public Navigate = (nav: IPageNavigation) => {
        location.hash = nav.Href;
    }

    constructor() {
        super();
        console.debug('New Systems View Model!');
    }

    Shown() {
        super.Shown();
        if (location.hash === '#start/systems') {
            location.hash = 'start/systems/all';
        }
    }
}

export default systemsViewModel;