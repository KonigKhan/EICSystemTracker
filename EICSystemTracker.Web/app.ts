import ko from 'app/lib/knockout';
import $ from 'app/lib/jquery';

class AppViewModel {
    public timeText: KnockoutObservable<string> = ko.observable("");

    constructor() {
        
        setInterval(() => {
            this.timeText(new Date().toUTCString());
        }, 500);

    }
}

$(document).ready(() => {
    var appViewModel = new AppViewModel();
    ko.applyBindings(appViewModel);
});