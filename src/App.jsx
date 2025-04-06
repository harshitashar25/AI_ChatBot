import React, { useState, useRef, useEffect } from 'react';
import { queryAIStudio } from './aiService';
import './App.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !screenshot) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
      image: screenshot
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    setScreenshot(null);

    try {
      const context = {
        currentDirectory: window.location.pathname,
        terminalContext: 'Browser',
        recentCommands: [],
        screenshot: screenshot
      };

      const response = await queryAIStudio(input, context);

      const botMessage = {
        text: response,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error querying AI:', err);
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setScreenshot(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    setIsDarkMode(prev => !prev);
  };

  return (
    <>
      <button 
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 12px',
          borderRadius: '20px',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000,
          backgroundColor: '#4a90e2',
          color: 'white'
        }}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className="chatbot-container">
        <div className="chatbot-header">
          <h2>AI Assistant</h2>
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>Ask me anything! I'm powered by Gemini 1.5 Pro.</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-content">
                  {msg.image && (
                    <div className="message-image">
                      <img src={msg.image} alt="User uploaded" />
                    </div>
                  )}
                  <div className="message-text">{msg.text}</div>
                </div>
                <div className="message-timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="message bot loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          {error && <div className="error-message">{error}</div>}
          <div ref={messagesEndRef} />
        </div>

        <form className="input-container" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button 
            type="button" 
            className="attachment-button"
            onClick={triggerFileInput}
          >
            📷
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? '...' : '→'}
          </button>
        </form>

        {screenshot && (
          <div className="screenshot-preview">
            <img src={screenshot} alt="Preview" />
            <button onClick={() => setScreenshot(null)}>✕</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;
