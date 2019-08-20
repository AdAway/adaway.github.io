const parseDomain = require("parse-domain");
const fs = require('fs');
const readline = require('readline');

/*
 * Customize hosts path here.
 */
const hostsFile = '../hosts.txt';
const formattedHostsFile = '../formatted-hosts.txt';

function parseHostname(line) {
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

function compareDomains(a, b) {
    // Compare TLD
    if (a.domain.tld < b.domain.tld) {
        return -1;
    } else if (a.domain.tld > b.domain.tld) {
        return 1;
    } else {
        // Compare domain
        if (a.domain.domain < b.domain.domain) {
            return -1;
        } else if (b.domain.domain > b.domain.domain) {
            return 1;
        } else {
            // Compare sub domain
            if (a.domain.subddman < b.domain.subdomain) {
                return -1;
            } else if (a.domain.subdomain > b.domain.subdomain) {
                return 1;
            } else {
                return 0;
            }
        }

    }
}

function writeFormattedHosts(path, domains) {
    domains.sort(compareDomains);

    var content = "";
    var lastDomain = null;
    for (const domain of domains) {

        if (lastDomain == null || lastDomain.domain.tld !== domain.domain.tld || lastDomain.domain.domain !== domain.domain.domain) {
            content += `\n# [${domain.domain.domain}.${domain.domain.tld}]\n`;
        }
        content += `127.0.0.1 ${domain.host}\n`;
        lastDomain = domain;
    }

    fs.writeFile(path, content, function (err) {
        if (err) {
            throw err;
        }
        console.log(`Host formatted: ${domains.length} entries`);
    });
}


const domains = [];

const rl = readline.createInterface({
    input: fs.createReadStream(hostsFile),
    crlfDelay: Infinity
});


rl.on('line', (line) => {
    const domain = parseHostname(line);
    if (domain) {
        domains.push(domain);
    }
}).on('close', () => {
    writeFormattedHosts(formattedHostsFile, domains);
})
