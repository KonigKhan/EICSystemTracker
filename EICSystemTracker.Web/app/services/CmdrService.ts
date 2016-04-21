
import $ from '../lib/jquery';

class CmdrService {

    public static GetCmdrCurrentSystem = (): JQueryPromise<any> => {

        return $.get("/api/EICSystemTrackerData/GetCmdrCurrentSystem");
    };

}

export default CmdrService;