import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

import eicDataController from '../controllers/EICSystemTrackerDataController';
import systemsCacheService from '../../../services/systemscacheservice';
import SystemUtils from '../../../framework/systemutils';

class SystemViewModel extends PageViewModel {

    public selectedSystem: KnockoutObservable<IEICSystem> = ko.observable(null);
    public isLoading: KnockoutObservable<boolean> = ko.observable(false);
    public systemName: KnockoutObservable<string> = ko.observable("");
    public pieChartData: KnockoutObservableArray<CircularChartData> = ko.observableArray([]);
    public selectedSystemChartCfg: IPieChartBinding = <IPieChartBinding>{
        PieChartOptions: <PieChartOptions>{
            segmentShowStroke: true, //Boolean - Whether we should show a stroke on each segment
            segmentStrokeColor: "#fff", //String - The colour of each segment stroke
            segmentStrokeWidth: 2, //Number - The width of each segment stroke
            percentageInnerCutout: 0, //Number - The percentage of the chart that we cut out of the middle
            animationSteps: 200, //Number - Amount of animation steps
            animationEasing: "easeOutBounce", //String - Animation easing effect
            animateRotate: true, //Boolean - Whether we animate the rotation of the Doughnut
            animateScale: false, //Boolean - Whether we animate scaling the Doughnut from the centre
            legendTemplate: null //String - A legend template
        },
        PieChartData: this.pieChartData
    };


    Shown() {
        super.Shown();

        var sysName: string = location.hash.substring(location.hash.lastIndexOf("/") + 1);
        var sys: IEICSystem = systemsCacheService.GetSystems().filter((s: IEICSystem) => {
            return s.Name.toLowerCase() === sysName.toLowerCase();
        })[0];

        if (sys) {
            console.info('Found System! ' + sys.Name);
            this.selectedSystem(sys);
        }
        else {
            this.isLoading(true);
            eicDataController.GetLatestSystemTrackingData().done((returnData: IEICSystem) => {

                console.info('Found System! ' + returnData[0].Name);
                this.selectedSystem(returnData[0]);

            }).always(() => {
                this.isLoading(false);
            });
        }
    }

    constructor() {
        super();

        this.selectedSystem.subscribe(() => {
            if (this.selectedSystem()) {
                var factionChartData: Array<CircularChartData> = (<Array<IEICSystemFaction>>this.selectedSystem().TrackedFactions).filter((tf: IEICSystemFaction) => {
                    return tf.Influence > 0;
                }).map((fac: IEICSystemFaction) => {
                    return <CircularChartData>{
                        label: fac.Faction.Name,
                        value: fac.Influence,
                        color: fac.Faction.ChartColor,
                        highlight: fac.Faction.ChartColor
                    };
                });

                this.pieChartData(factionChartData);
            }
        });
    }
}

export default SystemViewModel;