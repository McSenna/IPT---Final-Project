// Settings
const SERVER_URL = 'http://localhost:3000';
let currentModel = 'nova-assistant:latest';
let chatHistory = [];
let isWaitingForReply = false;
 
// Get elements from the page
const chatContainer = document.getElementById('messages-container');
const textInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const modelDropdown = document.getElementById('model-select');
 
// STARTUP - runs when page loads
document.addEventListener('DOMContentLoaded', async () => {
    
    // Check if server is running
    try {
        await fetch(SERVER_URL);
        statusDot.className = 'status-dot connected';
        statusText.textContent = 'Connected';
    } catch {
        statusDot.className = 'status-dot error';
        statusText.textContent = 'Not connected';
    }
    
    // Load available models
    try {
        const response = await fetch(SERVER_URL + '/api/models');
        const data = await response.json();
        
        // Add each model to dropdown
        if (data.models) {
            modelDropdown.innerHTML = '';
            for (const model of data.models) {
                const option = document.createElement('option');
                option.value = model.name;
                option.textContent = model.name;
                modelDropdown.appendChild(option);
            }
            currentModel = modelDropdown.value;
        }
    } catch {
        console.log('Could not load models');
    }
    
    // When user picks a different model
    modelDropdown.onchange = () => {
        currentModel = modelDropdown.value;
    };
    
    textInput.focus();
});
 
// HELPER FUNCTIONS
// Press Enter to send
function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}
 
// Make textarea grow as you type
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
 
// Start fresh conversation
function startNewChat() {
    chatHistory = [];
    chatContainer.innerHTML = '';
    textInput.value = '';
}
 
// Click a suggestion button
function sendSuggestion(text) {
    textInput.value = text;
    sendMessage();
}
 
// Make text safe to display
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
 
// Add a message bubble to the chat
function addMessageToChat(role, text) {
    const bubble = document.createElement('div');
    bubble.className = 'message ' + role;
    
    bubble.innerHTML = `
        <div class="message-avatar">${role === 'user' ? 'U' : '✦'}</div>
        <div class="message-content">
            <div class="message-role">${role === 'user' ? 'You' : 'Nova'}</div>
            <div class="message-text">${escapeHtml(text)}</div>
        </div>
    `;
    
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return bubble.querySelector('.message-text');
}
 
// SEND MESSAGE - the main function
async function sendMessage() {
    const userText = textInput.value.trim();
    
    // Don't send empty messages or while waiting
    if (!userText || isWaitingForReply) return;
    
    // Remove welcome screen
    const welcome = document.getElementById('welcome-message');
    if (welcome) welcome.remove();
    
    // Add user message to chat
    chatHistory.push({ role: 'user', content: userText });
    addMessageToChat('user', userText);
    
    // Clear input box
    textInput.value = '';
    
    // Create empty assistant message (will fill with streaming text)
    const assistantBubble = addMessageToChat('assistant', '');
    assistantBubble.innerHTML = '<span class="streaming-cursor"></span>';
    
    // Disable send button while waiting
    isWaitingForReply = true;
    sendButton.disabled = true;
    
    try {
        // Send to server
        const response = await fetch(SERVER_URL + '/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: currentModel,
                messages: chatHistory
            })
        });
        
        // Read the streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantText = '';
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            // Process each line
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const json = JSON.parse(line.substring(6));
                        
                        // Add new text
                        if (json.message && json.message.content) {
                            assistantText += json.message.content;
                            assistantBubble.innerHTML = escapeHtml(assistantText) + '<span class="streaming-cursor"></span>';
                            chatContainer.scrollTop = chatContainer.scrollHeight;
                        }
                        
                        // Done streaming
                        if (json.done) {
                            assistantBubble.innerHTML = escapeHtml(assistantText);
                            chatHistory.push({ role: 'assistant', content: assistantText });
                        }
                    } catch {}
                }
            }
        }
        
    } catch (error) {
        assistantBubble.innerHTML = '<div class="error-message">Error: Could not get response</div>';
    }
    
    // Re-enable send button
    isWaitingForReply = false;
    sendButton.disabled = false;
    textInput.focus();
}