import $ from '../../../lib/jquery';

module EDStarMapController {
    var edStarMapBaseUrl = "http://www.edsm.net/api-v1/";

    export function SearchSystemsByName(sysNameWildcard: string) {

        var searchUrl = edStarMapBaseUrl + 'systems?sysname=' + sysNameWildcard;
        $.get(searchUrl).done((rtnData) => {
            console.log("Retrieved: " + JSON.stringify(rtnData));
        }).fail(() => {
            console.error("Failed SearchSystemsByName");
        });
    };
}

export default EDStarMapController;