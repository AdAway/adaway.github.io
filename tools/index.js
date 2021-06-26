import { createReadStream, writeFile } from 'fs';
import { createInterface } from 'readline';
import { compareIcann } from './domain.js';
import { parse, format } from './hosts.js';

/*
 * Customize hosts path here.
 */
const hostsFile = '../hosts.txt';
const formattedHostsFile = '../formatted-hosts.txt';

const sourceDomains = [];

const rl = createInterface({
    input: createReadStream(hostsFile),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const domain = parse(line);
    if (domain) {
        sourceDomains.push(domain);
    }
}).on('close', () => {
    sourceDomains.sort(compareIcann);
    const content = format(sourceDomains);
    writeFile(formattedHostsFile, content, function (err) {
        if (err) {
            throw err;
        }
        console.log(`Host formatted: ${sourceDomains.length} entries`);
    });
})
