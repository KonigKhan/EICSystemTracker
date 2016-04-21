import ko from './app/lib/knockout';
import $ from './app/lib/jquery';
import pager from './app/lib/pager';
import PageViewModel from './app/framework/domain/PageViewModel';
import FrameworkManifest from './manifest';
import SystemUtils from './app/framework/systemutils';

pager.onSourceError.add((event) => {
    var page = event.page;
    var elm: HTMLDivElement = page.element;
    console.error("pager error");
    elm.innerHTML = "<div class='alert'>Error loading page" + event.url + "</div>";
});

// This is the main parent page view model.
// Everything funnels under this.
class AppViewModel extends PageViewModel {

    public Navigation = ko.observableArray<IPageNavigation>();
    public Pages = ko.observableArray<IPagerDiv>();
    public Navigate = (nav: IPageNavigation) => {
        location.hash = nav.Href;
    }

    public someText: KnockoutObservable<string> = ko.observable("POS Framework");

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

setTimeout(() => {
    // apply bindings...
    if (window.location.hash.indexOf("start") !== -1) {
        pager.start();
    } else {
        pager.start('start/start');
    }
    ko.applyBindings(appVm);
}, 500);