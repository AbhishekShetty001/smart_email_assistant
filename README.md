# Smart Email Assistant

Smart Email Assistant is a productivity tool that helps you generate AI-powered email replies in various tones — directly from a web UI or right inside Gmail using a Chrome Extension.

This project includes:

  Spring Boot Backend** – API for generating replies
  React Frontend** – Standalone UI to generate replies
  Chrome Extension** – "AI Reply" button directly in Gmail

---

# Folder Structure

smart_email_assistant/
->backend/ # Spring Boot backend
-> frontend/ # React frontend
->extension/ # Chrome extension
->README.md

#### 📌 Run the Backend
```bash
cd backend
./mvnw spring-boot:run
Runs on: http://localhost:8888
Main endpoint: POST /api/email/generate

2️⃣ Frontend – React Web App
Run the React UI
cd frontend
npm install
npm start

3️⃣ Chrome Extension – Gmail Integration
Go to: chrome://extensions
Enable Developer Mode
Click Load unpacked
Select the extension/ folder

