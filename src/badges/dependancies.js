const path = require('path');
const fs = require('fs/promises');
const types = require("../constants/types");
const { detectType } = require("../helpers/detectType")
const { packageManagerProviders } = require("../constants/provierConstants");
const { readCacheFile } = require('../helpers/readCacheFile');
exports.generate = async function () {
    const pmType = await detectType(packageManagerProviders, "Package manager");
    switch (pmType) {
        case types.NPM:
            let packagejson = await readCacheFile(path.resolve(process.cwd(), "package.json"));
            packagejson = JSON.parse(packagejson);
            return `[![dependancies](https://img.shields.io/librariesio/release/npm/)](https://libraries.io/npm/${encodeURIComponent(packagejson.name)})`
        default:
            console.error("Could not find any dependancies related configuration. Skipping it...")
            return '';
    }
}