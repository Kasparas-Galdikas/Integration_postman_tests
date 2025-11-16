# ❌ Negatyvių Testų Gidas
Šiame dokumente paprastai ir aiškiai aprašoma, kokie **negatyvūs testai** buvo atlikti, kokius endpoint'us jie tikrina ir kokio rezultato tikimės iš serverio.

Negatyvūs testai yra būtini norint užtikrinti, kad sistema teisingai reaguoja į neteisingus duomenis, trūkstamus laukus, neteisingus formatus ar neegzistuojančius vartotojus.

---

# 📂 Testų kategorijos

Negatyvūs testai suskirstyti į 3 pagrindines grupes:

1. **Login klaidos**
2. **Registracijos klaidos**
3. **Vartotojo paieška / trynimas – klaidos**

Kiekvienas testas tikrina, ar sistema tvarkingai grąžina:
- tinkamą HTTP statusą,
- JSON formato atsakymą,
- aiškų `error` lauką,
- negrąžina nereikalingų duomenų (pvz., `user`).

---

# 🔐 1. LOGIN – NEGATYVŪS TESTAI

## 1.1 ❌ Neteisingas slaptažodis (401)
**Failas:** `negative - login - invalid`

**Kas tikrinama:**
- vartotojas užregistruojamas prerequest'e,
- bandoma prisijungti su **neteisingu slaptažodžiu**,
- serveris turi grąžinti:

| Laukas | Tikimasi |
|--------|----------|
| Status | **401 Unauthorized** |
| Body   | `{"error": "Invalid username or password"}` |
| Nėra   | `user` objekto |

**Kodėl svarbu:** užtikrina, kad neteisingi prisijungimo duomenys nesuteiks prieigos.

---

## 1.2 ❌ Trūksta slaptažodžio arba kito lauko (401)
**Failas:** `negative - login - missingField`

**Kas tikrinama:**
- prerequest užregistruoja vartotoją,
- login'u siunčiamas tik username be password,
- serverio reakcija:

| Laukas | Tikimasi |
|--------|----------|
| Status | **401** |
| Body   | error = `Invalid username or password` |

**Kodėl svarbu:** sistema turi neleisti prisijungti su nepilna informacija.

---

# 📝 2. REGISTRACIJA – NEGATYVŪS TESTAI

## 2.1 ❌ Registracija su jau egzistuojančiu username (400)
**Failas:** `negative - register - duplicate`

**Kas tikrinama:**
- prerequest registreuoja vartotoją,
- testas bando registruoti tą patį username dar kartą,
- serveris turi grąžinti:

| Laukas | Tikimasi |
|--------|----------|
| Status | **400 Bad Request** |
| error  | `Username already exists` |

**Kodėl svarbu:** sistema neturi leisti dubliuoti vartotojų.

---

## 2.2 ❌ Tuščias JSON body (400)
**Failas:** `negative - register - emptyBody`

**Kas tikrinama:**
- POST `/register` siunčiamas `{}`,
- sistema tai turi laikyti **netinkamu įvesties formatu**.

**Tikimasi:**
- **400**
- `"error": "Invalid input"`

---

## 2.3 ❌ Blogas el. pašto formatas (400)
**Failas:** `negative - register - invalidEmail`

**Kas tikrinama:**
- email = `not-an-email`
- sistema turi atmesti registraciją.

**Tikimasi:**
- **400**
- `"error": "Invalid input"`

---

## 2.4 ❌ Blogas username formatas (400)
**Failas:** `negative - register - invalidUsername`

**Kas tikrinama:**
- username turi draudžiamus simbolius (`varto*jas`).
- Validatorius turi atmesti.

---

## 2.5 ❌ Trūksta privalomo lauko (400)
**Failas:** `negative - register - missingField`

**Kas tikrinama:**
- body be `password`.
- Sistema turi reaguoti aiškiai.

---

## 2.6 ❌ Per trumpas slaptažodis (400)
**Failas:** `negative - register - shortPassword`

**Kas tikrinama:**
- password = `123` (per trumpas).
- Validacija turi tai iškart atmesti.

---

## 2.7 ❌ Netinkamas Content-Type (400)
**Failas:** `negative - register - wrongContentType`

**Kas tikrinama:**
- siunčiamas `text/plain`,
- sistema negali priimti formos be JSON.

**Tikimasi:** status **400**.

---

# 👤 3. USER – NEGATYVŪS TESTAI

## 3.1 ❌ DELETE – vartotojas nerastas (404)
**Failas:** `negative - user - deleteUserNotFound`

**Kas tikrinama:**
- DELETE `/delete-user/not_existing_user`
- vartotojas neegzistuoja → turi būti 404.

**Tikimasi:**
- `"error": "User not found"`

---

## 3.2 ❌ GET – vartotojas nerastas (404)
**Failas:** `negative - user - getUserNotFound`

**Kas tikrinama:**
- GET `/user/not_existing_user`
- sistema turi aiškiai informuoti, kad tokio vartotojo nėra.

---

# 📌 Svarbiausios įžvalgos

- Visuose testuose tikrinama, ar serveris **visada grąžina JSON**, net ir esant klaidai.
- Visi testai užtikrina, kad klaidos **niekada negrąžina user duomenų**.
- Registracijos validatorius veikia pagal taisykles:
  - email turi būti validus,
  - username negali turėti specialių simbolių,
  - password turi būti pakankamai ilgas,
  - visi laukeliai turi būti pateikti.
- Login testai patvirtina, kad autentifikacija niekada nepraleis netikslumo.

---

# ✅ Išvada

Negatyvūs testai parodo, kad backend logika yra stabili ir atspari klaidingiems ar piktavališkiems įvesties duomenims. Visi testai patvirtina, kad:

- klaidos sugaunamos,
- atsakymai aiškūs ir struktūruoti,
- sistema elgiasi numatytai ir be netikėtumų.

---
