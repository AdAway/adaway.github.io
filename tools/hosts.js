import { parseDomain, ParseResultType } from "parse-domain";

function parse(line) {
    if (!line.startsWith("127.0.0.1 ")) {
        return;
    }
    var host = line.substring(10);
    var commentIndex = host.indexOf("#");
    if (commentIndex !== -1) {
        host = host.substring(0, commentIndex);
    }
    host = host.trim();

    const parseResult = parseDomain(host);
    if (parseResult.type === ParseResultType.Invalid) {
        console.log("Failed to parse host: " + host);
    } else if (parseResult.type === ParseResultType.Ip) {
        console.log("Skipping IP address: " + host);
    } else if (parseResult.type === ParseResultType.Reserved) {
        console.log("Skipping reserved host: " + host);
    } else {
        return parseResult;
    }
}

function format(domains) {
    var content = "";
    var lastDomain = null;
    for (const domain of domains) {
        if (!lastDomain || !tldMatch(lastDomain, domain) || lastDomain.domain !== domain.domain) {
            content += `\n# [${domain.domain}.${domain.topLevelDomains.join('.')}]\n`;
        }
        content += `127.0.0.1 ${domain.hostname}\n`;
        lastDomain = domain;
    }
    return content;
}

function tldMatch(a, b) {
    return a.topLevelDomains.length === b.topLevelDomains.length &&
    a.topLevelDomains.every((val, index) => val === b.topLevelDomains[index]);
}

export { parse, format };
