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

    public static UpdateSystemFactionInfo = (systemFaction: IEICSystem): JQueryPromise<any> => {

        var dfd = $.Deferred();

        $.ajax({
            type: "POST",
            url: "/api/EICSystemTrackerData/UpdateSystemFactionInfo",
            data: systemFaction,
            dataType: 'json'
        }).done((res) => {
            dfd.resolve(res);
        }).fail((res) => {
            dfd.reject(res);
        });


        return dfd.promise();
    };

}

export default EICSystemDataController;