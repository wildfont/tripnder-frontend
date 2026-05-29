# Tripnder 🔥

**Find your perfect travel companion.**

Tripnder is the app for solo travelers who don't want to travel alone. Swipe through profiles, match with people who share your travel style, and explore the world together.

---

## The Problem

Solo travel is amazing. But sometimes you want someone to split a taxi with, explore a city with, or just share a meal with. Finding that person is hard.

Dating apps are for dating. Group travel apps are too rigid. There's nothing in between.

**That's why we built Tripnder.**

---

## How It Works

1. **Create your profile** — Tell us your travel style, budget, and where you're headed
2. **Swipe** — Browse travelers going to similar places
3. **Match** — When both swipe right, you're connected
4. **Chat** — Real-time messaging to plan your adventure
5. **Join trips** — Browse open trips posted by other travelers and request to join

---

## Features

| | |
|---|---|
| 🃏 Swipe interface | Discover compatible travelers with a familiar, intuitive UI |
| 💘 Mutual matching | Both users swipe right → instant connection |
| 💬 Real-time chat | Socket.io powered messaging, zero lag |
| ✈️ Trip board | Post your trip as open and let travelers request to join |
| 🌙 Dark / light mode | Because aesthetics matter |
| 📱 Mobile-first | Built for your phone, works on any device |
| 🔐 Secure auth | JWT + bcrypt, persistent sessions |

---

## Tech Stack

**Frontend**
- React + Vite
- Material UI
- Socket.io-client
- react-tinder-card

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JWT + bcryptjs

**Infrastructure**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Live Demo

🌍 **[tripnder-frontend.vercel.app](https://tripnder-frontend.vercel.app)**

> The backend runs on Render's free tier — first load may take ~30 seconds to wake up.

**Test account:** `go@tripnder.com` / `Banana99`

---

## Run Locally

```bash
# Backend
cd tripnder-backend
npm install
cp .env.example .env   # fill in your values
npm run seed           # populate the database
npm run dev

# Frontend
cd tripnder-frontend
npm install --legacy-peer-deps
cp .env.example .env   # fill in VITE_API_URL
npm run dev
```

---

## What's Next

- 📸 Photo uploads via Cloudinary
- 🗺️ Interactive map of active trips (Leaflet)
- 🔍 Filters by destination, style and budget
- 🌐 Multi-language support
- 📲 Push notifications

---

## Author

Built by **Jordi Font** as a capstone project for the Ironhack Barcelona Full-Stack Web Development Bootcamp, 2026.

---

*Stop traveling alone.*