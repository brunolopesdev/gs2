import { 
  Zap, 
  Lightbulb, 
  Building2, 
  Users, 
  MessageSquare
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HeroSection } from "@/components/hero-section";
import ChatInterface from './components/ChatInterface';
import { SmoothScrollLink } from "@/components/smooth-scroll-link";
import { Logo } from "@/components/logo";
import FloatingChat from '@/app/components/FloatingChat';
import { ChatProvider } from './contexts/ChatContext';

export default function Home() {
  return (
    <ChatProvider>
      <div className="flex flex-col min-h-screen">
        <header className="bg-background border-b fixed w-full top-0 z-50">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Logo />
            <div className="hidden md:flex items-center space-x-4">
              <SmoothScrollLink 
                href="#recursos" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Recursos
              </SmoothScrollLink>
              <SmoothScrollLink 
                href="#estatisticas" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Estatísticas
              </SmoothScrollLink>
              <SmoothScrollLink 
                href="#depoimentos" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Depoimentos
              </SmoothScrollLink>
              <SmoothScrollLink 
                href="#chatbot" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Chatbot
              </SmoothScrollLink>
              <ThemeToggle />
              <Button>Contate-nos</Button>
            </div>
          </nav>
        </header>

        <div className="pt-16">
          <main className="flex-grow">
            {/* Hero Section */}
            <HeroSection />

            {/* Features Section */}
            <section id="recursos" className="py-20 bg-muted/50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nossos Recursos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Lightbulb className="h-12 w-12 text-green-600 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Iluminação Inteligente</h3>
                      <p className="text-gray-600">
                        Ajuste automático da iluminação baseado na ocupação e luz natural.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Building2 className="h-12 w-12 text-green-600 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Gestão Predial</h3>
                      <p className="text-gray-600">
                        Otimização do consumo de energia em edifícios comerciais e residenciais.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Users className="h-12 w-12 text-green-600 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Engajamento do Usuário</h3>
                      <p className="text-gray-600">
                        Ferramentas para conscientização e mudança de comportamento.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section id="estatisticas" className="py-20 bg-primary text-primary-foreground">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nosso Impacto</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <p className="text-4xl font-bold mb-2">30%</p>
                    <p className="text-xl">Redução média no consumo de energia</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold mb-2">1000+</p>
                    <p className="text-xl">Clientes satisfeitos</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold mb-2">50.000</p>
                    <p className="text-xl">Toneladas de CO2 evitadas anualmente</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="depoimentos" className="py-20 bg-background">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <p className="mb-4">
                        "Desde que implementamos o sistema da Energet, nossa fábrica reduziu o consumo de energia em 35%. O retorno sobre o investimento foi impressionante!"
                      </p>
                      <p className="font-semibold">Maria Silva, Gerente Industrial</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <p className="mb-4">
                        "O aplicativo de engajamento do usuário realmente nos ajudou a criar uma cultura de economia de energia em nossa empresa. Todos estão mais conscientes agora."
                      </p>
                      <p className="font-semibold">João Santos, Diretor de Sustentabilidade</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Chatbot Section */}
            <section id="chatbot" className="py-20 bg-muted/50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4 text-foreground">
                    Assistente Virtual de Economia de Energia
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Tire suas dúvidas sobre economia de energia e descubra as melhores práticas para reduzir seu consumo energético.
                  </p>
                </div>
                <ChatInterface />
              </div>
            </section>
          </main>
        </div>

        <footer className="bg-muted py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Energet</h3>
                <p className="text-muted-foreground">Transformando o consumo de energia com tecnologia inteligente.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Links Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <SmoothScrollLink 
                      href="#recursos" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Recursos
                    </SmoothScrollLink>
                  </li>
                  <li>
                    <SmoothScrollLink 
                      href="#estatisticas" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Estatísticas
                    </SmoothScrollLink>
                  </li>
                  <li>
                    <SmoothScrollLink 
                      href="#depoimentos" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Depoimentos
                    </SmoothScrollLink>
                  </li>
                  <li>
                    <SmoothScrollLink 
                      href="#chatbot" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Chatbot
                    </SmoothScrollLink>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Contate-nos</h3>
                <p className="text-muted-foreground">Email: info@Energet.com</p>
                <p className="text-muted-foreground">Telefone: (11) 1234-5678</p>
              </div>
            </div>
            <div className="mt-8 text-center border-t border-border pt-8">
              <p className="text-muted-foreground">&copy; 2024 Energet. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
        <FloatingChat />
      </div>
    </ChatProvider>
  );
}
