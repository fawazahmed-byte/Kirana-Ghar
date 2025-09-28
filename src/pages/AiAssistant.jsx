import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI Retail Assistant. How can I help you today? You can ask me questions like:",
      suggestions: [
        "What should I stock for Diwali?",
        "Suggest 5 high-profit items for next week",
        "Create a shopping list for my store"
      ],
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const recentQueries = [
    "What should I stock for Diwali?",
    "Suggest 5 high-profit items for next week",
    "Create a shopping list for my store",
    "Best selling products this month",
    "Inventory management tips",
    "Seasonal product recommendations"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('diwali') || lowerMessage.includes('festival')) {
      return {
        content: "For Diwali season, I recommend stocking these high-demand items:",
        list: [
          "Diyas and decorative lights",
          "Rangoli colors and stencils", 
          "Sweets and dry fruits",
          "Gift boxes and packaging",
          "Traditional clothing and accessories",
          "Crackers and sparklers",
          "Puja items and incense"
        ]
      }
    } else if (lowerMessage.includes('profit') || lowerMessage.includes('high-profit')) {
      return {
        content: "Based on current trends, here are 5 high-profit items for next week:",
        list: [
          "Premium Basmati Rice - 25% margin",
          "Organic Products - 30% margin", 
          "Seasonal Fruits - 40% margin",
          "Specialty Spices - 35% margin",
          "Health & Wellness products - 28% margin"
        ]
      }
    } else if (lowerMessage.includes('shopping list') || lowerMessage.includes('inventory')) {
      return {
        content: "Here's a recommended shopping list based on your store's past purchases and current trends:",
        list: [
          "100 kg Premium Basmati Rice",
          "50 kg Toor Dal",
          "75 L Sunflower Oil",
          "150 kg Sugar",
          "60 packs Mixed Spices",
          "200 kg Fresh Vegetables",
          "100 kg Seasonal Fruits"
        ]
      }
    } else if (lowerMessage.includes('trend') || lowerMessage.includes('popular')) {
      return {
        content: "Current trending products in your area:",
        list: [
          "Organic and healthy food items",
          "Ready-to-cook meal kits",
          "Traditional and regional specialties",
          "Eco-friendly packaging products",
          "Immunity boosting products"
        ]
      }
    } else {
      return {
        content: "I can help you with various retail insights! Here are some things I can assist with:",
        list: [
          "Product recommendations based on trends",
          "Inventory management suggestions",
          "Seasonal stocking advice",
          "Profit margin analysis",
          "Customer demand forecasting"
        ]
      }
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: aiResponse.content,
        list: aiResponse.list,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-900">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">AI Retail Assistant</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Powered by Kirana Ghar</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              Online
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  message.type === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.type === 'ai' && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                )}

                <div className={`space-y-2 ${message.type === 'user' ? 'text-right' : ''} max-w-2xl`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {message.type === 'ai' ? 'AI Assistant' : 'You'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  
                  <div className={`rounded-lg p-4 ${
                    message.type === 'ai' 
                      ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.suggestions && (
                      <ul className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm">
                            <button
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                            >
                              • {suggestion}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {message.list && (
                      <ol className="mt-3 space-y-1">
                        {message.list.map((item, index) => (
                          <li key={index} className="text-sm">
                            {index + 1}. {item}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-zinc-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">AI Assistant</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4">
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your retail business..."
                className="w-full resize-none rounded-lg border border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 py-3 pl-4 pr-16 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 min-h-[44px] max-h-32"
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="hidden w-80 shrink-0 border-l border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 lg:block">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Queries</h2>
        <div className="space-y-2">
          {recentQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(query)}
              className="block w-full text-left rounded-lg p-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {query}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => handleSuggestionClick("Show me today's sales analytics")}
              className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              📊 Sales Analytics
            </button>
            <button 
              onClick={() => handleSuggestionClick("Generate inventory report")}
              className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              📦 Inventory Report
            </button>
            <button 
              onClick={() => handleSuggestionClick("Customer insights and trends")}
              className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              👥 Customer Insights
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default AiAssistant