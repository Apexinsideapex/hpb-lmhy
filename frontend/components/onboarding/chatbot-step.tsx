"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  type: "bot" | "user"
  content: string
  timestamp: Date
}

interface ChatbotStepProps {
  extractedData: any
  onNext: () => void
}

const CHAT_FLOW = [
  {
    question: "Hi! I see you're a Senior Software Engineer. What type of roles are you primarily looking for?",
    field: "targetRoles",
  },
  {
    question: "Great! What's your preferred salary range for these positions?",
    field: "salaryRange",
  },
  {
    question: "Are you open to remote work, or do you prefer in-person/hybrid arrangements?",
    field: "workPreference",
  },
  {
    question: "Which companies or industries are you most interested in?",
    field: "targetCompanies",
  },
  {
    question: "How soon are you looking to start a new position?",
    field: "availability",
  },
  {
    question: "Perfect! I have everything I need. Your profile is now complete and ready to go!",
  },
]

export function ChatbotStep({ extractedData, onNext }: ChatbotStepProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [userResponses, setUserResponses] = useState<Record<string, string>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initial greeting
    const initialMessage: Message = {
      id: "1",
      type: "bot",
      content: `Hello ${extractedData?.name || "there"}! I've reviewed your CV and I'd like to ask a few questions to complete your profile. This will help us match you with the best job opportunities.`,
      timestamp: new Date(),
    }

    setMessages([initialMessage])

    // Ask first question after a delay
    setTimeout(() => {
      askNextQuestion()
    }, 1500)
  }, [])

  const askNextQuestion = () => {
    if (currentQuestionIndex < CHAT_FLOW.length) {
      setIsTyping(true)

      setTimeout(() => {
        const newMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content: CHAT_FLOW[currentQuestionIndex].question,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, newMessage])
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleSendMessage = () => {
    if (!currentInput.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: currentInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Store user response
    if (currentQuestionIndex < CHAT_FLOW.length - 1) {
      const currentField = CHAT_FLOW[currentQuestionIndex].field
      if (currentField) {
        setUserResponses((prev) => ({
          ...prev,
          [currentField]: currentInput,
        }))
      }
    }

    setCurrentInput("")
    setCurrentQuestionIndex((prev) => prev + 1)

    // Ask next question or complete
    setTimeout(() => {
      if (currentQuestionIndex + 1 < CHAT_FLOW.length) {
        askNextQuestion()
      } else {
        // Chat completed
        setTimeout(() => {
          onNext()
        }, 2000)
      }
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 font-sans">Complete Your Profile</h3>
        <p className="text-muted-foreground font-mono">Let's have a quick chat to fill in the remaining details</p>
      </div>

      <Card className="h-96 flex flex-col">
        <CardContent className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback
                    className={message.type === "bot" ? "bg-primary text-primary-foreground" : "bg-muted"}
                  >
                    {message.type === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[80%] p-3 rounded-lg font-mono text-sm ${
                    message.type === "bot" ? "bg-card border border-border" : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card border border-border p-3 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        {currentQuestionIndex < CHAT_FLOW.length - 1 && (
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your response..."
                className="flex-1 font-mono"
                disabled={isTyping}
              />
              <Button onClick={handleSendMessage} disabled={!currentInput.trim() || isTyping} className="glow-on-hover">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
