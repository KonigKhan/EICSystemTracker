import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';
//import eicDataController from '../controllers/EICSystemDataController';

class SystemViewModel extends PageViewModel {

    constructor() {
        super();

        console.log('SystemViewModel ctor');
    }

    Shown() {
        // TODO: Get System & It's tracked factions
    }
}

export default SystemViewModel;