import $ from '../../../lib/jquery';
import ko from '../../../lib/knockout';

import PageViewModel from '../../../framework/domain/PageViewModel';
import eicDataController from '../controllers/EICSystemTrackerDataController';
import SystemUtils from '../../../framework/systemutils';

class systemsViewModel extends PageViewModel {

    public TrackedSystems: KnockoutObservableArray<IEICSystem> = ko.observableArray([]);
    public selectedSystem: KnockoutObservable<IEICSystem> = ko.observable(null);
    public isLoading: KnockoutObservable<boolean> = ko.observable(false);
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

    constructor() {
        super();
        console.debug('New Systems View Model!');

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
            //this.pieChartData(<Array<CircularChartData>>[
            //    {
            //        value: 300,
            //        color: "#F7464A",
            //        highlight: "#FF5A5E",
            //        label: "Red"
            //    },
            //    {
            //        value: 50,
            //        color: "#46BFBD",
            //        highlight: "#5AD3D1",
            //        label: "Green"
            //    },
            //    {
            //        value: 100,
            //        color: "#FDB45C",
            //        highlight: "#FFC870",
            //        label: "Yellow"
            //    }
            //]);

        });
    }

    public SelectSystem = (selected: IEICSystem) => {
        this.selectedSystem(selected);
    }

    Shown() {
        this._init();
    }

    private _init(): void {
        this.isLoading(true);
        eicDataController.GetLatestSystemTrackingData().done((returnData: Array<IEICSystem>) => {
            //this.SystemFactions(returnData);

            //// Add to unique systems collection.
            //var uniqueSystems: Array<IEICSystem> = [];
            //for (var i = 0, len = this.SystemFactions().length; i < len; i++) {

            //    var curItem: IEICSystemFaction = this.SystemFactions()[i];
            //    var existingSystem = uniqueSystems.filter((s: IEICSystem) => {
            //        return s.Name === curItem.System.Name;
            //    })[0];

            //    if (!existingSystem) {
            //        uniqueSystems.push(curItem.System);
            //    }
            //}

            //this.TrackedSystems(uniqueSystems);
            this.TrackedSystems(returnData);

        }).always(() => {
            this.isLoading(false);
        });
    }
}

export default systemsViewModel;