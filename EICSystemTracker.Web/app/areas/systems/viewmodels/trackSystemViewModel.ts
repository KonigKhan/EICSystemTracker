import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

import eicDataController from '../controllers/EICSystemTrackerDataController';
import systemsCacheService from '../../../services/systemscacheservice';
import SystemUtils from '../../../framework/systemutils';
import trackingData from './factionTrackingViewModel';
import cmdrService from '../../../services/cmdrservice';

class TrackSystemViewModel extends PageViewModel {

    public isError: KnockoutObservable<boolean> = ko.observable(false);
    public errorMsgs: KnockoutObservableArray<string> = ko.observableArray([]);
    public systemName: KnockoutObservable<string> = ko.observable("");
    public traffic: KnockoutObservable<number> = ko.observable(0);
    public population: KnockoutObservable<number> = ko.observable(0);
    public security: KnockoutObservable<string> = ko.observable("");
    public government: KnockoutObservable<string> = ko.observable("");
    public allegiance: KnockoutObservable<string> = ko.observable("");
    public cmdrName: KnockoutObservable<string> = ko.observable("");
    public factions: KnockoutObservableArray<trackingData> = ko.observableArray([]);
    public isLoading: KnockoutObservable<boolean> = ko.observable(false);
    public allSystems: Array<IEICSystem> = [];
    public systemNames: Array<string> = [];
    public factionNames: Array<string> = [];

    public stateOptions: Array<string> = ["None", "Boom", "Bust", "Expansion", "Lockdown", "CivilUnrest", "Outbreak", "War", "Civil War", "Election"];
    public governmentOptions: Array<string> = ["Corporatation", "Democracy", "Patronage", "Anarchy", "Feudalist"];
    public allegianceOptions: Array<string> = ["Empire", "Federation", "Alliance", "Independent"];
    public securityOptions: Array<string> = ["None", "High", "Medium", "Low"];

    constructor() {
        super();

        this.systemName.subscribe((sysName: string) => {

            var sys: IEICSystem = systemsCacheService.GetSystems().filter((s: IEICSystem) => {
                return s.Name.toLowerCase() === sysName.toLowerCase();
            })[0];

            if (sys) {
                console.info('Found System in cache! ' + sys.Name);
            }

            this.preFillSystem(sys);

            if (this.isError()) {
                this.validate();
            }
        });

        this.cmdrName.subscribe(() => {
            if (this.isError())
                this.validate();
        });
    }

    Shown() {
        super.Shown();
        this.reset();
        this.getPreFillData();
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

        var factionNamesValid = true;
        var factionNamesMessage = "At least one of your factions is missing a name.";
        for (var i = 0, len = this.factions().length; i < len; i++) {
            var curFac: trackingData = this.factions()[i];
            if (!curFac.factionName() || curFac.factionName().length <= 0) {
                factionNamesValid = false;
                this.errorMsgs.push(factionNamesMessage);
            }
        }

        this.isError(!(cmdrNameValid && systemNameValid && factionNamesValid));
    }

    public submitData = () => {
        this.validate();

        // If no error... Go on...
        if (!this.isError()) {

            // TODO: Add missing properties to entry form
            var trackedFacs: Array<IEICSystemFaction> = [];
            var arrLen = this.factions().length;
            for (var i = 0; i < arrLen; i++) {

                var curData: IEICSystemFaction = this.factions()[i].getTrackingData();
                curData.UpdatedBy = this.cmdrName();

                trackedFacs.push(curData);
            }

            var submitSystem: IEICSystem = {
                Name: this.systemName(),
                Traffic: this.traffic(),
                Population: this.population(),
                Government: this.government(),
                Allegiance: this.allegiance(),
                State: "",
                Security: this.security(),
                Economy: "",
                Power: "",
                PowerState: "",
                NeedPermit: false,
                LastUpdated: "",
                TrackedFactions: trackedFacs,
                ChartColor: null
            };

            try {

                this.isLoading(true);
                eicDataController.UpdateSystemFactionInfo(submitSystem).done((result) => {
                    console.debug("eicDataController.UpdateSystemFactionInfo Result: " + JSON.stringify(result));
                    this.reset();
                }).fail((resError) => {
                    var errorobj = JSON.parse(resError.error().responseText);
                    var errorMsg = "Error While Saving\r\nMessage: " + errorobj.Message + "\r\nExceptionMessage: " + errorobj.ExceptionMessage;
                    this.errorMsgs.push(errorMsg);
                    this.isError(true);
                }).always(() => {
                    this.isLoading(false);
                });
            }
            catch (e) {
                this.errorMsgs.push(JSON.stringify(e));
                this.isError(true);
                this.isLoading(false);
            }
        }
    }

    public addFaction = () => {

        console.debug('addNewFaction');

        var newFactionTrackingData = new trackingData();
        this.factions.push(newFactionTrackingData);
    }

    public loadCurrentLocation = () => {
        cmdrService.GetCmdrCurrentSystem().done((curSys: IEICSystem) => {
            this.systemName(curSys.Name.trim());
        });
    }

    public setControllingFaction = (faction: trackingData) => {
    }

    private preFillSystem(system: IEICSystem = null) {

        if (system) {
            //this.systemName(system.Name);
            this.traffic(system.Traffic);
            this.population(system.Population);
            this.security(system.Security);
            this.government(system.Government);
            this.allegiance(system.Allegiance);

            var existingFactions: Array<trackingData> = system.TrackedFactions
                .filter((sf: IEICSystemFaction) => { return sf.Influence > 0 })
                .map((sysFac: IEICSystemFaction) => {
                    var newTrackData = new trackingData();
                    newTrackData.factionName(sysFac.Faction.Name);
                    newTrackData.influence(sysFac.Influence);
                    newTrackData.currentState(sysFac.CurrentState);
                    if (sysFac.PendingState) {
                        newTrackData.pendingState(sysFac.PendingState.split(','));
                    }
                    if (sysFac.RecoveringState) {
                        newTrackData.recoveringState(sysFac.RecoveringState.split(','));
                    }
                    newTrackData.controllingFaction(sysFac.ControllingFaction);

                    return newTrackData;
                });

            this.factions(existingFactions);
        }
        else {
            this.traffic(0);
            this.population(0);
            this.security("");
            this.government("");
            this.allegiance("");
            this.factions([]);
        }
    }

    public getPreFillData = () => {

        this.isLoading(true);
        $.when(this.loadSystemNamesAsync(), this.loadFactionNamesAsync()).always(() => {
            this.isLoading(false);
        });
    }

    private loadSystemNamesAsync = (): JQueryPromise<any> => {
        var dfd = $.Deferred();
        eicDataController.GetLatestSystemTrackingData().done((returnData: Array<IEICSystem>) => {

            systemsCacheService.SetSystems(returnData); // reload the cache to prevent dup calls.
            var sysNames = returnData.map((item: IEICSystem) => {
                return item.Name;
            });

            if (sysNames.length > 0) {
                this.systemNames = sysNames;
            }

            dfd.resolve();
        }).fail((err) => {
            dfd.reject(err);
        });
        return dfd.promise();
    }

    private loadFactionNamesAsync = (): JQueryPromise<any> => {
        var dfd = $.Deferred();

        eicDataController.GetFactionNames().done((factionNames: Array<string>) => {
            
            if (factionNames.length > 0) {
                this.factionNames = factionNames;
            }

            dfd.resolve();
        });

        return dfd.promise();
    }

    public reset = () => {
        this.systemName("");
        this.traffic(0);
        this.population(0);
        this.security("");
        this.government("");
        this.allegiance("");
        this.factions([]);
    }
}

export default TrackSystemViewModel;