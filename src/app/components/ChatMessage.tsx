'use client';

import { Message } from '../types';
import { motion } from 'framer-motion';

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`max-w-[70%] rounded-lg p-4 ${
          message.role === 'user' 
            ? 'bg-green-600 text-white' 
            : message.isQuestion
              ? 'bg-blue-100 dark:bg-blue-900 text-foreground border border-blue-200 dark:border-blue-800'
              : 'bg-muted text-foreground dark:bg-gray-800'
        }`}
      >
        <p className={`text-sm ${message.isQuestion ? 'font-semibold' : ''}`}>
          {message.content}
        </p>
      </motion.div>
    </motion.div>
  );
} 