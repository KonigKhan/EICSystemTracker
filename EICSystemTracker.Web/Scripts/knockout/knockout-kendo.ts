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
        $(element).kendoAutoComplete({
            dataTextField: 'name',
            minLength: 3,
            filter: "startswith",
            placeholder: "Select System...",
            dataSource: options.ds
            //separator: ", "
        });
    }
};