// This will be replaced by Netlify with your actual API key
const API_KEY = process.env.OPENAI_API_KEY || 'YOUR_API_KEY_HERE';

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Conversation history
let conversationHistory = [
    {
        role: "system",
        content: "You are Buck, a helpful NLC study partner. You assist students with their coursework, provide explanations, and help them understand complex topics. Be friendly, patient, and encouraging."
    }
];

// Auto-resize textarea
userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Send message on Enter (but allow Shift+Enter for new line)
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Disable send button
    sendButton.disabled = true;
    
    // Add typing indicator
    const typingIndicator = addTypingIndicator();
    
    // Add user message to conversation history
    conversationHistory.push({
        role: "user",
        content: message
    });
    
    try {
        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Using the cost-effective model
                messages: conversationHistory,
                temperature: 0.7,
                max_tokens: 1000
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add assistant message to chat
        addMessage(assistantMessage, 'bot');
        
        // Add to conversation history
        conversationHistory.push({
            role: "assistant",
            content: assistantMessage
        });
        
    } catch (error) {
        console.error('Error:', error);
        typingIndicator.remove();
        addMessage('Sorry, I encountered an error. Please make sure your API key is set up correctly in Netlify environment variables.', 'bot');
    } finally {
        sendButton.disabled = false;
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

function addTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    const indicatorDiv = document.createElement('div');
    indicatorDiv.className = 'typing-indicator';
    indicatorDiv.innerHTML = '<span></span><span></span><span></span>';
    
    messageDiv.appendChild(indicatorDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

// Check if API key is set
if (API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
    console.warn('API key not set. Please configure OPENAI_API_KEY in Netlify environment variables.');
}
