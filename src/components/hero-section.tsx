'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToChatbot = () => {
    const chatbotSection = document.getElementById('chatbot');
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Reduza seu Consumo Energético com Inteligência
        </h1>
        <p className="text-xl mb-8">
          Sistemas inteligentes para indústrias, residências e cidades
        </p>
        <Button 
          className="bg-white text-green-600 hover:bg-green-100"
          onClick={scrollToChatbot}
        >
          Comece Agora
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
} 