'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatInterface from './ChatInterface';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsChatVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const chatSection = document.getElementById('chatbot');
    if (chatSection) {
      observer.observe(chatSection);
    }

    return () => {
      if (chatSection) {
        observer.unobserve(chatSection);
      }
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isChatVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 z-50"
          >
            {isOpen ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-background rounded-lg shadow-lg w-[400px] h-[600px] flex flex-col overflow-hidden"
              >
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-semibold">Assistente Virtual</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto">
                  <ChatInterface isFloating={true} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
                >
                  <MessageSquare className="h-6 w-6" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 