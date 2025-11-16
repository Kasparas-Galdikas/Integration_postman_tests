# ✅ Pozityvių Testų Gidas
Šis dokumentas aiškiai ir paprastai aprašo visus **pozityvius (sėkmingus) testus**, kurie tikrina pagrindines sistemos funkcijas: registraciją, prisijungimą, vartotojų gavimą, trynimą ir atsijungimą.

Pozityvūs testai užtikrina, kad backend’as:

- tinkamai priima teisingus duomenis,
- grąžina teisingus status kodus,
- formuoja tvarkingą JSON formato atsakymą,
- niekada negrąžina slaptažodžių,
- teisingai išsaugo ir grąžina vartotojus,
- leidžia atlikti visas numatytas operacijas.

---

# 📂 Pozityvių testų kategorijos

1. **Prisijungimas (Login)**
2. **Registracija (Register)**
3. **Vartotojų gavimas (GET)**
4. **Vartotojo trynimas (DELETE)**
5. **Atsijungimas (Logout)**

Kiekvienoje kategorijoje pateiktas trumpas, žmogiškas paaiškinimas – kas tikrinama ir kodėl tai svarbu.

---

# 🔐 1. LOGIN – Pozityvūs Testai

## 1.1 ✔ Prisijungimas – sėkmingas (POST /login)
**Failas:** `positive - login - userLogin`

**Kas vyksta teste:**
- prerequest dalis užregistruoja naują vartotoją,
- tuomet siunčiamas **teisingas** prisijungimo prašymas,
- tikrinama:

| Tikrinama | Turi būti |
|-----------|-----------|
| Status | **200 OK** |
| JSON formatas | `application/json` |
| Atsakymo struktūra | `message`, `user` |
| user laukai | `username`, `email`, `fullName` |
| Neturi būti | `password` |

**Kodėl svarbu:**  
Sėkmingas login patvirtina, kad autentifikacija veikia teisingai ir jautriai elgiasi su vartotojo duomenimis.

---

# 📝 2. REGISTRACIJA – Pozityvūs Testai

## 2.1 ✔ Registracija – sėkmė (POST /register)
**Failas:** `positive - register - userRegister`

**Kas tikrinama:**
- vartotojas sėkmingai sukuriamas,
- serveris grąžina:

| Tikrinama | Turi būti |
|-----------|-----------|
| Status | **201 Created** |
| JSON | validus |
| Struktūra | `message`, `user` |
| user laukai | `username`, `email`, `fullName` |
| Nėra | `password` |

Po registracijos atliekamas **papildomas GET patikrinimas**, kad vartotojas tikrai egzistuoja duomenyse.

**Kodėl svarbu:**  
Testas tikrina ir **įvedimą**, ir **išsaugojimą** duomenų bazėje.

---

# 👤 3. USER – GET Pozityvūs Testai

## 3.1 ✔ Gauti vartotoją (GET /user/:username)
**Failas:** `positive - user - getUser`

**Testas daro:**
- prerequest’e sukuria vartotoją,
- per GET `/user/:username` atsiima sukurtą vartotoją.

**Turi būti grąžinta:**
- status **200**,
- JSON,
- laukai: `username`, `email`, `fullName`,
- niekada – `password`.

**Kodėl svarbu:**  
Patvirtina, kad vartotojų gavimas veikia stabiliai ir duomenys yra konsistentiški.

---

## 3.2 ✔ Gauti visus vartotojus (GET /users)
**Failas:** `positive - user - getUsers`

**Kas tikrinama:**
- prerequest sukuria 2 naujus vartotojus,
- GET `/users` turi grąžinti:

| Tikrinama | Reikalavimas |
|----------|--------------|
| Status | **200** |
| Atsakymas | masyvas |
| Kiekvienas elementas | `username`, `email`, `fullName` |
| Slaptažodžio | neturi būti |

**Kodėl svarbu:**  
Užtikrina, kad vartotojų sąrašo funkcija saugiai grąžina visus vartotojus, neatskleisdama slapta informacijos.

---

# 🗑 4. DELETE – Pozityvūs Testai

## 4.1 ✔ Ištrinti vartotoją (DELETE /delete-user/:username)
**Failas:** `positive - user - deleteUser`

**Kas tikrinama:**
- prerequest sukuria vartotoją,
- DELETE grąžina:

| Tikrinama | Turi būti |
|-----------|----------|
| Status | **200 OK** |
| JSON | validus |
| message | nurodo ištrintą username |

**Kodėl svarbu:**  
Patvirtina, kad vartotojo trynimas vykdomas teisingai ir grąžinama naudinga informacija.

---

## 4.2 ✔ DELETE → GET turi grąžinti 404
**Failas:** `positive - user - deleteThenGet404`

**Testas užtikrina svarbiausią saugumo principą:**

> Jei vartotojas ištrintas → jo GET turi nebeveikti.

**Tikrinama:**
1. DELETE grąžina 200
2. GET `/user/:username` po trynimo grąžina:
   - **404**
   - `{"error": "User not found"}`

**Kodėl svarbu:**  
Garantuoja, kad ištrinti duomenys tikrai pašalinami ir nepasiekiami.

---

# 🚪 5. LOGOUT – Pozityvūs Testai

## 5.1 ✔ Atsijungimas (POST /logout)
**Failas:** `positive - user - logout`

**Kas tikrinama:**
- POST `/logout` turi grąžinti:

| Tikrinama | Turi būti |
|-----------|-----------|
| Status | **200 OK** |
| JSON | validus |
| Yra | `message` |

**Kodėl svarbu:**  
Patvirtina, kad serverio logika yra pilna – vartotojas gali ne tik prisijungti, bet ir saugiai atsijungti.

---

# 📌 Bendros įžvalgos

- Visi pozityvūs testai naudoja **dinamiškai generuojamus username**, todėl galima juos paleisti neribotai.
- Visur tikrinama, kad **password laukas niekada negrįžta**.
- Visi testai tikrina **endpoint tikslumą**, pavyzdžiui `/login`, `/register`, `/users`, ir pan.
- JSON validacija atliekama griežtai, bet leidžiama `; charset=utf-8`.
- Registracijos, login ir vartotojų gavimo testai vieni kitus papildo.

---

# ✅ Išvada

Pozityvūs testai patvirtina, kad pagrindinė backend funkcionalumo grandinė:

**Registracija → Prisijungimas → Duomenų gavimas → Veiksmų atlikimas → Atsijungimas**

veikia patikimai, nuosekliai ir saugiai.

---
