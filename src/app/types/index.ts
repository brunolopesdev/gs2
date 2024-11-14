export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isQuestion?: boolean;
}

export interface PreDefinedQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    response: string;
  }[];
} 