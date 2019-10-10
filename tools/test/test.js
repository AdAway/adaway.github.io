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

        it('should group domain whatever their TLD', function () {
            var sourceDomains = [
                "content.ad",
                "token.pub",
                "content.pub",
                "token.ad",
                "api.content.ad",
                "api.content.pub"
            ];
            var sortedDomains = [
                "content.ad",
                "api.content.ad",
                "content.pub",
                "api.content.pub",
                "token.ad",
                "token.pub"
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

        it('should sort subdomains', function () {
            var sourceDomains = [
                "content.ad",
                "first.abc.content.ad",
                "abc.content.ad",
                "def.content.ad",
                "second.abc.content.ad",
                "second.def.content.ad",
                "first.def.content.ad"
            ];
            var sortedDomains = [
                "content.ad",
                "abc.content.ad",
                "first.abc.content.ad",
                "second.abc.content.ad",
                "def.content.ad",
                "first.def.content.ad",
                "second.def.content.ad"
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
