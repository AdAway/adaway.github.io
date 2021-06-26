function compare(a, b) {
    // Compare apex domain then subdomains
    const apexDomainA = a.domain + '.' + a.topLevelDomains.join('.');
    const apexDomainB = b.domain + '.' + b.topLevelDomains.join('.');
    if (apexDomainA < apexDomainB) {
        return -1;
    } else if (apexDomainA > apexDomainB) {
        return 1;
    } else {
        return compareSubdomain(a.subDomains, b.subDomains);
    }
}

function compareIcann(a, b) {
    // Compare apex domain then subdomains
    const apexDomainA = a.icann.domain + '.' + a.icann.topLevelDomains.join('.');
    const apexDomainB = b.icann.domain + '.' + b.icann.topLevelDomains.join('.');
    if (apexDomainA < apexDomainB) {
        return -1;
    } else if (apexDomainA > apexDomainB) {
        return 1;
    } else {
        return compareSubdomain(a.icann.subDomains, b.icann.subDomains);
    }
}

function compareSubdomain(a, b) {
    var aIndex = a.length-1;
    var bIndex = b.length-1;
    while (aIndex >=0 && bIndex >=0) {
        const aSubdomain = a[aIndex];
        const bSubdomain = b[bIndex];
        aIndex--;
        bIndex--;
        if (aSubdomain < bSubdomain) {
            return -1;
        } else if (aSubdomain > bSubdomain) {
            return 1;
        }
    }
    return a.length - b.length;
}

export { compare, compareIcann }; 
