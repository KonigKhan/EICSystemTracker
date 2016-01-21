import PageViewModel from '../../../framework/domain/PageViewModel';
import starMapController from '../controllers/edstarmapcontroller';
import SystemUtils from '../../../framework/systemutils';

class systemsViewModel extends PageViewModel {

    constructor() {
        super();
        console.debug('New Systems View Model!');
        //starMapController.GetSystems().done((data: IEDStarMapSystem[]) => {
        //    console.debug("GetSystems Returns: " + data);
        //});
    }
}

export default systemsViewModel;