import { deepStrictEqual } from "node:assert";
import { parseDomain } from "parse-domain";
import { compare } from "../domain.js";

describe("domains", function () {
    describe("#compare()", function () {
        it("should group domain with subdomains", function () {
            const sourceDomains = [
                "content.ad",
                "token.ad",
                "api.content.ad"
            ];
            const expectedDomains = [
                "content.ad",
                "api.content.ad",
                "token.ad"
            ];

            const parsed = sourceDomains.map(domain => parseDomain(domain));
            parsed.sort(compare);
            const result = parsed.map(domain => domain.hostname);

            deepStrictEqual(result, expectedDomains);
        });

        it("should group domain whatever their TLD", function () {
            const sourceDomains = [
                "content.ad",
                "token.pub",
                "content.pub",
                "token.ad",
                "api.content.ad",
                "api.content.pub"
            ];
            const expectedDomains = [
                "content.ad",
                "api.content.ad",
                "content.pub",
                "api.content.pub",
                "token.ad",
                "token.pub"
            ];

            const parsed = sourceDomains.map(domain => parseDomain(domain));
            parsed.sort(compare);
            const result = parsed.map(domain => domain.hostname);

            deepStrictEqual(result, expectedDomains);
        });

        it("should sort subdomains", function () {
            const sourceDomains = [
                "content.ad",
                "first.abc.content.ad",
                "abc.content.ad",
                "def.content.ad",
                "second.abc.content.ad",
                "second.def.content.ad",
                "first.def.content.ad"
            ];
            const expectedDomains = [
                "content.ad",
                "abc.content.ad",
                "first.abc.content.ad",
                "second.abc.content.ad",
                "def.content.ad",
                "first.def.content.ad",
                "second.def.content.ad"
            ];

            const parsed = sourceDomains.map(domain => parseDomain(domain));
            parsed.sort(compare);
            const result = parsed.map(domain => domain.hostname);

            deepStrictEqual(result, expectedDomains);
        });
    });
});
