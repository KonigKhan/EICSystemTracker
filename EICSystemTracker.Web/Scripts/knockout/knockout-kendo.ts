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

ko.bindingHandlers['kendoAutoComplete'] = {
    init: (element, valueAccessor, allBindings, viewModel, bindingContext) => {

        // First get the latest data that we're bound to
        var options = valueAccessor() || {};
        var others = allBindings() || {};

        //create AutoComplete UI component
        $.support.cors = true;
        $(element).kendoAutoComplete({
            dataTextField: 'Name',
            minLength: 3,
            filter: "startswith",
            placeholder: "Select System...",
            dataSource: options.ds
            //separator: ", "
        });
    }
};

ko.bindingHandlers['kendoMultiSelect'] = {
    init: (element, valueAccessor, allBindings, viewModel, bindingContext) => {

        // First get the latest data that we're bound to
        var options = valueAccessor() || {};
        var others = allBindings() || {};

        //create AutoComplete UI component
        $.support.cors = true;
        var multiSelect = $(element).kendoMultiSelect({
            dataTextField: options.dataTextField,
            dataValueField: options.dataValueField,
            dataSource: options.dataSource,
            minLength: options.minLength,
            maxSelectedItems: options.maxSelectedItems,
            filter: options.filter,
            ignoreCase: options.ignoreCase,
            placeholder: options.placeholder,
            value: options.value(),
            change: (e) => {
                var value = multiSelect.value();

                if (value.toString() !== options.value().toString()) {
                    options.value(value);
                }
                //console.debug("chagned multiselect value: " + value);
            }
        }).data("kendoMultiSelect");



        options.value.subscribe((newValue) => {
            var curValue = multiSelect.value();
            if (curValue.toString() !== newValue.toString()) {
                multiSelect.value(newValue);
                multiSelect.trigger("change");
            }
        });
    }
};

ko.bindingHandlers['kendoDropDownList'] = {
    init: (element, valueAccessor, allBindings, viewModel, bindingContext) => {

        // First get the latest data that we're bound to
        var options = valueAccessor() || {};
        var others = allBindings() || {};

        //create AutoComplete UI component
        var dropDown = $(element).kendoDropDownList({
            dataTextField: options.dataTextField,
            dataValueField: options.dataValueField,
            optionLabel: options.optionLabel,
            dataSource: options.dataSource,
            value: options.value(),
            change: (e) => {
                var value = dropDown.value();

                if (value !== options.value()) {
                    options.value(value);
                }
                //console.debug("chagned multiselect value: " + value);
            }
        }).data("kendoDropDownList");



        options.value.subscribe((newValue) => {
            var curValue = dropDown.value();
            if (curValue !== newValue) {
                dropDown.value(newValue);
                dropDown.trigger("change");
            }
        });
    }
};