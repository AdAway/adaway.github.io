function compare(a, b) {
    // Compare TLD
    if (a.domain.tld < b.domain.tld) {
        return -1;
    } else if (a.domain.tld > b.domain.tld) {
        return 1;
    } else {
        // Compare domain
        if (a.domain.domain < b.domain.domain) {
            return -1;
        } else if (a.domain.domain > b.domain.domain) {
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
}

exports.compare = compare;
