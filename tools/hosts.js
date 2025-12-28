import { parseDomain, ParseResultType } from "parse-domain";

const BLOCKED_IPS = ["127.0.0.1", "0.0.0.0"];

/**
 * Parse a hosts file line and extract domain information
 * @param {string} line - A line from the hosts file
 * @returns {object|undefined} Parsed domain result or undefined if invalid
 */
function parse(line) {
    const trimmedLine = line.trim();
    
    // Find matching blocked IP prefix
    const matchedIp = BLOCKED_IPS.find(ip => trimmedLine.startsWith(`${ip} `));
    if (!matchedIp) {
        return;
    }
    
    let host = trimmedLine.substring(matchedIp.length + 1);
    
    // Remove inline comments
    const commentIndex = host.indexOf("#");
    if (commentIndex !== -1) {
        host = host.substring(0, commentIndex);
    }
    host = host.trim();
    
    if (!host) {
        return;
    }

    const parseResult = parseDomain(host);
    if (parseResult.type === ParseResultType.Invalid) {
        console.log(`Failed to parse host: ${host}`);
    } else if (parseResult.type === ParseResultType.Ip) {
        console.log(`Skipping IP address: ${host}`);
    } else if (parseResult.type === ParseResultType.Reserved) {
        console.log(`Skipping reserved host: ${host}`);
    } else {
        return parseResult;
    }
}

/**
 * Format parsed domains back into hosts file format
 * @param {Array} domains - Array of parsed domain objects
 * @returns {string} Formatted hosts file content
 */
function format(domains) {
    let content = "";
    let lastDomain = null;
    
    for (const domain of domains) {
        if (!lastDomain || !tldMatch(lastDomain, domain) || lastDomain.domain !== domain.domain) {
            content += `\n# [${domain.domain}.${domain.topLevelDomains.join(".")}]\n`;
        }
        content += `127.0.0.1 ${domain.hostname}\n`;
        lastDomain = domain;
    }
    
    return content;
}

/**
 * Check if two domains have matching TLDs
 * @param {object} a - First domain
 * @param {object} b - Second domain
 * @returns {boolean} True if TLDs match
 */
function tldMatch(a, b) {
    return a.topLevelDomains.length === b.topLevelDomains.length &&
        a.topLevelDomains.every((val, index) => val === b.topLevelDomains[index]);
}

export { parse, format };
