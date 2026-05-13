"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { usePathname } from "next/navigation"

type Message = {
    role: 'user' | 'assistant'
    content: string
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const scrollRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()














    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    // Don't show on admin pages
    if (pathname?.startsWith("/admin")) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("ChatWidget: Submit triggered. Input:", input, "IsLoading:", isLoading)
        if (!input.trim() || isLoading) return

        const userMessage: Message = { role: 'user', content: input }
        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            console.log("ChatWidget: Sending fetch request...")
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] })
            })

            console.log("ChatWidget: Response status:", response.status)

            if (!response.ok) throw new Error('Failed to send message')
            if (!response.body) throw new Error('No response body')

            // Add placeholder for assistant message
            setMessages(prev => [...prev, { role: 'assistant', content: '' }])

            const reader = response.body.getReader()
            const decoder = new TextDecoder()
            let assistantMessageContent = ''

            console.log("ChatWidget: Starting stream reading...")
            while (true) {
                const { done, value } = await reader.read()
                if (done) {
                    console.log("ChatWidget: Stream reading done.")
                    break
                }

                const chunk = decoder.decode(value, { stream: true })
                assistantMessageContent += chunk
                // console.log("ChatWidget: Received chunk length:", chunk.length)

                setMessages(prev => {
                    const newMessages = [...prev]
                    const lastMessage = newMessages[newMessages.length - 1]
                    if (lastMessage.role === 'assistant') {
                        lastMessage.content = assistantMessageContent
                    }
                    return newMessages
                })
            }

        } catch (error) {
            console.error('ChatWidget error:', error)
            // Optionally handle error in UI
        } finally {
            console.log("ChatWidget: Setting isLoading to false")
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="p-4 bg-[var(--primary)]/10 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-[var(--primary)]/20 rounded-full">
                                <Bot size={18} className="text-[var(--primary)]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Portfolio Assistant</h3>
                                <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X size={18} className="text-slate-500" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center py-10 text-slate-500 text-sm">
                                <p>👋 Hi! I'm an AI assistant.</p>
                                <p className="mt-1">Ask me anything about this portfolio!</p>
                            </div>
                        )}

                        {messages.map((m, i) => (
                            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user"
                                    ? "bg-slate-200 dark:bg-slate-800"
                                    : "bg-[var(--primary)]/10"
                                    }`}>
                                    {m.role === "user" ? <User size={14} /> : <Bot size={14} className="text-[var(--primary)]" />}
                                </div>
                                <div className={`p-3 rounded-lg text-sm max-w-[80%] ${m.role === "user"
                                    ? "bg-[var(--primary)] text-white"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                    }`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                                    <Bot size={14} className="text-[var(--primary)]" />
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                        <input
                            className="flex-1 bg-slate-100 dark:bg-slate-800 border-0 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none text-slate-900 dark:text-white placeholder:text-slate-500"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="p-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-[var(--primary)] text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center group"
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <MessageCircle size={28} className="group-hover:animate-pulse" />
                )}
            </button>
        </div>
    )
}
