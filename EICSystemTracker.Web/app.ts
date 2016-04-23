﻿import ko from './app/lib/knockout';
import $ from './app/lib/jquery';
import pager from './app/lib/pager';
import PageViewModel from './app/framework/domain/PageViewModel';
import FrameworkManifest from './manifest';
import SystemUtils from './app/framework/systemutils';
import CmdrService from './app/services/CmdrService';

pager.onSourceError.add((event) => {
    var page = event.page;
    var elm: HTMLDivElement = page.element;
    console.error("pager error");
    elm.innerHTML = "<div class='alert'>Error loading page" + event.url + "</div>";
});

class SettingsViewModel {
    public cmdrName: KnockoutObservable<string> = ko.observable("");
    public portNumber: KnockoutObservable<number> = ko.observable(8080);
    public netLogPath: KnockoutObservable<string> = ko.observable("");
    public isLoading: KnockoutObservable<boolean> = ko.observable(false);

    constructor(cmdr?: string, port?: number, netLog?: string) {
        if (cmdr) {
            this.cmdrName(cmdr);
        }

        if (port) {
            this.portNumber(port);
        }

        if (netLog) {
            this.netLogPath(netLog);
        }
    }

    public save = () => {
        var toSave: IEICSystemTrackerConfig = <IEICSystemTrackerConfig>({
            CmdrName: this.cmdrName(),
            HostPort: this.portNumber(),
            EliteDangerousNetLogPath: this.netLogPath()
        });

        this.isLoading(true);
        CmdrService.SaveSettings(toSave).done((res) => {
            console.log('save success for: ' + JSON.stringify(res));
        }).always(() => {
            this.isLoading(false);
        });
    }
}

// This is the main parent page view model.
// Everything funnels under this.
class AppViewModel extends PageViewModel {

    public settings: KnockoutObservable<SettingsViewModel> = ko.observable(new SettingsViewModel());
    public Navigation = ko.observableArray<IPageNavigation>();
    public Pages = ko.observableArray<IPagerDiv>();
    public Navigate = (nav: IPageNavigation) => {
        location.hash = nav.Href;
    }

    constructor() {
        super();
        FrameworkManifest.GlobalVariables.areas.map((area) => {
            var areaPath = 'app/areas/' + area;
            return SystemUtils.ImportModuleAsync<IAreaManifest>(areaPath + '/manifest')
                .then((areaManifest: IAreaManifest) => {
                    if (areaManifest.LoadStyle) {
                        SystemUtils
                            .LoadStyleAsync(areaPath + '/styles/' + areaManifest.LoadStyle)
                            .fail(console.error)
                            .done(() => {
                                var p = this.PageFromManifest(areaManifest);
                                this.Pages.push(p);
                            });
                    }
                    else {
                        var page = this.PageFromManifest(areaManifest);
                        this.Pages.push(page);
                    }

                    if (area === "home") {
                        return;
                    }

                    this.Navigation.push({
                        Href: "start/" + areaManifest.UrlToken,
                        Title: areaManifest.Title,
                        Sequence: areaManifest.Sequence || 100
                    });
                    this.Navigation.sort((l, r) => {
                        return l.Sequence === r.Sequence ? 0 : l.Sequence < r.Sequence ? -1 : 1;
                    });
                });


        });
    }

    private PageFromManifest(areaManifest: IAreaManifest): IPagerDiv {
        var p = this._page(areaManifest.UrlToken,
            areaManifest.Title,
            'app/areas/' + areaManifest.Key,
            areaManifest.InitialModule);

        return {
            config: p,
            cssClass: areaManifest.Key
        };
    }
}

// initial application bindings.
var appVm = new AppViewModel();
pager.extendWithPage(appVm);

CmdrService.GetSavedSettings().done((res: IEICSystemTrackerConfig) => {
    appVm.settings(new SettingsViewModel(res.CmdrName, res.HostPort, res.EliteDangerousNetLogPath));

    // apply bindings...
    if (window.location.hash.indexOf("start") !== -1) {
        pager.start();
    } else {
        pager.start('start/start');
    }
    ko.applyBindings(appVm);

});


//setTimeout(() => {
    
//}, 500);