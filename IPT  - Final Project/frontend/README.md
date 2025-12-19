# 🧠 Local ChatGPT-Style Web App (Ollama + FastAPI + React)

A **fully local, offline ChatGPT-style web application** powered by a custom **Ollama model (`chain`)**.  
This project provides real-time, streaming AI responses using a FastAPI backend and a minimalist React + Vite frontend.

🚫 No cloud APIs  
🔒 No external network calls  
💻 Runs 100% on your machine

---

## ✨ Features

- 100% **local AI inference** using Ollama
- **Streaming responses** (token-by-token, ChatGPT-style)
- FastAPI backend proxy for security and control
- React + Vite frontend with real-time updates
- Optional local API token authentication
- Full conversation history preserved per request
- Clean, distraction-free UI

---

## 🧩 System Architecture

```text
Frontend (React + Vite)
        |
        v
Backend (FastAPI Proxy)
        |
        v
Ollama (Local Model: chain)

Why is this setup? 
- Prevents exposing Ollama directly to the browser
- Enable request validation and access control
- Supports safe response streaming
- Keeps all data local and private

```

## 📁 Project Structure

project-root/
│
├── backend/
│   ├── server.py          # FastAPI backend
│   ├── Modelfile          # Ollama model definition
│   ├── requirements.txt  # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md


## 🛠 Prerequisites
```text
Make sure you have the following installed:

- Python 3.10+
- Node.js 18+
- Ollama (latest version)
  