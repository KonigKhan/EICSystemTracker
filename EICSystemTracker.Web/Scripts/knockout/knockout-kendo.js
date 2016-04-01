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
knockout_1.default.bindingHandlers['kendoAutoComplete'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        // First get the latest data that we're bound to
        var options = valueAccessor() || {};
        var others = allBindings() || {};
        //create AutoComplete UI component
        jquery_1.default.support.cors = true;
        jquery_1.default(element).kendoAutoComplete({
            dataTextField: 'Name',
            minLength: 3,
            filter: "startswith",
            placeholder: "Select System...",
            dataSource: options.ds
        });
    }
};
knockout_1.default.bindingHandlers['kendoMultiSelect'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        // First get the latest data that we're bound to
        var options = valueAccessor() || {};
        var others = allBindings() || {};
        //create AutoComplete UI component
        jquery_1.default.support.cors = true;
        var multiSelect = jquery_1.default(element).kendoMultiSelect({
            dataTextField: options.dataTextField,
            dataValueField: options.dataValueField,
            dataSource: options.dataSource,
            minLength: options.minLength,
            maxSelectedItems: options.maxSelectedItems,
            filter: options.filter,
            ignoreCase: options.ignoreCase,
            placeholder: options.placeholder,
            value: options.value(),
            change: function (e) {
                var value = multiSelect.value();
                if (value.toString() !== options.value().toString()) {
                    options.value(value);
                }
                //console.debug("chagned multiselect value: " + value);
            }
        }).data("kendoMultiSelect");
        options.value.subscribe(function (newValue) {
            var curValue = multiSelect.value();
            if (curValue.toString() !== newValue.toString()) {
                multiSelect.value(newValue);
                multiSelect.trigger("change");
            }
        });
    }
};
knockout_1.default.bindingHandlers['kendoDropDownList'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        // First get the latest data that we're bound to
        var options = valueAccessor() || {};
        var others = allBindings() || {};
        //create AutoComplete UI component
        var dropDown = jquery_1.default(element).kendoDropDownList({
            dataTextField: options.dataTextField,
            dataValueField: options.dataValueField,
            optionLabel: options.optionLabel,
            dataSource: options.dataSource,
            value: options.value(),
            change: function (e) {
                var value = dropDown.value();
                if (value !== options.value()) {
                    options.value(value);
                }
                //console.debug("chagned multiselect value: " + value);
            }
        }).data("kendoDropDownList");
        options.value.subscribe(function (newValue) {
            var curValue = dropDown.value();
            if (curValue !== newValue) {
                dropDown.value(newValue);
                dropDown.trigger("change");
            }
        });
    }
};
//# sourceMappingURL=knockout-kendo.js.map