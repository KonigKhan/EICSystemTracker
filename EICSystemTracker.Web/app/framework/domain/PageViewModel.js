"use strict";
var jquery_1 = require('../../lib/jquery');
var pager_1 = require('../../lib/pager');
var manifest_1 = require('../../../manifest');
var PageViewModel = (function () {
    function PageViewModel() {
    }
    PageViewModel.prototype.SourceLoaded = function () {
        console.info("VM - Source Loaded: " + this.constructor.name);
    };
    // Intended to be overridden by child class.
    PageViewModel.prototype.Shown = function () {
        console.info("VM - Shown: " + this.constructor.name);
    };
    PageViewModel.prototype.Hidden = function () {
        console.info("VM - Hidden: " + this.constructor.name);
    };
    PageViewModel.prototype.Initialize = function () {
        var iPromise = new Promise(function (resolve, reject) {
            resolve();
        });
        return iPromise;
    };
    PageViewModel.prototype._onPageIn = function (page, callback) {
        var $e = jquery_1.default(page.element);
        $e.hide().fadeIn(manifest_1.default.GlobalVariables.fadeSpeed, callback);
    };
    PageViewModel.prototype._onPageOut = function (page, callback) {
        var $e = jquery_1.default(page.element);
        if (!page.pageHiddenOnce) {
            page.pageHiddenOnce = true;
        }
        $e.fadeOut(manifest_1.default.GlobalVariables.fadeSpeed, function () {
            $e.hide();
            if (callback) {
                callback();
            }
        });
    };
    PageViewModel.prototype.LoadVM = function (viewModelName, loadVmPromise) {
        console.debug("LoadVM for " + viewModelName);
        var dfdVmLoad = jquery_1.default.Deferred();
        loadVmPromise.done(function () {
            System.import(viewModelName).then(function (systemMod) {
                if (!systemMod && !systemMod.default) {
                    alert('Something went wrong!');
                }
                var mod = systemMod.default;
                var viewModel = new mod();
                console.debug(viewModelName + " Created");
                viewModel.Initialize().then(function () {
                    console.debug(viewModelName + " Initialized");
                    dfdVmLoad.resolve(viewModel);
                });
            });
        });
        return dfdVmLoad.promise();
    };
    PageViewModel.prototype.LoadView = function (viewName) {
        return function (page, callback) {
            console.debug("Loading View: " + viewName);
            var elem = page.element;
            var $elem = jquery_1.default(elem);
            if (page.pageHiddenOnce) {
                //callback(); causes element to hide
                return;
            }
            jquery_1.default.get(viewName).done(function (viewString) {
                $elem.hide().html(viewString);
                callback();
            });
        };
    };
    PageViewModel.prototype.BuildPagerShow = function (vmPromise) {
        var _this = this;
        console.debug('BuildPagerShow');
        return function (page, callback) {
            vmPromise.done(function (vm) {
                console.debug("Call _onPageIn");
                _this._onPageIn(page, function () {
                    if (callback)
                        callback();
                    vm.Shown();
                });
            });
        };
    };
    PageViewModel.prototype.BuildPagerHide = function (vmPromise) {
        var _this = this;
        return function (page, callback) {
            vmPromise.done(function (vm) {
                _this._onPageOut(page, function () {
                    if (callback)
                        callback();
                    vm.Hidden();
                });
            });
        };
    };
    PageViewModel.prototype.BuildPagerWithOnShow = function (dfdShouldLoadVM, vmPromise) {
        return function (callback) {
            dfdShouldLoadVM.resolve();
            vmPromise.done(function (vm) {
                callback(vm);
            });
        };
    };
    PageViewModel.prototype._isCurrentPage = function (pageId) {
        var page = pager_1.default.page.find(pageId);
        return page.isVisible;
    };
    PageViewModel.prototype._page = function (pageRouteId, title, area, conventionName) {
        var viewName = area + "/views/" + conventionName + "view.htm";
        var viewModelName = area + "/viewmodels/" + conventionName + "viewmodel"; //version auto appended
        var dfdShouldLoadVM = jquery_1.default.Deferred();
        var vmPromise = this.LoadVM(viewModelName, dfdShouldLoadVM.promise());
        var dfdSourceLoaded = jquery_1.default.Deferred();
        return {
            id: pageRouteId,
            title: manifest_1.default.GlobalVariables.applicationName + " - " + title,
            showElement: this.BuildPagerShow(vmPromise),
            hideElement: this.BuildPagerHide(vmPromise),
            withOnShow: this.BuildPagerWithOnShow(dfdShouldLoadVM, vmPromise),
            sourceOnShow: this.LoadView(viewName),
            sourceLoaded: function () {
                vmPromise.then(function (vm) {
                    vm.SourceLoaded();
                });
            },
        };
    };
    return PageViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PageViewModel;
//# sourceMappingURL=PageViewModel.js.map