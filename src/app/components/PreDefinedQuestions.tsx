'use client';

import { PreDefinedQuestion } from '../types';
import { Button } from '@/components/ui/button';

interface Props {
  question: PreDefinedQuestion;
  onOptionSelect: (text: string, response: string) => void;
}

export default function PreDefinedQuestions({ question, onOptionSelect }: Props) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-4 text-foreground">
        {question.question}
      </h3>
      <div className="flex flex-col gap-2">
        {question.options.map((option) => (
          <Button
            key={option.id}
            onClick={() => onOptionSelect(option.text, option.response)}
            variant="outline"
            className="justify-start text-left hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-950 dark:hover:text-green-300 transition-all duration-200 transform hover:scale-[1.02]"
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );
} 