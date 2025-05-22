import { useState, useEffect, useRef } from 'react';
import { FiSend, FiArrowLeft, FiUser} from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Use environment variable for API key
const API_KEY = 'AIzaSyBUHDaJuwkBS4NZJbQn4HsJ15v-megqETU';
const MODEL_NAME = 'gemini-1.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I am your AI assistant. How can I help you today?'
      }
    ]);
  }, []);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle form submission with Gemini API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const geminiMessages = messages.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })).concat({ role: 'user', parts: [{ text: input }] });

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: geminiMessages,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.candidates[0]?.content?.parts[0]?.text || 'No response from AI.'
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chat response:', error);
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      if (error.message.includes('403')) {
        errorMessage = 'Invalid API key or insufficient permissions. Please check your Gemini API key.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Rate limit exceeded. Please try again later or check your Gemini API quota.';
      } else if (error.message.includes('402')) {
        errorMessage = 'Payment required. Please check your Gemini account for sufficient funds or an active subscription.';
      }
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: errorMessage }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 flex flex-col font-inter">
      {/* Header */}
      <header className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-md shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="Go back"
          >
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
        </div>
      </header>

      {/* Chat container */}
      <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex-grow overflow-y-auto bg-white/50 dark:bg-dark-700/50 rounded-t-2xl shadow-lg p-6 space-y-6 backdrop-blur-md">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-4 shadow-md backdrop-blur-sm ${
                    message.role === 'user'
                      ? 'bg-primary-600/90 text-white rounded-tr-none'
                      : 'bg-white/70 dark:bg-dark-600/70 text-gray-900 dark:text-white rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        message.role === 'user' ? 'bg-primary-700' : 'bg-primary-100 dark:bg-primary-900'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <FiUser className="text-white" size={20} />
                      ) : (
                        <FaRobot className="text-primary-600 dark:text-primary-400" size={20} />
                      )}
                    </div>
                    <span className="ml-3 font-semibold text-sm sm:text-base">
                      {message.role === 'user' ? 'You' : 'AI Bot'}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="max-w-[80%] sm:max-w-[70%] rounded-2xl p-4 bg-white/70 dark:bg-dark-600/70 text-gray-900 dark:text-white rounded-tl-none shadow-md backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <FaRobot className="text-primary-600 dark:text-primary-400" size={20} />
                  </div>
                  <span className="ml-3 font-semibold text-sm sm:text-base">AI Bot</span>
                </div>
                <div className="flex space-x-2">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="w-2 h-2 bg-primary-600 rounded-full"
                  ></motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                    className="w-2 h-2 bg-primary-600 rounded-full"
                  ></motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.4 }}
                    className="w-2 h-2 bg-primary-600 rounded-full"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/50 dark:bg-dark-700/50 rounded-b-2xl shadow-lg p-4 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow py-3 px-4 bg-gray-100/80 dark:bg-dark-600/80 text-gray-900 dark:text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all text-sm sm:text-base"
              disabled={isLoading}
              aria-label="Chat input"
            />
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white py-3 px-4 rounded-r-lg transition-colors"
              aria-label="Send message"
            >
              <FiSend size={20} />
            </motion.button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ChatPage;