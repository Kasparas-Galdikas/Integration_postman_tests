# 📘 Integracinių Testų Naudojimo Gidas
**Katalogas:** `Integration_tests/`

Šis dokumentas paaiškina, kaip veikia integracinių testų struktūra, testų sujungimo servisas ir kaip paleisti testus naudojant Newman.

---

## 📂 1. Bendras katalogo vaizdas

Integration_tests/
│
├── services/
│ └── merge_service.js
│
├── tests/
│ ├── positive/
│ ├── negative/
│
├── merge_all_config.js
├── merged_all.json
├── server.js
└── app.js


---

## 📁 2. `tests/` struktūra

Aplanke `tests/` yra visi testų failai, suskirstyti į dvi grupes:

### 📂 positive/
Testai, kurie **turi veikti sėkmingai**.  
Pavyzdžiai:
- Registracija → 201
- Login → 200
- Gauti vartotoją → 200

---

### 📂 negative/
Testai, kurie **turi grąžinti klaidas**.  
Pavyzdžiai:
- Blogas el. paštas → 400
- Blogas slaptažodis → 401
- Vartotojas nerastas → 404

---

## 🔧 3. Servisas: `merge_service.js`

Šis servisas atsakingas už **JSON testų failų sujungimą** į vieną Postman kolekciją.  
Jame yra dvi pagrindinės funkcijos:

---

### 1️⃣ `mergeFolder(folderPath, outputFile)`
Ši funkcija:

- surenka visus `.json` failus iš nurodyto aplanko,
- sujungia juos į vieną kolekciją,
- išsaugo nurodytame faile.

Naudojama generuoti:
- `positive_merged.json`
- `negative_merged.json`

---

### 2️⃣ `mergeTwoFolders(folder1, folder2, outputFile)`
Funkcija:

- apjungia *positive* ir *negative* kolekcijas,
- sukuria vieną didelį testų rinkinį:

merged_all.json


Šis failas naudojamas paleisti **visus testus iškart**.

---

## ⚙️ 4. Failas: `merge_all_config.js`

Tai yra mažas konfigūrinis skriptas, kuris:

- paleidžia visus `merge_service.js` metodus,
- automatiškai sugeneruoja 3 failus:

| Failas | Aprašymas |
|--------|-----------|
| `positive_merged.json` | Visi teigiami testai |
| `negative_merged.json` | Visi neigiami testai |
| `merged_all.json` | Visų testų kolekcija |

### Funkciju paleidimas:

Paleidzia servisa :

node merge_all_config.js

Ijungia serveri :
node app.js

Nurodant sia komanda ir kelia link norimo paleisti testo yra paleidziami tame teste esantys testai
newman run Integration_tests/tests/positive/positive_merged.json
