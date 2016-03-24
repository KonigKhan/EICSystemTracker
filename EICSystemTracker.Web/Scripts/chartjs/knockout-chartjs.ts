import $ from '../../app/lib/jquery';
import ko from '../../app/lib/knockout';

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

ko.bindingHandlers['chartJsPieChart'] = {
    init: (element, valueAccessor, allBindings, viewModel, bindingContext) => {

        // First get the latest data that we're bound to
        var options = valueAccessor() || {};
        var others = allBindings() || {};

        var data = [
            {
                value: 300,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ];

        var canvas = <HTMLCanvasElement>$(element).get(0);
        var ctx = canvas.getContext('2d');

        var testPie = new Chart(ctx).Pie(data);

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
    }
};