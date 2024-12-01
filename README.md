Quyidagi tarzda loyiha uchun README faylini yozish mumkin. Bu foydalanuvchilarga loyiha haqida to‘liq tushuncha beradi va uni qanday ishga tushirishni ko‘rsatadi. 

---

# 🌌 Planetarium  

**Planetarium** — bu foydalanuvchilarga kosmik dunyoni kashf etish imkonini beradigan platforma. Foydalanuvchilar sayyoralar va yulduzlar haqida ma'lumot qo'shishi, tahrirlashi va o‘rganishi mumkin. Sayt xavfsizlikni ta'minlash uchun JWT token autentifikatsiyasi va MongoDB ma'lumotlar omboridan foydalanadi. 

---

## 🚀 Xususiyatlar  
1. **Foydalanuvchilarni ro‘yxatdan o‘tkazish va tizimga kirish**  
   - JWT orqali xavfsiz autentifikatsiya.  
   - Refresh token yordamida doimiy kirish.  

2. **Sayyoralar va yulduzlarni boshqarish**  
   - Foydalanuvchilar sayyoralar va yulduzlar haqidagi ma'lumotlarni qo‘shishi mumkin.  
   - Ma'lumotlarni tahrirlash va o‘chirish imkoniyati.  

3. **Ma'lumotlar ombori**  
   - MongoDB orqali barcha ma'lumotlarni saqlash.  
   - Sayyoralar va yulduzlar haqidagi to‘liq ma'lumotlar.  

4. **Avtorizatsiya tizimi**  
   - Foydalanuvchilar va adminlar uchun alohida huquqlar.  
   - Faqat adminlar tahrirlash va o‘chirish imkoniyatiga ega.  

5. **To‘lov tizimi**  
   - Premium xizmatlar uchun to‘lov tizimi integratsiya qilingan.  

6. **Admin paneli**  
   - Adminlar foydalanuvchilarni boshqarish va statistikani kuzatish imkoniyatiga ega.  

---

## 🛠️ Texnologiyalar  
- **Node.js** (Backend)  
- **Express.js** (Routing va middleware)  
- **MongoDB** (Ma'lumotlar ombori)  
- **JWT (Json Web Token)** (Xavfsiz autentifikatsiya)  
- **Hozircha Ulamadik** (To‘lov tizimi)  

---

## 📂 API Yozuvlari  

### **Autentifikatsiya**  
#### 1. Ro‘yxatdan o‘tish  
- `POST /api/auth/register`  
  Foydalanuvchini ro‘yxatdan o‘tkazadi.  
  ```json
  {
    "name": "Foydalanuvchi nomi",
    "email": "email@example.com",
    "password": "parol"
  }
  ```

#### 2. Tizimga kirish  
- `POST /api/auth/login`  
  Kirish uchun email va parolni yuboradi va JWT token qaytaradi.  

#### 3. Tokenni yangilash  
- `POST /api/auth/refresh-token`  
  Amal qilish muddati tugagan tokenni yangilash uchun ishlatiladi.  

---

### **Sayyoralar va Yulduzlar**  
#### 1. Sayyora qo‘shish  
- `POST /api/planets` (Admin huquq kerak)  
  ```json
  {
    "name": "Mars",
    "description": "Qizil sayyora",
    "distanceFromSun": "227.9 million km"
  }
  ```

#### 2. Sayyoralarni ko‘rish  
- `GET /api/planets`  
  Barcha sayyoralar ro‘yxatini qaytaradi.  

#### 3. Yulduz qo‘shish  
- `POST /api/stars`  
  Yulduz haqida ma'lumotni saqlaydi.  

---

### **Foydalanuvchilarni boshqarish**  
#### 1. Foydalanuvchi ro‘yxati  
- `GET /api/users` (Admin huquq kerak)  

#### 2. Foydalanuvchini o‘chirish  
- `DELETE /api/users/:id` (Admin huquq kerak)  

---

### **To‘lov tizimi**  
#### 1. To‘lovni amalga oshirish  
- `POST /api/payments`  
  ```json
  {
    "amount": 10.00,
    "currency": "USD",
    "description": "Premium xizmati uchun to'lov"
  }
  ```

---

## 🖥️ Loyihani ishga tushirish  

### 1. **Kodni klonlash**  
```bash
git clone https://github.com/username/planetarium.git
cd planetarium
```

### 2. **Zaruriy kutubxonalarni o‘rnatish**  
```bash
npm install
```

### 3. **Environment faylini sozlash**  
`.env` faylida quyidagi ma'lumotlarni kiriting:  
```
JWT_SECRET=your_secret_key
JWT_EXPIRE=100d
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/planetarium
PAYMENT_SECRET_KEY=your_payment_key
```

### 4. **Serverni ishga tushirish**  
```bash
npm start
```

### 5. **API linki**  
Serveringiz quyidagi URL orqali ishga tushadi:  
```
http://localhost:5000
```

---

## ✨ Loyihaning rivoji  
- Mobil ilova integratsiyasi.  
- Ko‘proq astronomik ma'lumotlar qo‘shish.  
- O‘yin va test tizimini qo‘shish.  

---

Agar muammoga duch kelsangiz yoki hissa qo‘shmoqchi bo‘lsangiz, bemalol [Issues](https://github.com/username/planetarium/issues) bo‘limidan foydalaning yoki pull request yuboring. 🚀

Raxmat! 😊 
