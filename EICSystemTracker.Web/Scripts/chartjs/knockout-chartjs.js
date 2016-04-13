var jquery_1 = require('../../app/lib/jquery');
var knockout_1 = require('../../app/lib/knockout');
function CheckForCanvas(el) {
    if (el.nodeName.toLowerCase() !== 'canvas') {
        console.error('PieChart can only be bound to canvas elements.');
        throw 'PieChart can only be bound to canvas elements.';
    }
}
knockout_1.default.bindingHandlers['PieChart'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = valueAccessor() || {};
        var others = allBindings() || {};
        CheckForCanvas(element);
        var canvas = jquery_1.default(element).get(0);
        var ctx = canvas.getContext('2d');
        var chartOptions = options.PieChartOptions;
        var testPie = new Chart(ctx).Pie(options.PieChartData(), chartOptions);
        options.PieChartData.subscribe(function (newData) {
            testPie.destroy();
            testPie = new Chart(ctx).Pie(newData, chartOptions);
        });
    }
};
