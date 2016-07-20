(function(global, factory) {
    'use strict';
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(
            typeof _ !== 'undefined' ? _ : require('lodash'),
            typeof escapeStringRegexp !== 'undefined' ? escapeStringRegexp : require('escape-string-regexp')
        );
    } else {
        global.emailDomainRegexp = factory(_, escapeStringRegexp);
    }
})(this, function (_, escapeString) {
    return function emailDomainRegex(approvedDomains) {
        var checkDomainRegex = _(approvedDomains)
            .map(function(domain) { return escapeString(_.trim(domain, ' @')).replace('\\*\\.', '(\\w*\\.|)'); })
            .join('|');
        return new RegExp('@(' + checkDomainRegex + ')\\s*$', 'i');
    }
});
