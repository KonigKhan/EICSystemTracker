import $ from '../../../lib/jquery';

class EICSystemDataController implements IEICSystemTrackerService {
    //var _controller = "/api/EICSystemTrackerData/";

    public GetSystems = (): JQueryPromise<any> => {
        var dfd = $.Deferred();

        return dfd.resolve().promise();
    };
    public static GetLatestSystemTrackingData = (): JQueryPromise<any> => {
        var dfd = $.Deferred();

        $.get("/api/EICSystemTrackerData/GetLatestSystemTrackingData").done((result) => {
            dfd.resolve(result);
        });

        return dfd.promise();
    };

    public static UpdateSystemFactionInfo = (systemFaction: IEICSystemFaction): JQueryPromise<any> => {

        var dfd = $.Deferred();

        $.ajax({
            type: "POST",
            url: "/api/EICSystemTrackerData/UpdateSystemFactionInfo",
            data: systemFaction,
            dataType: 'json',
            success: (result) => {
                console.debug("UpdateSystemFactionInfo Result: " + JSON.stringify(result));
                dfd.resolve(result);
            }
        });


        return dfd.promise();
    };

}

export default EICSystemDataController;