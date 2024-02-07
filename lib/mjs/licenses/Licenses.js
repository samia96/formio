import _ from 'lodash';
class Licenses {
    static licenses = {};
    static addLicense(name, license) {
        Licenses.licenses[name] = license;
    }
    static getLicense(name) {
        return Licenses.licenses[name];
    }
    static removeLicense(name) {
        _.unset(Licenses.licenses, name);
    }
    static getLicenses() {
        return Licenses.licenses;
    }
}
export default Licenses;
