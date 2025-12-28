import { createReadStream, writeFile } from "node:fs";
import { createInterface } from "node:readline";
import { compareIcann } from "./domain.js";
import { parse, format } from "./hosts.js";

// Configuration
const CONFIG = {
    hostsFile: "../hosts.txt",
    formattedHostsFile: "../formatted-hosts.txt"
};

const sourceDomains = [];

const rl = createInterface({
    input: createReadStream(CONFIG.hostsFile),
    crlfDelay: Infinity
});

rl.on("line", (line) => {
    const domain = parse(line);
    if (domain) {
        sourceDomains.push(domain);
    }
}).on("close", () => {
    sourceDomains.sort(compareIcann);
    const content = format(sourceDomains);
    
    writeFile(CONFIG.formattedHostsFile, content, (err) => {
        if (err) {
            console.error(`Error writing file: ${err.message}`);
            process.exit(1);
        }
        console.log(`Hosts formatted: ${sourceDomains.length} entries`);
    });
});
