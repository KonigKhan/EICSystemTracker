import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

import eicDataController from '../controllers/EICSystemTrackerDataController';
import systemsCacheService from '../../../services/systemscacheservice';
import SystemUtils from '../../../framework/systemutils';
import trackingData from './factionTrackingViewModel';

class TrackSystemViewModel extends PageViewModel {

    public systemName: KnockoutObservable<string> = ko.observable("");
    public traffic: KnockoutObservable<number> = ko.observable(0);
    public population: KnockoutObservable<number> = ko.observable(0);
    public security: KnockoutObservable<string> = ko.observable("");
    public government: KnockoutObservable<string> = ko.observable("");
    public allegiance: KnockoutObservable<string> = ko.observable("");
    public cmdrName: KnockoutObservable<string> = ko.observable("");
    public factions: KnockoutObservableArray<trackingData> = ko.observableArray([]);
    public isLoading: KnockoutObservable<boolean> = ko.observable(false);

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
                this.preFillSystem(sys);

            }
            else {
                this.isLoading(true);
                eicDataController.GetLatestSystemTrackingData().done((returnData: Array<IEICSystem>) => {

                    var sys = returnData.filter((item: IEICSystem) => {
                        return item.Name.toLowerCase() === sysName.toLowerCase();
                    })[0];

                    if (sys) {
                        console.info('Found System! ' + sys.Name);
                        this.preFillSystem(sys);
                    }

                }).always(() => {
                    this.isLoading(false);
                });
            }
        });
    }

    Shown() {
        super.Shown();
        this.reset();
    }

    public submitData = () => {

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

    public addFaction = () => {

        console.debug('addNewFaction');

        var newFactionTrackingData = new trackingData();
        this.factions.push(newFactionTrackingData);
    }

    public removeFaction = (trackedFaction: trackingData) => {
        this.factions.remove(trackedFaction);
    }

    public setControllingFaction = (faction: trackingData) => {

        var arrLen = this.factions().length;
        for (var i = 0; i < arrLen; i++) {

            var f: trackingData = this.factions()[i];
            if (f.factionName !== faction.factionName) {
                f.controllingFaction(false);
            }
        }
    }

    private preFillSystem(system: IEICSystem) {

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
                newTrackData.pendingState(sysFac.PendingState.split(','));
                newTrackData.recoveringState(sysFac.RecoveringState.split(','));
                newTrackData.controllingFaction(sysFac.ControllingFaction);

                return newTrackData;
            });

        this.factions(existingFactions);

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