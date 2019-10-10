function compare(a, b) {
    // Compare apex domain then subdomains
    const apexDomainA = a.domain.domain + '.' + a.domain.tld;
    const apexDomainB = b.domain.domain + '.' + b.domain.tld;
    if (apexDomainA < apexDomainB) {
        return -1;
    } else if (apexDomainA > apexDomainB) {
        return 1;
    } else {
        return compareSubdomain(a.domain.subdomain, b.domain.subdomain);
    }
}

function compareSubdomain(a, b) {
    const aParts = a.split('.');
    const bParts = b.split('.');
    while (aParts.length > 0 && bParts.length > 0) {
        const aPart = aParts.pop();
        const bPart = bParts.pop();
        if (aPart < bPart) {
            return -1;
        } else if (aPart > bPart) {
            return 1;
        }
    }
    return aParts.length - bParts.length;
}

exports.compare = compare;
