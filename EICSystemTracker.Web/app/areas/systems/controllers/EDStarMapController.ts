import $ from '../../../lib/jquery';
import SystemUtils from '../../../framework/systemutils';

module EDStarMapController {
    var edStarMapBaseUrl: string = "http://www.edsm.net/api-v1/";
    var cacheKey: string = "StarMapSystems";

    // TODO: Update to use only when needed.
    export function GetSystemsByName(name: string): JQueryPromise<any> {

            var searchUrl = edStarMapBaseUrl + 'systems/';
            return $.get(searchUrl);
    };
}

export default EDStarMapController;