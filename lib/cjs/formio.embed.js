"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formio = void 0;
const Embed_1 = require("./Embed");
Object.defineProperty(exports, "Formio", { enumerable: true, get: function () { return Embed_1.Formio; } });
const scripts = document.getElementsByTagName('script');
const config = window.FormioConfig || {};
let thisScript = null;
let i = scripts.length;
const scriptName = config.scriptName || 'formio.embed.';
while (i--) {
    if (scripts[i].src && (scripts[i].src.indexOf(scriptName) !== -1)) {
        thisScript = scripts[i];
        break;
    }
}
if (thisScript) {
    const query = {};
    const queryString = thisScript.src.replace(/^[^?]+\??/, '');
    queryString.replace(/\?/g, '&').split('&').forEach((item) => {
        query[item.split('=')[0]] = item.split('=')[1] && decodeURIComponent(item.split('=')[1]);
    });
    let scriptSrc = thisScript.src.replace(/^([^?]+).*/, '$1').split('/');
    scriptSrc.pop();
    if (config.formioPath) {
        config.formioPath(scriptSrc);
    }
    scriptSrc = scriptSrc.join('/');
    Embed_1.Formio.config = Object.assign({
        script: query.script || (`${config.updatePath ? config.updatePath() : scriptSrc}/formio.form.min.js`),
        style: query.styles || (`${config.updatePath ? config.updatePath() : scriptSrc}/formio.form.min.css`),
        cdn: query.cdn,
        class: (query.class || 'formio-form-wrapper'),
        src: query.src,
        form: null,
        submission: null,
        project: query.project,
        base: query.base || 'https://api.form.io',
        submit: query.submit,
        includeLibs: (query.libs === 'true' || query.libs === '1'),
        template: query.template,
        debug: (query.debug === 'true' || query.debug === '1'),
        config: {},
        redirect: (query.return || query.redirect),
        embedCSS: (`${config.updatePath ? config.updatePath() : scriptSrc}/formio.embed.css`),
        success: query.success || 'Thank you for your submission!',
        before: null,
        after: null
    }, config);
    const form = (Embed_1.Formio.config.form || Embed_1.Formio.config.src);
    if (form) {
        Embed_1.Formio.debug('Embedding Configuration', config);
        if (Embed_1.Formio.config.addPremiumLib) {
            Embed_1.Formio.config.addPremiumLib(Embed_1.Formio.config, scriptSrc);
        }
        // The id for this embedded form.
        Embed_1.Formio.config.id = `formio-${Math.random().toString(36).substring(7)}`;
        Embed_1.Formio.debug('Creating form element');
        const element = Embed_1.Formio.createElement('div', {
            'id': Embed_1.Formio.config.id,
            class: Embed_1.Formio.config.class
        });
        // insertAfter doesn't exist, but effect is identical.
        thisScript.parentNode.insertBefore(element, thisScript.parentNode.firstElementChild.nextSibling);
        Embed_1.Formio.createForm(element, form, Embed_1.Formio.config.config).then((instance) => {
            if (Embed_1.Formio.config.submit) {
                instance.nosubmit = true;
            }
            // Configure a redirect.
            instance.on('submit', (submission) => {
                Embed_1.Formio.debug("on('submit')", submission);
                if (Embed_1.Formio.config.submit) {
                    Embed_1.Formio.debug(`Sending submission to ${Embed_1.Formio.config.submit}`);
                    const headers = {
                        'content-type': 'application/json'
                    };
                    const token = Embed_1.Formio.FormioClass.getToken();
                    if (token) {
                        headers['x-jwt-token'] = token;
                    }
                    Embed_1.Formio.FormioClass.fetch(Embed_1.Formio.config.submit, {
                        body: JSON.stringify(submission),
                        headers: headers,
                        method: 'POST',
                        mode: 'cors',
                    })
                        .then(resp => resp.json())
                        .then(submission => Embed_1.Formio.submitDone(instance, submission));
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
