define(["require", "exports", 'app/lib/knockout', 'app/lib/jquery'], function (require, exports, knockout_1, jquery_1) {
    var AppViewModel = (function () {
        function AppViewModel() {
            var _this = this;
            this.timeText = knockout_1.default.observable("");
            setInterval(function () {
                _this.timeText(new Date().toUTCString());
            }, 500);
        }
        return AppViewModel;
    })();
    jquery_1.default(document).ready(function () {
        var appViewModel = new AppViewModel();
        knockout_1.default.applyBindings(appViewModel);
    });
});
//# sourceMappingURL=app.js.map