import $ from '../../lib/jquery';
import pager from '../../lib/pager';
import FrameworkManifest from '../../../manifest';
import SystemUtils from '../../framework/SystemUtils';


class PageViewModel {

    SourceLoaded() {
        console.info("VM - Source Loaded: " + (<any>this.constructor).name);
    }

    // Intended to be overridden by child class.
    Shown() {
        console.info("VM - Shown: " + (<any>this.constructor).name);
    }
    Hidden() {
        console.info("VM - Hidden: " + (<any>this.constructor).name);
    }

    Initialize(): Promise<any> {
        var iPromise = new Promise((resolve, reject) => {
            resolve();
        });

        return iPromise;
    }

    _onPageIn(page, callback) {
        var $e = $(page.element);
        $e.hide().fadeIn(FrameworkManifest.GlobalVariables.fadeSpeed, callback);
    }
    _onPageOut(page, callback) {
        var $e = $(page.element);
        if (!page.pageHiddenOnce) {
            page.pageHiddenOnce = true;
        }
        $e.fadeOut(FrameworkManifest.GlobalVariables.fadeSpeed, () => {
            $e.hide();
            if (callback) {
                callback();
            }
        });


    }
    LoadVM(viewModelName: string, loadVmPromise: JQueryPromise<any>): JQueryPromise<PageViewModel> {
        console.debug("LoadVM for " + viewModelName);

        var dfdVmLoad = $.Deferred();
        loadVmPromise.done(() => {

            System.import(viewModelName).then((systemMod) => {

                if (!systemMod && !systemMod.default) {
                    alert('Something went wrong!');
                }

                var mod = systemMod.default;
                var viewModel: PageViewModel = new mod();
                console.debug(viewModelName + " Created");

                viewModel.Initialize().then(() => {
                    console.debug(viewModelName + " Initialized");
                    dfdVmLoad.resolve(viewModel);
                });

            });

        });

        return dfdVmLoad.promise();
    }

    private LoadView(viewName: string) {

        return (page, callback) => {
            console.debug("Loading View: " + viewName);
            var elem: Element = page.element;
            var $elem = $(elem);
            if (page.pageHiddenOnce) {
                //callback(); causes element to hide
                return;
            }
            $.get(viewName).done((viewString) => {
                $elem.hide().html(viewString);
                callback();
            });
        };
    }

    BuildPagerShow(vmPromise: JQueryPromise<PageViewModel>): (page, callback) => void {
        console.debug('BuildPagerShow');
        return (page, callback) => {
            vmPromise.done((vm: PageViewModel) => {
                console.debug("Call _onPageIn");
                this._onPageIn(page, () => {
                    if (callback) callback();
                    vm.Shown();
                });
            });
        };
    }
    BuildPagerHide(vmPromise: JQueryPromise<PageViewModel>) {
        return (page, callback) => {
            vmPromise.done((vm: PageViewModel) => {
                this._onPageOut(page, () => {
                    if (callback) callback();
                    vm.Hidden();
                });
            });
        };
    }
    BuildPagerWithOnShow(dfdShouldLoadVM: JQueryDeferred<any>, vmPromise: JQueryPromise<PageViewModel>) {
        return function (callback) {
            dfdShouldLoadVM.resolve();
            vmPromise.done((vm) => {
                callback(vm);
            });
        };
    }
    _isCurrentPage(pageId) {
        var page = (<any>pager).page.find(pageId);
        return page.isVisible;
    }

    _page(pageRouteId: string, title: string, area: string, conventionName: string): IPagerPageConfig {
        var viewName: string = area + "/views/" + conventionName + "view.htm";
        var viewModelName: string = area + "/viewmodels/" + conventionName + "viewmodel";//version auto appended

        var dfdShouldLoadVM = $.Deferred();
        var vmPromise = this.LoadVM(viewModelName, dfdShouldLoadVM.promise());
        var dfdSourceLoaded = $.Deferred();

        return <IPagerPageConfig>{
            id: pageRouteId,
            title: FrameworkManifest.GlobalVariables.applicationName + " - " + title,
            showElement: this.BuildPagerShow(vmPromise),
            hideElement: this.BuildPagerHide(vmPromise),
            withOnShow: this.BuildPagerWithOnShow(dfdShouldLoadVM, vmPromise),
            sourceOnShow: this.LoadView(viewName),
            sourceLoaded: () => {
                vmPromise.then((vm: PageViewModel) => {
                    vm.SourceLoaded();
                });
            },
        };
    }

}

export default PageViewModel;