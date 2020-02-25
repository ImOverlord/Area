"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@booster-ts/core");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
exports.inject = new core_1.Injector();
/**
 * loadFiles
 * @description Imports Recursively all files
 * @param dirName where to search the files
 */
exports.loadFiles = (dirName) => {
    let fileLoaded = false;
    let relativeDir;
    if (!path.isAbsolute(dirName))
        relativeDir = path.join(__dirname, dirName);
    else
        relativeDir = dirName;
    const contents = fs.readdirSync(relativeDir);
    for (const content of contents) {
        const filePath = path.join(relativeDir, content);
        if (fs.statSync(filePath).isDirectory())
            exports.loadFiles(filePath);
        else if (!fileLoaded) {
            require(path.join(dirName, path.basename(dirName)));
            fileLoaded = true;
        }
    }
};
