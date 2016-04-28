import ko from './app/lib/knockout';
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

class LogInViewModel {

    public isLoading: KnockoutObservable<boolean> = ko.observable(false);
    public logInName: KnockoutObservable<string> = ko.observable("");
    public newUser: KnockoutObservable<boolean> = ko.observable(false);
    public logInPassword: KnockoutObservable<string> = ko.observable("");
    public logInConfirmPassword: KnockoutObservable<string> = ko.observable("");
    public buttonText: KnockoutObservable<string> = ko.observable("Log In");
    public LoggedInCmdr: KnockoutObservable<ICommander> = ko.observable(null);

    constructor(cmdr?: string) {
        if (cmdr) {
            this.logInName(cmdr);
        }
    }

    public newLogIn = () => {

        if (this.newUser()) {
            this.newUser(false);
            this.buttonText("Log In");
        } else {
            this.newUser(true);
            this.buttonText("Create Account");
        }
    }

    public save = () => {

        var toSave: ICommander =
            {
                CommanderName: this.logInName(),
                Password: this.logInPassword()
            };
        if (this.newUser()) {

            this.isLoading(true);
            CmdrService.RegisterNewCommander(toSave).done((res) => {
                console.log('Cmdr Logged In Successfully! ' + JSON.stringify(res));
                this.LoggedInCmdr(toSave);
            }).fail((data, text) => {
                console.error(text);
            }).always(() => {
                this.isLoading(false);
            });

        } else {

            this.isLoading(true);
            CmdrService.CmdrLogIn(toSave).done((res) => {
                console.log('Cmdr Logged In Successfully! ' + JSON.stringify(res));
                this.LoggedInCmdr(toSave);
            }).fail((data, text) => {
                console.error(text);
            }).always(() => {
                this.isLoading(false);
            });
        }
    }
}

// This is the main parent page view model.
// Everything funnels under this.
class AppViewModel extends PageViewModel {

    public settings: KnockoutObservable<SettingsViewModel> = ko.observable(new SettingsViewModel());
    public loginVm: LogInViewModel = new LogInViewModel();
    public Navigation = ko.observableArray<IPageNavigation>();
    public Pages = ko.observableArray<IPagerDiv>();
    public Navigate = (nav: IPageNavigation) => {
        location.hash = nav.Href;
    }

    public LoggedInCmdrName: KnockoutObservable<string> = ko.observable('');

    constructor() {
        super();

        this.loginVm.LoggedInCmdr.subscribe((c: ICommander) => {
            this.LoggedInCmdrName(c.CommanderName);
        });

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