
import $ from '../lib/jquery';

class CmdrService {

    public static GetCmdrCurrentSystem = (): JQueryPromise<any> => {

        var dfd = $.Deferred();

        $.get("/api/EICSystemTrackerData/GetCmdrCurrentSystem").done((result: IEICSystem) => {
            dfd.resolve(result);
        });

        return dfd.promise();
    };

}

export default CmdrService;