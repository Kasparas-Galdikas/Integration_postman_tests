const path = require("path");
const { mergeFolder, mergeTwoFolders } = require("../services/merge_service.js");

// Absoliutus kelias į tests folderį
const TESTS_DIR = path.join(__dirname);

// Sukuria faila su positiviais testais Positive_tests/positive/positive_merged.json infividualiam paleidimui
//positiviems testams
console.log("========== MERGING POSITIVE ==========");
mergeFolder(
    path.join(TESTS_DIR, "positive"),
    path.join(TESTS_DIR, "positive", "positive_merged.json")
);

// Sukuria faila su negativiais testais Negative_tests/negative/negative_merged.json infividualiam paleidimui
//negativiems testams
console.log("========== MERGING NEGATIVE ==========");
mergeFolder(
    path.join(TESTS_DIR, "negative"),
    path.join(TESTS_DIR, "negative", "negative_merged.json")
);

// Sukuria faila su visais testais Integration_tests/tests/merged_all.json Bendram visu testu paleidimui
console.log("========== MERGING ALL ==========");
mergeTwoFolders(
    path.join(TESTS_DIR, "positive"),
    path.join(TESTS_DIR, "negative"),
    path.join(TESTS_DIR, "merged_all.json")
);

console.log(" DONE!");
