var jquery_1 = require('../../app/lib/jquery');
var knockout_1 = require('../../app/lib/knockout');
knockout_1.default.bindingHandlers['kendoAutoComplete'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = valueAccessor() || {};
        var others = allBindings() || {};
        jquery_1.default.support.cors = true;
        var autoComplete = jquery_1.default(element).kendoAutoComplete({
            minLength: options.minLength,
            filter: options.filter,
            placeholder: options.placeholder,
            dataSource: options.dataSource,
            change: function (e) {
                var value = autoComplete.value();
                if (value.toString() !== options.value().toString()) {
                    options.value(value);
                }
            }
        }).data("kendoAutoComplete");
        options.value.subscribe(function (newValue) {
            var curValue = autoComplete.value();
            if (curValue.toString() !== newValue.toString()) {
                autoComplete.value(newValue);
                autoComplete.trigger("change");
            }
        });
    }
};
knockout_1.default.bindingHandlers['kendoMultiSelect'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = valueAccessor() || {};
        var others = allBindings() || {};
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
        var options = valueAccessor() || {};
        var others = allBindings() || {};
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
