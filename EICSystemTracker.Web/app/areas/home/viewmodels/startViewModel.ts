import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

class startViewModel extends PageViewModel {

    public colorPalette: KnockoutObservable<string> = ko.observable("basic");
    public selectedChoice: KnockoutObservable<string> = ko.observable("#ffffff");

    constructor() {
        super();
        console.debug('New Start View Model!');
    }
}

export default startViewModel;