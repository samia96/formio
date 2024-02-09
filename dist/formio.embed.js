"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formio = void 0;
var Embed_1 = require("./Embed");
Object.defineProperty(exports, "Formio", { enumerable: true, get: function () { return Embed_1.Formio; } });
var scripts = document.getElementsByTagName('script');
var config = window.FormioConfig || {};
var thisScript = null;
var i = scripts.length;
var scriptName = config.scriptName || 'formio.embed.';
while (i--) {
    if (scripts[i].src && (scripts[i].src.indexOf(scriptName) !== -1)) {
        thisScript = scripts[i];
        break;
    }
}
if (thisScript) {
    var query_1 = {};
    var queryString = thisScript.src.replace(/^[^?]+\??/, '');
    queryString.replace(/\?/g, '&').split('&').forEach(function (item) {
        query_1[item.split('=')[0]] = item.split('=')[1] && decodeURIComponent(item.split('=')[1]);
    });
    var scriptSrc = thisScript.src.replace(/^([^?]+).*/, '$1').split('/');
    scriptSrc.pop();
    if (config.formioPath) {
        config.formioPath(scriptSrc);
    }
    scriptSrc = scriptSrc.join('/');
    Embed_1.Formio.config = Object.assign({
        script: query_1.script || ("".concat(config.updatePath ? config.updatePath() : scriptSrc, "/formio.form.min.js")),
        style: query_1.styles || ("".concat(config.updatePath ? config.updatePath() : scriptSrc, "/formio.form.min.css")),
        cdn: query_1.cdn,
        class: (query_1.class || 'formio-form-wrapper'),
        src: query_1.src,
        form: null,
        submission: null,
        project: query_1.project,
        base: query_1.base || 'https://api.form.io',
        submit: query_1.submit,
        includeLibs: (query_1.libs === 'true' || query_1.libs === '1'),
        template: query_1.template,
        debug: (query_1.debug === 'true' || query_1.debug === '1'),
        config: {},
        redirect: (query_1.return || query_1.redirect),
        embedCSS: ("".concat(config.updatePath ? config.updatePath() : scriptSrc, "/formio.embed.css")),
        success: query_1.success || 'Thank you for your submission!',
        before: null,
        after: null
    }, config);
    var form = (Embed_1.Formio.config.form || Embed_1.Formio.config.src);
    if (form) {
        Embed_1.Formio.debug('Embedding Configuration', config);
        if (Embed_1.Formio.config.addPremiumLib) {
            Embed_1.Formio.config.addPremiumLib(Embed_1.Formio.config, scriptSrc);
        }
        // The id for this embedded form.
        Embed_1.Formio.config.id = "formio-".concat(Math.random().toString(36).substring(7));
        Embed_1.Formio.debug('Creating form element');
        var element = Embed_1.Formio.createElement('div', {
            'id': Embed_1.Formio.config.id,
            class: Embed_1.Formio.config.class
        });
        // insertAfter doesn't exist, but effect is identical.
        thisScript.parentNode.insertBefore(element, thisScript.parentNode.firstElementChild.nextSibling);
        Embed_1.Formio.createForm(element, form, Embed_1.Formio.config.config).then(function (instance) {
            if (Embed_1.Formio.config.submit) {
                instance.nosubmit = true;
            }
            // Configure a redirect.
            instance.on('submit', function (submission) {
                Embed_1.Formio.debug("on('submit')", submission);
                if (Embed_1.Formio.config.submit) {
                    Embed_1.Formio.debug("Sending submission to ".concat(Embed_1.Formio.config.submit));
                    var headers = {
                        'content-type': 'application/json'
                    };
                    var token = Embed_1.Formio.FormioClass.getToken();
                    if (token) {
                        headers['x-jwt-token'] = token;
                    }
                    Embed_1.Formio.FormioClass.fetch(Embed_1.Formio.config.submit, {
                        body: JSON.stringify(submission),
                        headers: headers,
                        method: 'POST',
                        mode: 'cors',
                    })
                        .then(function (resp) { return resp.json(); })
                        .then(function (submission) { return Embed_1.Formio.submitDone(instance, submission); });
                }
                else {
                    Embed_1.Formio.submitDone(instance, submission);
                }
            });
        });
    }
}
else {
    // Show an error if the script cannot be found.
    document.write('<span>Could not locate the Embedded form.</span>');
}
//# sourceMappingURL=formio.embed.js.map