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
}

export interface PreDefinedQuestion {
  id: string;
  question: string;
  options: Option[];
} 