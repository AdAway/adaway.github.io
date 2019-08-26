const assert = require('assert');
const parseDomain = require('parse-domain');
const domains = require('../domain');

describe('domains', function () {
    describe('#compare()', function () {
        it('should group domain with subdomains', function () {
            var sourceDomains = [
                "content.ad",
                "token.ad",
                "api.content.ad"
            ];
            var sortedDomains = [
                "content.ad",
                "api.content.ad",
                "token.ad",
            ];

            sourceDomains = sourceDomains.map(domain => {
                return {
                    host: domain,
                    domain: parseDomain(domain)
                }
            });
            sourceDomains.sort(domains.compare);
            sourceDomains = sourceDomains.map(domain => domain.host);

            assert.deepEqual(sourceDomains, sortedDomains);
        });
    });
});
