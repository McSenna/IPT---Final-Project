# 🧠 Local ChatGPT-Style Web App

A **fully local, offline ChatGPT-style web application** powered by a custom Ollama model. This project provides real-time, streaming AI responses using a FastAPI backend and a minimalist React + Vite frontend.

🚫 No cloud APIs  
🔒 No external network calls  
💻 Runs 100% on your machine

---
## Demonstration Video Link
 * https://drive.google.com/file/d/1AiawiytdRjWr2YI2u7UGJqx4tHGDsjPH/view?usp=drive_link

---

---

## ✨ Features

- **100% local AI inference** using Ollama
- **Streaming responses** (token-by-token, ChatGPT-style)
- FastAPI backend proxy for security and control
- React + Vite frontend with real-time updates
- Optional local API token authentication
- Full conversation history preserved per request
- Clean, distraction-free UI

---

## 🧩 System Architecture

```
Frontend (React + Vite)
        ↓
Backend (FastAPI Proxy)
        ↓
Ollama (Local Model: chain)
```

**Why this setup?**
- Prevents exposing Ollama directly to the browser
- Enables request validation and access control
- Supports safe response streaming
- Keeps all data local and private

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── server.py          # FastAPI backend
│   ├── Modelfile          # Ollama model definition
│   └── requirements.txt   # Python dependencies
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
```

---

## 🛠 Prerequisites

Ensure you have the following installed:

- **Python 3.10+**
- **Node.js 18+**
- **Ollama** (latest version)

**Verify Ollama is running:**
```bash
ollama serve
```

---

## 🚀 Getting Started

### Step 1: Set Up Python Environment

If you haven't set up a Python virtual environment yet:

**Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
```

**Linux/macOS:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Test your environment:**
```bash
# Create test.py
echo 'print("Python is working!")' > test.py

# Run it
python test.py      # Windows
python3 test.py     # Linux/macOS
```

---

### Step 2: Create Custom Ollama Model

The app requires a custom Ollama model named **`chain`**.

```bash
# Navigate to backend directory
cd backend

# Create the model
ollama create chain -f Modelfile

# Verify model creation
ollama list
```

You should see:
```
NAME   ID   SIZE   MODIFIED 
chain  xxx  xx GB  [date]
```

⚠️ **Important:** The application will not work if the model name is different!

---

### Step 3: Backend Setup (FastAPI)

**1. Install dependencies:**
```bash
cd backend

# Windows
pip install -r requirements.txt

# Linux/macOS
pip3 install -r requirements.txt
```

**2. Set local API token (optional):**
```bash
# Windows
set LOCAL_API_TOKEN=your-secret-token

# Linux/macOS
export LOCAL_API_TOKEN=your-secret-token
```

**3. Start the backend server:**
```bash
uvicorn server:app --reload --port 3000
```

The backend will be available at `http://localhost:3000`

---

### Step 4: Frontend Setup (React + Vite)

**1. Install dependencies:**
```bash
cd frontend
npm install
```

**2. Start the development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in terminal)

---

## 🔄 Request Flow

1. Frontend sends chat data to `http://localhost:3000/api/chat`
2. Backend validates:
   - Model name (`chain`)
   - Optional `X-LOCAL-TOKEN` header
3. Backend forwards request to Ollama
4. Ollama streams tokens back in real time
5. Backend relays tokens directly to frontend

---

## 🗂️ Conversation Handling

- The entire conversation history is sent with every request
- Ensures proper context and memory
- No server-side storage
- No logging unless you add it yourself

---

## 🔐 Security & Privacy

✅ Frontend never communicates directly with Ollama  
✅ Backend enforces:
  - Model name restriction (`chain`)
  - Optional API token validation
  - Strict CORS allowlist (localhost only)  
✅ No external API calls  
✅ No cloud services  
✅ No data leaves your machine

**Ideal for:**
- Privacy-sensitive projects
- Offline environments
- Research & experimentation
- Local AI tooling

---

## 🖥️ UI Features

- Centered, responsive chat container
- Clear visual separation between user & assistant
- Token-level streaming output
- Input disabled while the model is responding
- Minimalist footer: *"Local AI Chat • Powered by Ollama • Runs 100% Offline"*

---

## 🧪 Use Cases

- Local LLM experimentation
- Offline AI assistants
- Secure internal tools
- Education & demos
- Custom prompt-engineered models

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 🆘 Troubleshooting

**Backend won't start:**
- Ensure Ollama is running (`ollama serve`)
- Check if port 3000 is available
- Verify Python dependencies are installed

**Frontend can't connect:**
- Confirm backend is running on port 3000
- Check browser console for CORS errors
- Ensure both servers are running simultaneously

**Model not found:**
- Run `ollama list` to verify `chain` model exists
- Recreate the model using the Modelfile if needed

---




*Built with ❤️ by: Velune using Ollama, FastAPI, and React*
