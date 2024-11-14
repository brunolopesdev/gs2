'use client';

import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';
import PreDefinedQuestions from './PreDefinedQuestions';
import { predefinedQuestions } from '../lib/questions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Send, RefreshCw } from 'lucide-react';

export default function ChatInterface() {
  const [messages, setMessages] = useLocalStorage<Message[]>('chat-messages', []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [input, setInput] = useState<string>('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    const botMessage: Message = {
      id: uuidv4(),
      content: 'Por favor, selecione uma das opções acima para obter informações específicas sobre economia de energia.',
      role: 'assistant',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const handleOptionSelect = (text: string, response: string) => {
    const questionMessage: Message = {
      id: uuidv4(),
      content: predefinedQuestions[currentQuestionIndex].question,
      role: 'assistant',
      timestamp: new Date(),
      isQuestion: true
    };

    const userMessage: Message = {
      id: uuidv4(),
      content: text,
      role: 'user',
      timestamp: new Date()
    };

    const botMessage: Message = {
      id: uuidv4(),
      content: response,
      role: 'assistant',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, questionMessage, userMessage, botMessage]);
    
    if (currentQuestionIndex < predefinedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentQuestionIndex(0);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="h-[400px] overflow-y-auto mb-4 space-y-4 scroll-smooth">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        {currentQuestionIndex < predefinedQuestions.length && (
          <PreDefinedQuestions
            question={predefinedQuestions[currentQuestionIndex]}
            onOptionSelect={handleOptionSelect}
          />
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 p-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button 
            onClick={handleSend} 
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t">
        <Button
          onClick={handleReset}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Limpar conversa
        </Button>
      </CardFooter>
    </Card>
  );
} 