const parseDomain = require('parse-domain');

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

    const domain = parseDomain(host);
    if (!domain) {
        console.log("Failed to parse host: " + host);
        return;
    }
    return {
        host: host,
        domain: domain
    };
}

function format(domains) {
    var content = "";
    var lastDomain = null;
    for (const domain of domains) {

        if (lastDomain == null || lastDomain.domain.tld !== domain.domain.tld || lastDomain.domain.domain !== domain.domain.domain) {
            content += `\n# [${domain.domain.domain}.${domain.domain.tld}]\n`;
        }
        content += `127.0.0.1 ${domain.host}\n`;
        lastDomain = domain;
    }
    return content;
}

exports.parse = parse;
exports.format = format;
