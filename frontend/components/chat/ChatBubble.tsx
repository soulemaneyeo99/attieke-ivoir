"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import api from "@/services/api"

interface Message {
    role: 'user' | 'assistant'
    content: string
}

export default function ChatBubble() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMessage = input.trim()
        setInput('')

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMessage }])
        setLoading(true)

        try {
            const response = await api.post('/chat/', { message: userMessage })

            // Add AI response
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.data.response
            }])
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Désolé, une erreur est survenue. Veuillez réessayer.'
            }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
                    aria-label="Ouvrir le chat"
                >
                    <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-secondary rounded-full animate-pulse" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-3rem)] shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-primary text-white p-4 rounded-t-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                <MessageCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Assistant Attiéké Ivoir</h3>
                                <p className="text-xs text-white/80">Toujours là pour vous aider</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                            aria-label="Fermer le chat"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-br-sm'
                                            : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-800 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm">En train d'écrire...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Form */}
                    <form onSubmit={sendMessage} className="p-4 border-t bg-white rounded-b-xl">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Posez votre question..."
                                disabled={loading}
                                className="flex-1"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={loading || !input.trim()}
                                className="shrink-0"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </Card>
            )}
        </>
    )
}
