import $ from '../../../lib/jquery';
import SystemUtils from '../../../framework/systemutils';

module EDStarMapController {
    var edStarMapBaseUrl: string = "http://www.edsm.net/api-v1/";
    var cacheKey: string = "StarMapSystems";

    export function GetSystems(resetCache?: boolean): JQueryPromise<Array<IEDStarMapSystem>> {
        var dfd = $.Deferred();

        if (!resetCache && SystemUtils.GetSessionCacheValue(cacheKey) !== null) {

            console.debug("get star map data from local storage...");
            var allSystems: Array<IEDStarMapSystem> = SystemUtils.GetSessionCacheValue(cacheKey);
            dfd.resolve(allSystems);

        } else {

            console.debug("get star map data from edsm web service...");
            var searchUrl = edStarMapBaseUrl + 'systems';
            $.get(searchUrl).done((rtnData: Array<IEDStarMapSystem>) => {

                console.debug("store data from edsm service in session cache...");
                //tempCache = rtnData;
                SystemUtils.AddToSessionCache(cacheKey, rtnData);

                console.debug("return edsm systems...");
                var allSystems: Array<IEDStarMapSystem> = SystemUtils.GetSessionCacheValue(cacheKey);
                dfd.resolve(allSystems);

            }).fail(() => {
                console.error("Failed SearchSystemsByName");
                dfd.reject();
            });

        }

        return dfd.promise();
    };
}

export default EDStarMapController;