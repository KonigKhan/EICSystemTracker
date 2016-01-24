import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

class startViewModel extends PageViewModel {

    public dataSource = [];


    constructor() {
        super();
        console.debug('New Start View Model!');
    }
}

export default startViewModel;