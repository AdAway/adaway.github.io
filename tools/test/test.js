import { deepStrictEqual } from 'assert';
import { parseDomain, ParseResultType } from "parse-domain";
import { compare } from '../domain.js';

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

            sourceDomains = sourceDomains.map(domain => parseDomain(domain));
            sourceDomains.sort(compare);
            sourceDomains = sourceDomains.map(domain => domain.hostname);

            deepStrictEqual(sourceDomains, sortedDomains);
        });

        // it('temp test', function () {
        //     var sourceDomains = [
        //         "mobile.api.hmageo.com",
        //         "hnbutton.appspot.com",
        //         "holder.com.ua",
        //     ];
        //     var sortedDomains = [
        //         "hnbutton.appspot.com",
        //         "mobile.api.hmageo.com",
        //         "holder.com.ua",
        //     ];

        //     sourceDomains = sourceDomains.map(domain => parseDomain(domain));
        //     sourceDomains.sort(compare);
        //     sourceDomains = sourceDomains.map(domain => domain.hostname);

        //     deepStrictEqual(sourceDomains, sortedDomains);
        // });
        
        // it('temp test2', function () {
        //     var sourceDomains = [
        //         "admarvel.com",
        //         "admarvel.s3.amazonaws.com",
        //         "admaster.com.cn",
        //     ];
        //     var sortedDomains = [
        //         "admarvel.com",
        //         "admaster.com.cn",
        //         "admarvel.s3.amazonaws.com",
        //     ];

        //     sourceDomains = sourceDomains.map(domain => parseDomain(domain));
        //     sourceDomains.sort(compare);
        //     sourceDomains = sourceDomains.map(domain => domain.hostname);

        //     deepStrictEqual(sourceDomains, sortedDomains);
        // });

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

            sourceDomains = sourceDomains.map(domain => parseDomain(domain));
            sourceDomains.sort(compare);
            sourceDomains = sourceDomains.map(domain => domain.hostname);

            deepStrictEqual(sourceDomains, sortedDomains);
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

            sourceDomains = sourceDomains.map(domain => parseDomain(domain));
            sourceDomains.sort(compare);
            sourceDomains = sourceDomains.map(domain => domain.hostname);

            deepStrictEqual(sourceDomains, sortedDomains);
        });
    });
});
