import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

import eicDataController from '../controllers/EICSystemTrackerDataController';
import systemsCacheService from '../../../services/systemscacheservice';
import SystemUtils from '../../../framework/systemutils';
import cmdrService from '../../../services/cmdrservice';

class LogActivityViewModel extends PageViewModel {

    public isError: KnockoutObservable<boolean> = ko.observable(false);
    public errorMsgs: KnockoutObservableArray<string> = ko.observableArray([]);
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

        this.systemName.subscribe(this.ReValidate);
        this.cmdrName.subscribe(this.ReValidate);
        this.activityType.subscribe(this.ReValidate);
        this.numHighMissions.subscribe(this.ReValidate);
        this.numMedMissions.subscribe(this.ReValidate);
        this.numLowMissions.subscribe(this.ReValidate);
        this.numBhCredits.subscribe(this.ReValidate);
        this.numCzCredits.subscribe(this.ReValidate);
        this.tradeTonnage.subscribe(this.ReValidate);
        this.expValueSold.subscribe(this.ReValidate);
        this.shipsTaken.subscribe(this.ReValidate);
        this.piracyTonnage.subscribe(this.ReValidate);
        this.bountyEarned.subscribe(this.ReValidate);

    }

    public loadCurrentLocation = () => {
        this.isLoading(true);
        cmdrService.GetCmdrCurrentSystem()
            .done((curSys: IEICSystem) => {
                this.systemName(curSys.Name.trim());
            })
            .fail((error) => {
                console.log(error.responseJSON.Message);
            })
            .always(() => {
                this.isLoading(false);
            });
    }

    public ReValidate = (): void => {
        if (this.isError()) {
            this.validate();
        }
    }

    Shown() {
        super.Shown();
        this.reset();
        this.getSystems();
    }

    public validate = (): void => {
        this.errorMsgs([]); // reset error messages.

        var cmdrNameValid = true;
        var cmdrNameMsg = "You need to enter your Cmdr name so we can give credit to you.";
        if (!this.cmdrName() || this.cmdrName().length <= 0) {
            cmdrNameValid = false;
            this.errorMsgs.push(cmdrNameMsg);
        }

        var systemNameValid = true;
        var sysNameMessage = "A system name is missing.";
        if (!this.systemName() || this.systemName().length <= 0) {
            systemNameValid = false;
            this.errorMsgs.push(sysNameMessage);
        }

        var validActivity = true;
        switch (this.activityType()) {
            case "1":
                validActivity = this.missionsValid() === true;
                this.errorMsgs.push("You need to enter at last one for high, med, or low missions.");
                break;
            case "2":
                validActivity = this.bhValid() === true;
                this.errorMsgs.push("You need to enter more than 0 for credits.");
                break;
            case "3":
                validActivity = this.czValid() === true;
                this.errorMsgs.push("You need to enter more than 0 for credits.");
                break;
            case "4":
                validActivity = this.tradingValid() === true;
                this.errorMsgs.push("You need to enter more than 0 for trade tonnage.");
                break;
            case "5":
                validActivity = this.explorationValid() === true;
                this.errorMsgs.push("You need to enter more thna 0 for exploration value sold.");
                break;
            case "6":
                validActivity = this.piracyValid() === true;
                this.errorMsgs.push("You need to enter more than 0 for ships taken and tonnage sold.");
                break;
            case "7":
                validActivity = this.murderHoboValid() === true;
                this.errorMsgs.push("You need to enter more than 0 for bounty earned.");
                break;
            default:
                validActivity = false;
                this.errorMsgs.push("You must select a type of activity.");
                break;
        }

        this.isError(!(cmdrNameValid && systemNameValid && validActivity));
    }

    public missionsValid = (): boolean => {
        return (this.numHighMissions() > 0 || this.numMedMissions() > 0 || this.numLowMissions() > 0);
    }

    public bhValid = (): boolean => {
        return (this.numBhCredits() > 0);
    }

    public czValid = (): boolean => {
        return (this.numCzCredits() > 0);
    }

    public tradingValid = (): boolean => {
        return (this.tradeTonnage() > 0);
    }

    public explorationValid = (): boolean => {
        return (this.expValueSold() > 0);
    }

    public piracyValid = (): boolean => {
        return (this.piracyTonnage() > 0 && this.shipsTaken() > 0);
    }

    public murderHoboValid = (): boolean => {
        return (this.bountyEarned() > 0);
    }

    public submitData = (): void => {

        this.validate();

        if (!this.isError()) {
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
                    this.errorMsgs.push("There was a problem while saving your entry. Please try again.");
                    console.error(errorMsg);
                }).always(() => {
                    this.isLoading(false);
                });
            }
            catch (e) {
                this.errorMsgs.push("There was a problem while saving your entry. Please try again.");
                console.error(JSON.stringify(e));
                this.isLoading(false);
            }
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