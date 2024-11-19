'use client';

import { useState, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import { Message, ChatMessage as ChatMessageType } from "../types";
import ChatMessage from './ChatMessage';
import PreDefinedQuestions from './PreDefinedQuestions';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Send, RefreshCw, Award, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useChatContext } from '../contexts/ChatContext';

const TOTAL_QUESTIONS = 10;
const POINTS_PER_QUESTION = 10;
const MAX_POINTS = TOTAL_QUESTIONS * POINTS_PER_QUESTION;
const LEVELS = {
  1: { min: 0, max: 30, title: 'Iniciante' },
  2: { min: 31, max: 60, title: 'Aprendiz' },
  3: { min: 61, max: 90, title: 'Experiente' },
  4: { min: 91, max: MAX_POINTS, title: 'Especialista' }
};

interface ChatInterfaceProps {
  isFloating?: boolean;
}

export default function ChatInterface({ isFloating = false }: ChatInterfaceProps) {
  const { 
    messages, 
    setMessages, 
    userProgress, 
    setUserProgress,
    currentQuestionIndex,
    setCurrentQuestionIndex
  } = useChatContext();
  
  const [input, setInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChatMessages();
  }, []);

  const fetchChatMessages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://gs2-backend-zknk.vercel.app/chat-messages"
      );
      if (!response.ok) {
        throw new Error('Falha ao carregar as mensagens');
      }
      const data = await response.json();
      setChatMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar mensagens');
      console.error('Erro ao buscar mensagens:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateLevel = (points: number) => {
    return Object.entries(LEVELS).reduce((acc, [level, { min, max }]) => {
      return points >= min && points <= max ? Number(level) : acc;
    }, 1);
  };
  
  const checkForNewBadges = (points: number, questionsAnswered: number) => {
    const currentLevel = calculateLevel(points);
    const levelInfo = LEVELS[currentLevel as keyof typeof LEVELS];
    return levelInfo ? [levelInfo.title] : [];
  };

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

  const handleOptionSelect = async (text: string, response: string) => {
    if (userProgress.questionsAnswered >= TOTAL_QUESTIONS) return;

    const currentQuestion = chatMessages[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(opt => opt.text === text);
    
    if (!selectedOption) return;

    const pointsEarned = selectedOption.points;
    const newPoints = userProgress.points + pointsEarned;
    const newQuestionsAnswered = userProgress.questionsAnswered + 1;
    const newLevel = calculateLevel(newPoints);
    const newBadges = checkForNewBadges(newPoints, newQuestionsAnswered);

    setUserProgress({
      points: newPoints,
      questionsAnswered: newQuestionsAnswered,
      level: newLevel,
      badges: newBadges
    });

    const questionMessage: Message = {
      id: uuidv4(),
      content: currentQuestion.question,
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

    const isLastQuestion = newQuestionsAnswered === TOTAL_QUESTIONS;
    const completionMessage = isLastQuestion
      ? `\n\n🏆 Parabéns! Você completou todas as questões!\nPontuação final: ${newPoints} pontos\nNível alcançado: ${LEVELS[newLevel as keyof typeof LEVELS].title}`
      : `\n\n🎉 +${pointsEarned} pontos!`;

    const botMessage: Message = {
      id: uuidv4(),
      content: `${selectedOption.response}${completionMessage}`,
      role: 'assistant',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, questionMessage, userMessage, botMessage]);
    
    if (currentQuestionIndex < chatMessages.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleReset = () => {
    if (confirm('Isso irá resetar seu progresso. Deseja continuar?')) {
      setMessages([]);
      setCurrentQuestionIndex(0);
      setUserProgress({
        points: 0,
        questionsAnswered: 0,
        level: 1,
        badges: []
      });
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const currentLevelInfo = LEVELS[userProgress.level as keyof typeof LEVELS];
  const progressToNextLevel = currentLevelInfo
    ? (userProgress.points - currentLevelInfo.min) / (currentLevelInfo.max - currentLevelInfo.min)
    : 1;

  const isQuizComplete = userProgress.questionsAnswered >= TOTAL_QUESTIONS;

  if (isLoading) {
    return (
      <Card className={`w-full ${isFloating ? 'h-full border-none shadow-none rounded-none' : 'max-w-2xl mx-auto'}`}>
        <div className="p-4 text-center">
          Carregando questões...
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`w-full ${isFloating ? 'h-full border-none shadow-none rounded-none' : 'max-w-2xl mx-auto'}`}>
        <div className="p-4 text-center text-red-500">
          {error}
        </div>
      </Card>
    );
  }

  return (
    <Card className={`w-full ${isFloating ? 'h-full border-none shadow-none rounded-none' : 'max-w-2xl mx-auto'}`}>
      <div className="p-4 border-b bg-muted/50">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {isQuizComplete ? (
              <Trophy className="h-5 w-5 text-yellow-500" />
            ) : (
              <Award className="h-5 w-5 text-yellow-500" />
            )}
            <span className="font-semibold text-sm">
              {isQuizComplete 
                ? 'Quiz Completado!' 
                : `Nível ${userProgress.level} - ${currentLevelInfo?.title}`}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">{userProgress.points} pontos</span>
        </div>
        <Progress 
          value={isQuizComplete ? 100 : progressToNextLevel * 100} 
          className="h-2"
        />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{userProgress.questionsAnswered} de {TOTAL_QUESTIONS} questões</span>
          <span>{Math.round(progressToNextLevel * 100)}% para o próximo nível</span>
        </div>
      </div>
      <CardContent className={`p-4 ${isFloating ? 'flex flex-col h-[calc(100%-130px)]' : ''}`}>
        <div className={`
          ${isFloating ? 'h-[250px]' : 'h-[400px]'} 
          overflow-y-auto mb-4 space-y-4 scroll-smooth
        `}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        {!isQuizComplete && currentQuestionIndex < chatMessages.length && (
          <div className={`
            ${isFloating ? 'max-h-[200px] overflow-y-auto pr-2' : ''} 
            flex-shrink-0 border-t pt-4
          `}>
            <PreDefinedQuestions
              question={chatMessages[currentQuestionIndex]}
              onOptionSelect={handleOptionSelect}
              isFloating={isFloating}
            />
          </div>
        )}

        <div className="flex gap-2 mt-auto pt-4 border-t">
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
      <CardFooter className="flex justify-between border-t">
        <span className="text-sm text-muted-foreground">
          {isQuizComplete 
            ? '🏆 Quiz completado!' 
            : `${userProgress.questionsAnswered} de ${TOTAL_QUESTIONS} questões respondidas`}
        </span>
        <Button
          onClick={handleReset}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Recomeçar
        </Button>
      </CardFooter>
    </Card>
  );
} 