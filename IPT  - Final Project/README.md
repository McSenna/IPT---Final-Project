## Local ChatGPT-Style Web App (Ollama `chain`)

This project is a fully local ChatGPT-style interface that talks to a prebuilt custom Ollama model named `chain`.  
All inference runs on your own machine – there are **no cloud APIs**.

The system is split into:

- **backend**: FastAPI proxy that streams from Ollama and exposes `POST /api/chat`
- **frontend**: Vite + React minimalist chat UI that streams responses in real time

---

### 1. Prerequisites
---------------------------------------------------------------------------------

- Python **3.10+**
- Node.js **18+**
- Ollama installed and running locally

Ensure Ollama is running:

```bash
ollama serve
```

---

### 2. Create Your Custom Ollama Model (`chain`)
---------------------------------------------------------------------------------

From the `backend` folder (where the `Modelfile` lives), build your custom local model:

```bash
cd backend
ollama create chain -f Modelfile
```

Then verify that it exists:

```bash
ollama list
```

You should see `chain` in the output. This is the model the app will use.

---

### 3. Backend Setup (FastAPI Proxy)
---------------------------------------------------------------------------------

From the `backend` folder:

```bash
cd backend
pip install -r requirements.txt
```

Optionally, set a local API token (recommended on shared machines):

```bash
set LOCAL_API_TOKEN=your-secret-token          # Windows (cmd)
# or
$env:LOCAL_API_TOKEN="your-secret-token"       # Windows (PowerShell)
```

> If `LOCAL_API_TOKEN` is set, all frontend requests must include the header  
> `X-LOCAL-TOKEN: your-secret-token`.

Start the backend on port **3000**:

```bash
uvicorn server:app --reload --port 3000
```

The key endpoint exposed to the frontend is:

- `POST http://localhost:3000/api/chat`

The backend always forwards to the local Ollama endpoint:

- `http://localhost:11434/api/chat`

with the model name **`chain`** and **streaming enabled**.


### 4. Frontend Setup (React + Vite)
---------------------------------------------------------------------------------
From the `frontend` folder:

bash
cd frontend
npm install
npm run dev


By default, Vite serves the app at `http://localhost:5173`.

The frontend sends all chat requests to:

```text
http://localhost:3000/api/chat
```

The full conversation history is included on every request to preserve context.

---

### 5. Usage Flow
---------------------------------------------------------------------------------

1. Start Ollama: `ollama serve`
2. Make sure the `chain` model exists: `ollama list`
3. Create the `chain` model if you haven’t already: `ollama create chain -f Modelfile` (run from `backend`)
4. Start the backend (FastAPI) on port 3000
5. Start the frontend (`npm run dev`) on port 5173
6. Open the browser at `http://localhost:5173`
7. Chat with the local model in a ChatGPT-like interface

---

### 6. Security & Architecture Notes
---------------------------------------------------------------------------------

- The **frontend never talks directly to Ollama**.
- The FastAPI backend:
  - Validates that the requested model is exactly `chain`
  - Relays streaming responses directly from Ollama without buffering or post-processing
  - Enforces a **CORS allowlist** limited to localhost origins
  - Optionally validates a `X-LOCAL-TOKEN` header if `LOCAL_API_TOKEN` is set
- All data stays on your machine – there are **no external network calls** beyond local Ollama.

---

### 7. UI Overview
---------------------------------------------------------------------------------

- Centered, responsive chat container
- Clear separation of user and assistant messages
- Progressive, token-level streaming display
- Disabled input while the model is streaming
- Minimalist footer:

```text
Local AI Chat • Powered by Ollama • Runs 100% Offline
```


