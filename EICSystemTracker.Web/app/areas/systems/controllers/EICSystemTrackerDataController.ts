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

}

export default EICSystemTrackerDataController;