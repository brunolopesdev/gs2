export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isQuestion?: boolean;
}

export interface Option {
  id: string;
  text: string;
  response: string;
  points: number;
}

export interface PreDefinedQuestion {
  id: string;
  question: string;
  options: Option[];
  points: number;
}

export interface UserProgress {
  points: number;
  questionsAnswered: number;
  level: number;
  badges: string[];
} 