const escapeString = require('escape-string-regexp');

module.exports = function emailDomainRegex(approvedDomains) {
    const checkDomainRegex = approvedDomains.map(domain => escapeString(domain.trim().replace('@','')).replace('\\*\\.', '(\\w*\\.|)')).join('|');
    return new RegExp('@(' + checkDomainRegex + ')\\s*$', 'i');
};
