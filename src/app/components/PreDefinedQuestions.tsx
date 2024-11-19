'use client';

import { ChatMessage } from '../types';
import { Button } from '@/components/ui/button';
import { MouseEvent } from 'react';

interface Props {
  question: ChatMessage;
  onOptionSelect: (text: string, response: string) => void;
  disabled?: boolean;
  isFloating?: boolean;
}

export default function PreDefinedQuestions({ 
  question, 
  onOptionSelect, 
  disabled = false,
  isFloating = false 
}: Props) {
  const handleClick = (text: string, response: string) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOptionSelect(text, response);
  };

  return (
    <div className="mb-4">
      <h3 className={`font-semibold mb-4 text-foreground ${isFloating ? 'text-sm' : ''}`}>
        {question.question}
      </h3>
      <div className="flex flex-col gap-2">
        {question.options.map((option) => (
          <Button
            key={option.id}
            onClick={handleClick(option.text, option.response)}
            variant="outline"
            disabled={disabled}
            className={`
              justify-start text-left hover:bg-green-50 hover:text-green-700 
              dark:hover:bg-green-950 dark:hover:text-green-300 
              transition-all duration-200 transform hover:scale-[1.02]
              ${isFloating ? 'text-sm py-2 px-3 h-auto whitespace-normal' : ''}
            `}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );
} 