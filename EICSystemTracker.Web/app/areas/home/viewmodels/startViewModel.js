var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PageViewModel_1 = require('../../../framework/domain/PageViewModel');
var startViewModel = (function (_super) {
    __extends(startViewModel, _super);
    function startViewModel() {
        _super.call(this);
        console.debug('New Start View Model!');
    }
    return startViewModel;
})(PageViewModel_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = startViewModel;
//# sourceMappingURL=startViewModel.js.map