import $ from '../../../lib/jquery';
import ko from '../../../lib/knockout';

import PageViewModel from '../../../framework/domain/PageViewModel';
import eicDataController from '../controllers/EICSystemTrackerDataController';
import SystemUtils from '../../../framework/systemutils';

class systemsViewModel extends PageViewModel {

    public Pages = ko.observableArray<IPagerDiv>([
        <IPagerDiv>{
            config: this._page('trackedSystems', 'Tracked Systems', 'app/areas/systems', 'trackedSystems')
        },
        <IPagerDiv>{
            config: this._page('system', 'System', 'app/areas/systems', 'system')
        }
    ]);
    public Navigate = (nav: IPageNavigation) => {
        location.hash = nav.Href;
    }

    constructor() {
        super();
        console.debug('New Systems View Model!');


        location.hash = 'start/systems/trackedSystems';
    }
}

export default systemsViewModel;