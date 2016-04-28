
import $ from '../lib/jquery';

class CmdrService {

    public static GetCmdrCurrentSystem = (): JQueryPromise<any> => {

        return $.get("/api/EICSystemTrackerData/GetCmdrCurrentSystem");
    };

    public static GetSavedSettings = (): JQueryPromise<IEICSystemTrackerConfig> => {
        return $.get("/api/UserConfiguration/GetSavedSettings");
    }

    public static SaveSettings = (config: IEICSystemTrackerConfig): JQueryPromise<any> => {

        var dfd = $.Deferred();

        $.ajax({
            type: "POST",
            url: "/api/UserConfiguration/SaveSettings",
            data: config,
            success: function (res) {
                if (res === "OK")
                    dfd.resolve(config);
                else {
                    dfd.reject();
                }
            },
            dataType: 'json'
        });

        return dfd.promise();

    }

    public static RegisterNewCommander = (cmdr: ICommander) => {
        var dfd = $.Deferred();

        $.ajax({
            type: "POST",
            url: "/api/UserConfiguration/RegisterNewCommander",
            data: cmdr,
            success: function (res) {
                if (res === "OK")
                    dfd.resolve(cmdr);
                else {
                    dfd.reject();
                }
            },
            error: function () {
                dfd.reject();
            },
            dataType: 'json'
        });

        return dfd.promise();
    }

    public static CmdrLogIn = (cmdr: ICommander) => {
        var dfd = $.Deferred();

        $.ajax({
            type: "POST",
            url: "/api/UserConfiguration/CmdrLogIn",
            data: cmdr,
            success: function (res) {
                if (res === "OK")
                    dfd.resolve(cmdr);
                else {
                    dfd.reject();
                }
            },
            error: function () {
                dfd.reject();
            },
            dataType: 'json'
        });

        return dfd.promise();
    }
}

export default CmdrService;