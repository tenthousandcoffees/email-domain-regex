const should = require('chai').should();

let emailDomainRegexp;

describe('email-domain-regexp', () => {

    beforeEach(() => {
        emailDomainRegexp = require('../email-domain-regexp');
    });

    it('should match naked domains.', () => {
        const wildCardDomain = ['*.test.com'];
        const subDomains = ['test1@test.com', 'test2@test.com'];
        const genRegex = emailDomainRegexp(wildCardDomain);
        subDomains.forEach(subDomain => genRegex.test(subDomain).should.be.true);
    });

    it('should match subdomains.', () => {
        const wildCardDomain = ['*.test.com'];
        const subDomains = ['test@a.test.com', 'test@ab.test.com'];
        const genRegex = emailDomainRegexp(wildCardDomain);
        subDomains.forEach(subDomain => genRegex.test(subDomain).should.be.true);
    });

    it('should match multiple different naked domains.', () => {
        const wildCardDomains = ['*.domainOne.com', '*.domainTwo.com'];
        const subDomains = ['test@a.domainOne.com', 'test@ab.domainTwo.com'];
        const genRegex = emailDomainRegexp(wildCardDomains);
        subDomains.forEach(subDomain => genRegex.test(subDomain).should.be.true);
    });

    it('should ignore whitespace in email addresses', () => {
        const wildCardDomains = ['*.domainOne.com', '*.domainTwo.com'];
        const subDomains = ['test@a.domainOne.com   ', 'test@ab.domainTwo.com    '];
        const genRegex = emailDomainRegexp(wildCardDomains);
        subDomains.forEach(subDomain => genRegex.test(subDomain).should.be.true);
    });

    it('should match domain case insensitively', () => {
        const wildCardDomains = ['*.domainone.com', 'domaintwo.com'];
        const subDomains = ['test@A.DOMAINONE.com', 'test@a.DOMAINONE.com', 'test@DOMAINTWO.com'];
        const genRegex = emailDomainRegexp(wildCardDomains);
        subDomains.forEach(subDomain => genRegex.test(subDomain).should.be.true);
    });
});