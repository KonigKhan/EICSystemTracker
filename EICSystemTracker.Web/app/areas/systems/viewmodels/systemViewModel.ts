import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';
//import eicDataController from '../controllers/EICSystemDataController';

class SystemViewModel extends PageViewModel {

    SystemName: KnockoutObservable<string> = ko.observable("");

    constructor() {
        super();

        console.log('SystemViewModel ctor');
    }

    Shown() {
        super.Shown();
        var sysName: string = location.hash.substring(location.hash.lastIndexOf("/") + 1);
        this.SystemName(sysName);
    }
}

export default SystemViewModel;