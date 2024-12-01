# Planetarium API

Planetarium API - Quyosh tizimi, sayyoralar, yulduzlar va to'lov tizimini boshqarish uchun yaratilgan API.

## Foydalanish

### Texnologiyalar

- **Node.js** (Express.js)
- **MongoDB** (Ma'lumotlar bazasi)
- **JWT (JSON Web Tokens)** (Foydalanuvchilarni autentifikatsiya qilish)
- **Swagger** (API hujjatlari va test qilish)
- **Multer** (Fayllarni yuklash)

## API Endpoints

### 1. Authentication

- **POST** `/api/auth/register` — Foydalanuvchini ro'yxatdan o'tkazish
- **POST** `/api/auth/login` — Foydalanuvchi tizimga kirish
- **GET** `/api/auth/profile` — Foydalanuvchi profilini olish (JWT kerak)
- **PUT** `/api/auth/update` — Foydalanuvchi profilini yangilash (JWT kerak)
- **PUT** `/api/auth/updatepassword` — Parolni yangilash (JWT kerak)
- **PUT** `/api/auth/paymentBalance` — Hisobni to'ldirish (JWT kerak)
- **PUT** `/api/auth/activate` — Profilni faollashtirish (JWT kerak)

### 2. Planets (Sayyoralar)

- **GET** `/api/planets` — Barcha sayyoralarni olish (API Key kerak)
- **POST** `/api/planets` — Yangi sayyora yaratish (Admin, JWT kerak)
- **GET** `/api/planets/{id}` — Sayyora haqida ma'lumot olish (API Key kerak)
- **PUT** `/api/planets/{id}` — Sayyora ma'lumotlarini yangilash (Admin, JWT kerak)
- **DELETE** `/api/planets/{id}` — Sayyora o'chirish (Admin, JWT kerak)

### 3. Stars (Yulduzlar)

- **GET** `/api/stars` — Barcha yulduzlarni olish (API Key kerak)
- **POST** `/api/stars` — Yangi yulduz yaratish (Admin, JWT kerak)
- **GET** `/api/stars/{id}` — Yulduz haqida ma'lumot olish (API Key kerak)
- **PUT** `/api/stars/{id}` — Yulduz ma'lumotlarini yangilash (Admin, JWT kerak)
- **DELETE** `/api/stars/{id}` — Yulduz o'chirish (Admin, JWT kerak)

## API Hujjatlari (Swagger)

Planetarium API'ni ishlatish va test qilish uchun Swagger hujjatlari mavjud. Hujjatlarni quyidagi manzil orqali ko'rishingiz mumkin:

1. Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs) (local serverda ishlayotganingizda)

## Foydalanish

1. **Repository'ni klonlash**:

   ```bash
   git clone https://github.com/username/planetarium.git
   ```

2. **Zarur kutubxonalarni o'rnatish**:

   ```bash
   npm install
   ```

3. **Muhitni sozlash**:
   `.env` faylini yaratib, quyidagi sozlamalarni qo'shing:

   ```env
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Serverni ishga tushurish**:
   ```bash
   npm start
   ```

Server muvaffaqiyatli ishga tushgach, API'ni test qilish uchun Swagger UI'ga kirishingiz mumkin: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Xatoliklar va Xatolar

- **401 Unauthorized**: Tizimga kirish uchun to'g'ri JWT token kerak.
- **403 Forbidden**: Foydalanuvchi ma'lum bir yo'lni ishlatish huquqiga ega emas (admin ruxsatlari kerak bo'lishi mumkin).
- **404 Not Found**: Ma'lumot topilmadi (sayyora yoki yulduz bo'lmasligi mumkin).
- **500 Internal Server Error**: Server xatosi yuz berdi.

## To'lov Tizimi

Planetarium loyihasi to'lov tizimi orqali ham foydalanuvchilarga xizmat ko'rsatadi. Bu tizim foydalanuvchilarning balansini boshqarish va profil faollashtirish uchun ishlatiladi.

---

Planetarium API yordamida sayyoralarni, yulduzlarni qo'shish, yangilash, o'chirish va foydalanuvchilarni boshqarish mumkin. Bu API sizga ilmiy va kosmik tadqiqotlar uchun ajoyib platforma yaratishga yordam beradi.

## Litsenziya

MIT License
