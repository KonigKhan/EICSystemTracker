var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var knockout_1 = require('./app/lib/knockout');
var pager_1 = require('./app/lib/pager');
var PageViewModel_1 = require('./app/framework/domain/PageViewModel');
var manifest_1 = require('./manifest');
var systemutils_1 = require('./app/framework/systemutils');
pager_1.default.onSourceError.add(function (event) {
    var page = event.page;
    var elm = page.element;
    console.error("pager error");
    elm.innerHTML = "<div class='alert'>Error loading page" + event.url + "</div>";
});
// This is the main parent page view model.
// Everything funnels under this.
var AppViewModel = (function (_super) {
    __extends(AppViewModel, _super);
    function AppViewModel() {
        var _this = this;
        _super.call(this);
        this.Navigation = knockout_1.default.observableArray();
        this.Pages = knockout_1.default.observableArray();
        this.Navigate = function (nav) {
            location.hash = nav.Href;
        };
        this.someText = knockout_1.default.observable("POS Framework");
        manifest_1.default.GlobalVariables.areas.map(function (area) {
            var areaPath = 'app/areas/' + area;
            return systemutils_1.default.ImportModuleAsync(areaPath + '/manifest')
                .then(function (areaManifest) {
                if (areaManifest.LoadStyle) {
                    systemutils_1.default
                        .LoadStyleAsync(areaPath + '/styles/' + areaManifest.LoadStyle)
                        .fail(console.error)
                        .done(function () {
                        var p = _this.PageFromManifest(areaManifest);
                        _this.Pages.push(p);
                    });
                }
                else {
                    var page = _this.PageFromManifest(areaManifest);
                    _this.Pages.push(page);
                }
                if (area === "home") {
                    return;
                }
                _this.Navigation.push({
                    Href: "start/" + areaManifest.UrlToken,
                    Title: areaManifest.Title,
                    Sequence: areaManifest.Sequence || 100
                });
                _this.Navigation.sort(function (l, r) {
                    return l.Sequence === r.Sequence ? 0 : l.Sequence < r.Sequence ? -1 : 1;
                });
            });
        });
    }
    AppViewModel.prototype.PageFromManifest = function (areaManifest) {
        var p = this._page(areaManifest.UrlToken, areaManifest.Title, 'app/areas/' + areaManifest.Key, areaManifest.InitialModule);
        return {
            config: p,
            cssClass: areaManifest.Key
        };
    };
    return AppViewModel;
})(PageViewModel_1.default);
// initial application bindings.
var appVm = new AppViewModel();
pager_1.default.extendWithPage(appVm);
setTimeout(function () {
    // apply bindings...
    if (window.location.hash.indexOf("start") !== -1) {
        pager_1.default.start();
    }
    else {
        pager_1.default.start('start/start');
    }
    knockout_1.default.applyBindings(appVm);
}, 500);
//# sourceMappingURL=app.js.map