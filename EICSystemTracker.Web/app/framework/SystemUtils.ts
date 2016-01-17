import $ from '../../app/lib/jquery';
import FrameworkManifest from '../../manifest';

module SystemUtils {

    export function ImportModuleAsync<T>(moduleName: string): Promise<T> {

        var modulePromise = new Promise<T>((resolve, reject) => {
            System.import(moduleName).then((mod) => {
                resolve(mod.default);
            }).catch((reason) => {
                reject(reason);
            });
        });

        return modulePromise;
    }

    export function LoadTemplateAsync(templateId: string, templatePath: string): JQueryPromise<any> {
        var $head = $('head');
        if (!document.getElementById(templateId)) {
            return $.get(templatePath).done((d) => {
                var $elem = $(d);
                console.log("Loaded Template " + templateId);
                $head.append($elem);
            }).fail((e) => {
                console.log("Issue Loading Template: " + templatePath);
            });
        }

        return $.Deferred().resolve().promise();
    };

    export function LoadTemplatesAsync(definitions: ITemplateDefinition[]): JQueryPromise<any> {

        var templatesPromise = $.map(definitions, (elem) => {
            return LoadTemplateAsync(elem.templateId, elem.templatePath);
        });

        var dfdTemplates = $.Deferred();
        $.when.apply($, templatesPromise).done(() => {
            dfdTemplates.resolve();
        }).fail((e) => {
            console.log("Issue Loading Templates " + e);
        });

        return dfdTemplates.promise();
    };

    export function LoadStyleAsync(path: string): JQueryPromise<Event> {
        //path += '?v=' + parameters.version;
        var dfdLink = $.Deferred<Event>();
        if (!document.getElementById(path)) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = path;
            link.media = 'all';
            link.onload = dfdLink.resolve;
            link.onerror = dfdLink.reject;
            head.appendChild(link);
        }
        return dfdLink.promise();
    }

    export function AddToSessionCache(key: string, value: any): void {
        if (document["SessionCache"]) {
            document["SessionCache"][key] = value;
        }
        else {
            document["SessionCache"] = {};
            document["SessionCache"][key] = value;
        }

    }

    export function GetSessionCacheValue(key: string): any {

        if (document["SessionCache"]) {
            return document["SessionCache"][key];
        }
        else {
            return null;
        }
    }
}

export default SystemUtils;