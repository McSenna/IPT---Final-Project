## Local AI Chat Frontend (React + Vite)

This folder contains the **ChatGPT-style web UI** for your fully local AI assistant.  
It connects to the FastAPI backend at `http://localhost:3000/api/chat` and streams responses token-by-token from your local Ollama model `chain`.

---

### 1. Features
---------------------------------------------------------------------------------

- **ChatGPT-style layout**
  - Fixed header: **“Local AI Chat”** (always visible at the top)
  - **Collapsible sidebar** on the left
  - **Main chat window** on the right
- **Sidebar**
  - **New Chat** button to start a fresh conversation
  - **Search input** to filter chats by title or content
  - **“Your Chats” list** with active chat highlighting
  - Sidebar can be **toggled open/closed** (☰ button in header)
- **Chat behavior**
  - **Right-aligned blue bubbles** for user messages
  - **Left-aligned gray/dark bubbles** for AI messages
  - **Streaming responses token-by-token** using the backend SSE stream
  - **Input disabled while streaming** to prevent overlapping requests
  - **Auto-scroll** to the newest message
  - **Full conversation history** sent to the backend on every request
- **Backend connection**
  - `POST http://localhost:3000/api/chat`
  - Always sends:
    - `model: "chain"`
    - `messages: [{ role, content }, …]`
    - `stream: true`
  - If `VITE_LOCAL_API_TOKEN` is set, adds the header `X-LOCAL-TOKEN`

---

### 2. Getting Started
---------------------------------------------------------------------------------

Make sure you have already:

- Installed Node.js **18+**
- Set up and started the backend as described in the root `README.md`

Then from this `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

Usage flow (frontend side):

1. Open `http://localhost:5173` in your browser.
2. Use **“+ New Chat”** to start a conversation, or click an existing chat in **“Your Chats”**.
3. Type a message in the input and press **Enter** (or click **Send**).
4. Watch the AI response **stream in progressively**, with the input disabled until streaming completes.
5. Use the **sidebar search** to filter previous chats.
6. Toggle the sidebar with the **☰ icon** in the header.

---

### 3. Current Limitations
---------------------------------------------------------------------------------

The UI focuses on a clean, minimal local chat experience. Some advanced features are **not yet implemented in code**, but are easy next steps:

- No persistence layer yet (chats are **in-memory only**, lost on page refresh).
- No markdown rendering / code highlighting (messages are plain text).
- No rename/delete/pin of individual chats.
- No explicit “Stop/Cancel” button for an in-flight stream.
- No export (e.g., copy to clipboard / download as `.md` or `.txt`).

---

### 4. Suggested Next Improvements (Roadmap)
---------------------------------------------------------------------------------

You can extend this frontend to behave even closer to ChatGPT. Here are **concrete, actionable enhancements**:

- **Save / Load Chats (Persistence)**
  - Persist `chats` state to `localStorage` or `IndexedDB`.
  - On load, hydrate the state and restore the previously active chat.
- **Rename / Delete / Pin Chats**
  - Add a context menu or small icon buttons on each chat in **“Your Chats”**.
  - Support:
    - **Rename**: inline edit of the chat title.
    - **Delete**: remove a chat after a small confirmation.
    - **Pin**: keep pinned chats at the top of the list.
- **Markdown Rendering & Code Highlighting**
  - Integrate a markdown renderer like `react-markdown` with `remark-gfm`.
  - Add syntax highlighting via `react-syntax-highlighter` or `shiki`.
  - Render AI messages as markdown (with support for code blocks, lists, tables).
- **Stop / Pause Streaming**
  - Keep a reference to the `AbortController` used for `fetch`.
  - Add a **“Stop generating”** button that calls `abort()` and finalizes the current message.
- **Export Conversation**
  - Add an **“Export”** option per chat:
    - Export to **Markdown** or **plain text**.
    - Optionally copy to clipboard or trigger a file download.
- **Mobile-Friendly Layout**
  - Ensure the sidebar overlays the content on small screens (already partially done).
  - Add larger tap targets and maybe a bottom-fixed input bar on very small viewports.
- **Typing / Status Indicators**
  - Show a subtle “Assistant is typing…” indicator while streaming.
  - Optionally show when the user has unsent input.

These changes can all be implemented incrementally without touching the backend API shape.

---

### 5. How the Frontend Treats You (the Model)
---------------------------------------------------------------------------------

From the model’s perspective, you are running inside a **ChatGPT-style interface** with:

- A **fixed header**, **collapsible sidebar**, and **main chat window**.
- **Multiple chats** with searchable history.
- **Streaming** token-by-token responses.
- **Context preservation** via full chat history in every request.

When you, as the AI assistant, get prompts like:

- “Suggest 5 improvements for the chat UI”  
- “Plan a roadmap to make this frontend more like ChatGPT”  
- “Simulate a chat conversation with streaming messages”  

…you should answer as if you are the assistant **embedded in this UI**, suggesting practical UI/UX improvements or behaving like a normal chat assistant while respecting the streaming, context, and offline constraints.
