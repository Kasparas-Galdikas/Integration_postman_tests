const fs = require("fs");
const path = require("path");

const MERGED_COLLECTION_PATH = path.join(__dirname, "..", "tests", "merged_all.json");
const CONFIG_PATH = path.join(__dirname, "..", "tests", "create_scenario_config.js");
const outputPath = path.join(__dirname, '..', 'tests', 'scenarios_all.json');


// Rekursyvi paieška kolekcijoje
function findRequestRecursive(items, targetName, results = []) {
  for (const it of items) {
    if (it.name === targetName) {
      results.push(it);
    }
    if (it.item) {
      findRequestRecursive(it.item, targetName, results);
    }
  }
  return results;
}

// Sukuria bazinį collection objektą
function createBaseCollection() {
  return {
    info: {
      name: "All Scenarios Collection",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: [] // čia sudėsime visus scenarijus kaip folderius
  };
}

function generateAllScenarios() {
  console.log("📘 Loading merged collection:", MERGED_COLLECTION_PATH);

  const mergedCollection = JSON.parse(fs.readFileSync(MERGED_COLLECTION_PATH, "utf8"));
  const scenarioConfig = require(CONFIG_PATH);

  console.log("📂 Loaded scenario config:", CONFIG_PATH);

  const scenariosCollection = createBaseCollection();

  for (const [scenarioName, steps] of Object.entries(scenarioConfig)) {
    console.log(`\n🚀 Generating scenario: ${scenarioName}`);
    console.log("🧩 Steps:", steps);

    const scenarioFolder = {
      name: `Scenario – ${scenarioName}`,
      item: []
    };

    for (const stepName of steps) {
      const found = findRequestRecursive(mergedCollection.item, stepName);

      if (found.length === 0) {
        console.error(`❌ Test not found: ${stepName}`);
        continue;
      }

      found.forEach(req => {
        scenarioFolder.item.push(JSON.parse(JSON.stringify(req))); // deep copy
      });
    }

    // Dedame scenarijų kaip folder objektą
    scenariosCollection.item.push(scenarioFolder);

    console.log(`✅ Scenario added to merged collection: ${scenarioName}`);
  }

  // Saugojame VIENAME faile
  fs.writeFileSync(outputPath, JSON.stringify(scenariosCollection, null, 2), "utf8");

  console.log(`\n🎉 All scenarios saved into: ${outputPath}`);
}

generateAllScenarios();
