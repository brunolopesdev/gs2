'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Message, UserProgress } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ChatContextType {
  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  userProgress: UserProgress;
  setUserProgress: (progress: UserProgress | ((prev: UserProgress) => UserProgress)) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useLocalStorage<Message[]>('chat-messages', []);
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>('user-progress', {
    points: 0,
    questionsAnswered: 0,
    level: 1,
    badges: []
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorage<number>('current-question-index', 0);

  return (
    <ChatContext.Provider 
      value={{ 
        messages, 
        setMessages, 
        userProgress, 
        setUserProgress,
        currentQuestionIndex,
        setCurrentQuestionIndex
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
} 