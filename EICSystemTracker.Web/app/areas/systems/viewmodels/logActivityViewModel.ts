import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

import eicDataController from '../controllers/EICSystemTrackerDataController';
import systemsCacheService from '../../../services/systemscacheservice';
import SystemUtils from '../../../framework/systemutils';
import trackingData from './factionTrackingViewModel';

class LogActivityViewModel extends PageViewModel {

    public activityTypeOptions: Array<DropDownOption> = [
        <DropDownOption>{
            Text: "Missions",
            Value: "1"
        },
        <DropDownOption>{
            Text: "Bounty Hunting",
            Value: "2"
        },
        <DropDownOption>{
            Text: "Conflict Zone",
            Value: "3"
        },
        <DropDownOption>{
            Text: "Trade",
            Value: "4"
        },
        <DropDownOption>{
            Text: "Exploration",
            Value: "5"
        },
        <DropDownOption>{
            Text: "Piracy",
            Value: "6"
        },
        <DropDownOption>{
            Text: "MurderHobo",
            Value: "7"
        }
    ];
    public activityOptionLabel: DropDownOption = {
        Text: 'What type of activity?',
        Value: '-1'
    };

    public isLoading: KnockoutObservable<boolean> = ko.observable(false);
    public cmdrName: KnockoutObservable<string> = ko.observable("");
    public activityType: KnockoutObservable<string> = ko.observable("");
    public numHighMissions: KnockoutObservable<number> = ko.observable(0);
    public numMedMissions: KnockoutObservable<number> = ko.observable(0);
    public numLowMissions: KnockoutObservable<number> = ko.observable(0);
    public numBhCredits: KnockoutObservable<number> = ko.observable(0);
    public numCzCredits: KnockoutObservable<number> = ko.observable(0);
    public tradeTonnage: KnockoutObservable<number> = ko.observable(0);
    public expValueSold: KnockoutObservable<number> = ko.observable(0);
    public shipsTaken: KnockoutObservable<number> = ko.observable(0);
    public piracyTonnage: KnockoutObservable<number> = ko.observable(0);
    public bountyEarned: KnockoutObservable<number> = ko.observable(0);

    public systemName: KnockoutObservable<string> = ko.observable("");
    public systemNames: Array<string> = [];

    constructor() {
        super();

    }

    Shown() {
        super.Shown();
        this.reset();
        this.getSystems();
    }

    public submitData = (): void => {
        var activityToSubmit: IEICSystemActivity = <IEICSystemActivity>{};
        activityToSubmit.SystemName = this.systemName();
        activityToSubmit.Cmdr = this.cmdrName();
        activityToSubmit.Type = +this.activityType();

        switch (+this.activityType()) {
            case 1:
                (<IMissions>activityToSubmit).NumHigh = this.numHighMissions();
                (<IMissions>activityToSubmit).NumMed = this.numMedMissions();
                (<IMissions>activityToSubmit).NumLow = this.numLowMissions();
                break;
        }

        try {

            this.isLoading(true);
            eicDataController.TrackSystemActivity(activityToSubmit).done((result) => {
                console.debug("eicDataController.TrackSystemActivity Result: " + JSON.stringify(result));
                this.reset();
            }).fail((resError) => {
                var errorobj = JSON.parse(resError.error().responseText);
                var errorMsg = "Error While Saving\r\nMessage: " + errorobj.Message + "\r\nExceptionMessage: " + errorobj.ExceptionMessage;
                console.error(errorMsg);
                alert(errorMsg);
            }).always(() => {
                this.isLoading(false);
            });
        }
        catch (e) {
            alert('error while saving... ' + e);
            this.isLoading(false);
        }
    }

    public getSystems = (): void => {

        this.isLoading(true);
        eicDataController.GetLatestSystemTrackingData().done((returnData: Array<IEICSystem>) => {

            var sysNames = returnData.map((item: IEICSystem) => {
                return item.Name;
            });

            if (sysNames.length > 0) {
                this.systemNames = sysNames;
            }

        }).always(() => {
            this.isLoading(false);
        });

    }

    public reset = (): void => {
        this.activityType("");
        this.numHighMissions(0);
        this.numMedMissions(0);
        this.numLowMissions(0);
        this.numBhCredits(0);
        this.numCzCredits(0);
        this.tradeTonnage(0);
        this.expValueSold(0);
        this.shipsTaken(0);
        this.piracyTonnage(0);
        this.bountyEarned(0);
        this.systemName("");
    }

}

export default LogActivityViewModel;