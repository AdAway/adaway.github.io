function compare(a, b) {
    // Compare apex domain
    const apexDomainA = a.domain.domain + '.' + a.domain.tld;
    const apexDomainB = b.domain.domain + '.' + b.domain.tld;
    if (apexDomainA < apexDomainB) {
        return -1;
    } else if (apexDomainA > apexDomainB) {
        return 1;
    } else {
        // Compare sub domain
        if (a.domain.subdomain < b.domain.subdomain) {
            return -1;
        } else if (a.domain.subdomain > b.domain.subdomain) {
            return 1;
        } else {
            return 0;
        }
    }
}

exports.compare = compare;
