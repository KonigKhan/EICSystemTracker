import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

class startViewModel extends PageViewModel {

    public dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: 'http://edsm.net/api-v1/systems',
                dataType: "json"
            }
        }
    });


    constructor() {
        super();
        console.debug('New Start View Model!');
    }
}

export default startViewModel;