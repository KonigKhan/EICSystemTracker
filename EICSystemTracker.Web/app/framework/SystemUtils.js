var jquery_1 = require('../../app/lib/jquery');
var SystemUtils;
(function (SystemUtils) {
    function ImportModuleAsync(moduleName) {
        var modulePromise = new Promise(function (resolve, reject) {
            System.import(moduleName).then(function (mod) {
                resolve(mod.default);
            }).catch(function (reason) {
                reject(reason);
            });
        });
        return modulePromise;
    }
    SystemUtils.ImportModuleAsync = ImportModuleAsync;
    function LoadTemplateAsync(templateId, templatePath) {
        var $head = jquery_1.default('head');
        if (!document.getElementById(templateId)) {
            return jquery_1.default.get(templatePath).done(function (d) {
                var $elem = jquery_1.default(d);
                console.log("Loaded Template " + templateId);
                $head.append($elem);
            }).fail(function (e) {
                console.log("Issue Loading Template: " + templatePath);
            });
        }
        return jquery_1.default.Deferred().resolve().promise();
    }
    SystemUtils.LoadTemplateAsync = LoadTemplateAsync;
    ;
    function LoadTemplatesAsync(definitions) {
        var templatesPromise = jquery_1.default.map(definitions, function (elem) {
            return LoadTemplateAsync(elem.templateId, elem.templatePath);
        });
        var dfdTemplates = jquery_1.default.Deferred();
        jquery_1.default.when.apply(jquery_1.default, templatesPromise).done(function () {
            dfdTemplates.resolve();
        }).fail(function (e) {
            console.log("Issue Loading Templates " + e);
        });
        return dfdTemplates.promise();
    }
    SystemUtils.LoadTemplatesAsync = LoadTemplatesAsync;
    ;
    function LoadStyleAsync(path) {
        //path += '?v=' + parameters.version;
        var dfdLink = jquery_1.default.Deferred();
        //if (!document.getElementById(path)) {
        //    var head = document.getElementsByTagName('head')[0];
        //    var link = document.createElement('link');
        //    link.id = path;
        //    link.rel = 'stylesheet';
        //    link.type = 'text/css';
        //    link.href = path;
        //    link.media = 'all';
        //    link.onload = dfdLink.resolve;
        //    link.onerror = dfdLink.reject;
        //    head.appendChild(link);
        //}
        System.import(path + '!css').then(function () {
            dfdLink.resolve();
        });
        return dfdLink.promise();
    }
    SystemUtils.LoadStyleAsync = LoadStyleAsync;
    function AddToSessionCache(key, value) {
        if (document["SessionCache"]) {
            document["SessionCache"][key] = value;
        }
        else {
            document["SessionCache"] = {};
            document["SessionCache"][key] = value;
        }
    }
    SystemUtils.AddToSessionCache = AddToSessionCache;
    function GetSessionCacheValue(key) {
        if (document["SessionCache"]) {
            return document["SessionCache"][key];
        }
        else {
            return null;
        }
    }
    SystemUtils.GetSessionCacheValue = GetSessionCacheValue;
})(SystemUtils || (SystemUtils = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemUtils;
//# sourceMappingURL=SystemUtils.js.map