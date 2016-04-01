"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var knockout_1 = require('../../../lib/knockout');
var PageViewModel_1 = require('../../../framework/domain/PageViewModel');
var systemsViewModel = (function (_super) {
    __extends(systemsViewModel, _super);
    function systemsViewModel() {
        _super.call(this);
        this.Pages = knockout_1.default.observableArray([
            {
                config: this._page('all', 'All', 'app/areas/systems', 'all')
            },
            {
                config: this._page('system', 'System', 'app/areas/systems', 'system')
            },
            {
                config: this._page('trackSystem', 'Track System', 'app/areas/systems', 'trackSystem')
            }
        ]);
        this.Navigate = function (nav) {
            location.hash = nav.Href;
        };
        console.debug('New Systems View Model!');
    }
    systemsViewModel.prototype.Shown = function () {
        _super.prototype.Shown.call(this);
        if (location.hash === '#start/systems') {
            location.hash = 'start/systems/all';
        }
    };
    return systemsViewModel;
}(PageViewModel_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = systemsViewModel;
//# sourceMappingURL=systemsViewModel.js.map