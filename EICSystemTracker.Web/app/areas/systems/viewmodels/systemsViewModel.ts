import PageViewModel from '../../../framework/domain/PageViewModel';
import starMapController from '../controllers/edstarmapcontroller';

class systemsViewModel extends PageViewModel {

    constructor() {
        super();
        console.debug('New Systems View Model!');
    }
}

export default systemsViewModel;