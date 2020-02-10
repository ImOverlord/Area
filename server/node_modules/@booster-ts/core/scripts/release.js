const package = require("../package.json");
const execSync = require("child_process").execSync;

const version = package.version;
const name    = package.name;

execSync(`npm dist-tag add ${name}@${version} latest`);
execSync(`npm dist-tag rm ${name}@${version} beta`);
