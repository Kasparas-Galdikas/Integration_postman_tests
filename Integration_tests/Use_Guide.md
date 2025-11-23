# 📘 Integracinių Testų Struktūros Gidas

**Projektas:** `Integration_tests/`

Šis dokumentas paaiškina *visą integracinių testų struktūrą*, kaip sujungiami testai, kaip generuojami scenarijai ir kaip paleisti testus naudojant **Newman**.

---

# 📂 1. **Bendras katalogo vaizdas**

```
Integration_tests/
│
├── services/
│   ├── merge_service.js
│   └── generate_workflows_servise.js
│
├── tests/
│   ├── negative/
│   │   ├── login/
│   │   ├── register/
│   │   ├── user/
│   │   ├── negative_collection.json
│   │   ├── negative_merged.json
│   │   └── Negative_Tests_Guide.md
│   │
│   ├── positive/
│   │   ├── login/
│   │   ├── register/
│   │   ├── user/
│   │   ├── positive_collection.json
│   │   ├── positive_merged.json
│   │   └── Positive_Tests_Guide.md
│
│   ├── create_scenario_config.js
│   ├── merge_all_config.js
│   ├── merged_all.json
│   └── scenarios_all.json
│
└── server.js
```

---

# 📂 2. **`tests/` struktūra**

Testai yra suskirstyti pagal rezultatą.

---

## ✅ **positive/**

Teigiami testai, kurie turi **baigtis sėkmingai**.

```
positive/
│
├── login/
├── register/
└── user/
```

Papildomi failai:

* `positive_collection.json` – visi teigiami testai vienoje kolekcijoje
* `positive_merged.json` – kolekcija Newman paleidimui

---

## ❌ **negative/**

Neigiami testai, kurie turi **grąžinti klaidas**.

```
negative/
│
├── login/
├── register/
└── user/
```

Papildomi failai:

* `negative_collection.json`
* `negative_merged.json`

---

# 📦 3. **Sujungimo servisas: `merge_service.js`**

Šis servisas renka JSON testų failus ir sujungia juos į Postman kolekcijas.

### 🔧 **1️⃣ mergeFolder(folderPath, outputFile)**

* Surenka visus `.json` failus iš aplanko
* Sujungia į vieną kolekciją
* Išsaugo `outputFile`

### 🧩 **2️⃣ mergeTwoCollections(posFile, negFile, outputFile)**

* Sujungia teigiamą ir neigiamą kolekcijas
* Sukuria **merged_all.json**

### 🔄 **3️⃣ buildMergedStructure(items)**

* Sudaro teisingą Postman kolekcijos struktūrą

---

# ⚙️ 4. **Failas: `merge_all_config.js`**

Automatizuoja **visų kolekcijų generavimą**.

Sukuria:

* `positive_collection.json`
* `negative_collection.json`
* `positive_merged.json`
* `negative_merged.json`
* **`merged_all.json`**

### Paleidimas:

```
node tests/merge_all_config.js
```

---

# 🧠 5. **Scenarijų sistema**

## 📄 `create_scenario_config.js`

Aprašo scenarijų sekas.

Pavyzdys:

```js
module.exports = {
  full_user_flow: [
    "positive - register - userRegister",
    "positive - login - userLogin",
    "positive - user - getUser",
    "positive - user - getUsers",
    "positive - user - deleteUser",
    "negative - user - getUserNotFound"
  ]
};
```

## 🔧 `generate_workflows_servise.js`

Sugeneruoja scenarijų kolekciją:

* paima `merged_all.json`
* suranda testus pagal pavadinimą
* sukuria scenarijų folderius
* išsaugo **scenarios_all.json**

### Paleidimas:

```
node services/generate_workflows_servise.js
```

---

# ▶️ 6. **Testų paleidimas Newman**

### Paleisti teigiamus testus:

```
newman run tests/positive/positive_merged.json
```

### Paleisti neigiamus testus:

```
newman run tests/negative/negative_merged.json
```

### Paleisti visus testus:

```
newman run tests/merged_all.json
```

### Paleisti scenarijus:

```
newman run tests/scenarios_all.json
```

---

# 🚀 7. **Pilnas workflow**

### 1️⃣ Sujungti visus testus:

```
node tests/merge_all_config.js
```

### 2️⃣ Sugeneruoti scenarijus:

```
node services/generate_workflows_servise.js
```

### 3️⃣ Paleisti testus:

* tik teigiami → `newman run tests/positive/positive_merged.json`
* tik neigiami → `newman run tests/negative/negative_merged.json`
* visi testai → `newman run tests/merged_all.json`
* scenarijai → `newman run tests/scenarios_all.json`
