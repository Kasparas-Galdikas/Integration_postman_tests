const fs = require("fs");
const path = require("path");

/**
 * Reads JSON and recursively expands all $ref references.
 */
function loadWithRefs(filePath) {
    const absolute = path.resolve(process.cwd(), filePath);
    const baseDir = path.dirname(absolute);

    const json = JSON.parse(fs.readFileSync(absolute, "utf8"));

    if (Array.isArray(json.item)) {
        json.item = json.item.map(it => expandItem(it, baseDir));
    }

    return json;
}

/**
 * Expands a single item. If it has $ref → loads referenced JSON and injects item.
 */
function expandItem(item, baseDir) {
    if (item.$ref) {
        const refFile = path.resolve(baseDir, item.$ref);
        const refJson = JSON.parse(fs.readFileSync(refFile, "utf8"));

        if (Array.isArray(refJson.item)) {
            return refJson.item[0];
        }
        return refJson;
    }

    if (Array.isArray(item.item)) {
        item.item = item.item.map(sub => expandItem(sub, baseDir));
    }

    return item;
}

/**
 * Merges multiple collection JSONs into one.
 */
function mergeCollections(name, ...collections) {
    return {
        info: {
            name,
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: collections.flatMap(col => col.item)
    };
}

/**
 * Merges a single folder collection into a merged JSON file.
 */
function mergeFolder(folderPath, destinationFile) {
    const collectionFile = path.join(folderPath, path.basename(folderPath) + "_collection.json");

    if (!fs.existsSync(collectionFile)) {
        throw new Error("❌ Collection file not found: " + collectionFile);
    }

    const merged = loadWithRefs(collectionFile);

    fs.writeFileSync(destinationFile, JSON.stringify(merged, null, 2));
    console.log("✅ Folder merged:", destinationFile);

    return merged;
}

/**
 * Merges two folders (ex: positive + negative) into a combined file.
 */
function mergeTwoFolders(folderA, folderB, destinationFile) {
    const fileA = path.join(folderA, path.basename(folderA) + "_merged.json");
    const fileB = path.join(folderB, path.basename(folderB) + "_merged.json");

    if (!fs.existsSync(fileA) || !fs.existsSync(fileB)) {
        throw new Error("❌ Missing merged JSON. Run mergeFolder() first.");
    }

    const jsonA = JSON.parse(fs.readFileSync(fileA));
    const jsonB = JSON.parse(fs.readFileSync(fileB));

    const merged = mergeCollections("All Tests", jsonA, jsonB);

    fs.writeFileSync(destinationFile, JSON.stringify(merged, null, 2));
    console.log("✅ All folders merged:", destinationFile);

    return merged;
}

module.exports = {
    mergeFolder,
    mergeTwoFolders
};
