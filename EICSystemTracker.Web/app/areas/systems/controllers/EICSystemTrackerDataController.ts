import $ from '../../../lib/jquery';

class EICSystemTrackerDataController implements IEICSystemTrackerService {
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

    public static GetSystem = (systemName: string): JQueryPromise<IEICSystem> => {
        var dfd = $.Deferred();

        $.get("/api/EICSystemTrackerData/GetSystem?systemName=" + systemName).done((result) => {
            dfd.resolve(result);
        });

        return dfd.promise();
    };

    public static UpdateSystemFactionInfo = (systemFaction: IEICSystem): JQueryPromise<any> => {

        var dfd = $.Deferred();

        $.ajax({
            type: "POST",
            url: "/api/EICSystemTrackerData/UpdateSystemFactionInfo",
            data: systemFaction,
            success: function(res) {
                dfd.resolve(res);
            },
            dataType: 'json'
        });


        return dfd.promise();
    };
}

export default EICSystemTrackerDataController;