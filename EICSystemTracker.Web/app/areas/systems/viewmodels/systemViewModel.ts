import PageViewModel from '../../../framework/domain/PageViewModel';
import ko from '../../../lib/knockout';

import systemsCacheService from '../services/SystemsCacheService';
import SystemUtils from '../../../framework/systemutils';

class SystemViewModel extends PageViewModel {

    public selectedSystem: KnockoutObservable<IEICSystem> = ko.observable(null);
    public isLoading: KnockoutObservable<boolean> = ko.observable(false);
    public systemName: KnockoutObservable<string> = ko.observable("");
    public pieChartData: KnockoutObservableArray<CircularChartData> = ko.observableArray([]);
    public selectedSystemChartCfg: IPieChartBinding = <IPieChartBinding>{
        PieChartOptions: <PieChartOptions>{
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke: true,

            //String - The colour of each segment stroke
            segmentStrokeColor: "#fff",

            //Number - The width of each segment stroke
            segmentStrokeWidth: 2,

            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout: 0, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps: 100,

            //String - Animation easing effect
            animationEasing: "easeOutBounce",

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate: true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale: false,

            //String - A legend template
            legendTemplate: null
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
    }

    constructor() {
        super();

        this.selectedSystem.subscribe(() => {
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
        });
    }
}

export default SystemViewModel;