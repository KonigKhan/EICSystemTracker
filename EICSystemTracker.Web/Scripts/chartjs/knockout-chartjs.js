"use strict";
var jquery_1 = require('../../app/lib/jquery');
var knockout_1 = require('../../app/lib/knockout');
//ko.bindingHandlers.yourBindingName = {
//    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
//        // This will be called when the binding is first applied to an element
//        // Set up any initial state, event handlers, etc. here
//    },
//    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
//        // This will be called once when the binding is first applied to an element,
//        // and again whenever any observables/computeds that are accessed change
//        // Update the DOM element based on the supplied values here.
//    }
//};
function CheckForCanvas(el) {
    // Throw exception if not a canvas
    if (el.nodeName.toLowerCase() !== 'canvas') {
        console.error('PieChart can only be bound to canvas elements.');
        throw 'PieChart can only be bound to canvas elements.';
    }
}
knockout_1.default.bindingHandlers['PieChart'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        // First get the latest data that we're bound to
        var options = valueAccessor() || {};
        var others = allBindings() || {};
        CheckForCanvas(element);
        var canvas = jquery_1.default(element).get(0);
        var ctx = canvas.getContext('2d');
        var chartOptions = options.PieChartOptions;
        var testPie = new Chart(ctx).Pie(options.PieChartData(), chartOptions);
        //create AutoComplete UI component
        //var dropDown = $(element).kendoDropDownList({
        //    dataTextField: options.dataTextField,
        //    dataValueField: options.dataValueField,
        //    optionLabel: options.optionLabel,
        //    dataSource: options.dataSource,
        //    value: options.value(),
        //    change: (e) => {
        //        var value = dropDown.value();
        //        if (value !== options.value()) {
        //            options.value(value);
        //        }
        //        //console.debug("chagned multiselect value: " + value);
        //    }
        //}).data("kendoDropDownList");
        //options.value.subscribe((newValue) => {
        //    var curValue = dropDown.value();
        //    if (curValue !== newValue) {
        //        dropDown.value(newValue);
        //        dropDown.trigger("change");
        //    }
        //});
        options.PieChartData.subscribe(function (newData) {
            testPie.destroy();
            testPie = new Chart(ctx).Pie(newData, chartOptions);
        });
    }
};
//# sourceMappingURL=knockout-chartjs.js.map