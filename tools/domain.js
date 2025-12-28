/**
 * Compare two domains by apex domain, then subdomains
 * @param {object} a - First domain
 * @param {object} b - Second domain
 * @returns {number} Comparison result (-1, 0, or 1)
 */
function compare(a, b) {
    const apexDomainA = `${a.domain}.${a.topLevelDomains.join(".")}`;
    const apexDomainB = `${b.domain}.${b.topLevelDomains.join(".")}`;
    
    if (apexDomainA < apexDomainB) return -1;
    if (apexDomainA > apexDomainB) return 1;
    return compareSubdomain(a.subDomains, b.subDomains);
}

/**
 * Compare two domains using ICANN rules
 * @param {object} a - First domain with icann property
 * @param {object} b - Second domain with icann property
 * @returns {number} Comparison result (-1, 0, or 1)
 */
function compareIcann(a, b) {
    const apexDomainA = `${a.icann.domain}.${a.icann.topLevelDomains.join(".")}`;
    const apexDomainB = `${b.icann.domain}.${b.icann.topLevelDomains.join(".")}`;
    
    if (apexDomainA < apexDomainB) return -1;
    if (apexDomainA > apexDomainB) return 1;
    return compareSubdomain(a.icann.subDomains, b.icann.subDomains);
}

/**
 * Compare subdomain arrays from right to left
 * @param {Array} a - First subdomain array
 * @param {Array} b - Second subdomain array
 * @returns {number} Comparison result
 */
function compareSubdomain(a, b) {
    let aIndex = a.length - 1;
    let bIndex = b.length - 1;
    
    while (aIndex >= 0 && bIndex >= 0) {
        const aSubdomain = a[aIndex];
        const bSubdomain = b[bIndex];
        aIndex--;
        bIndex--;
        
        if (aSubdomain < bSubdomain) return -1;
        if (aSubdomain > bSubdomain) return 1;
    }
    
    return a.length - b.length;
}

export { compare, compareIcann };
