const fs = require('fs');
const readline = require('readline');
const domains = require('./domain.js');
const hosts = require('./hosts.js');

/*
 * Customize hosts path here.
 */
const hostsFile = '../hosts.txt';
const formattedHostsFile = '../formatted-hosts.txt';

const sourceDomains = [];

const rl = readline.createInterface({
    input: fs.createReadStream(hostsFile),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const domain = hosts.parse(line);
    if (domain) {
        sourceDomains.push(domain);
    }
}).on('close', () => {
    sourceDomains.sort(domains.compare);
    const content = hosts.format(sourceDomains);
    fs.writeFile(formattedHostsFile, content, function (err) {
        if (err) {
            throw err;
        }
        console.log(`Host formatted: ${sourceDomains.length} entries`);
    });
})
