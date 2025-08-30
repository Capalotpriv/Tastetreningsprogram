import React from 'react';
import TypingTest from '@/components/TypingTest';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Zap, BarChart3, InfoIcon } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-4 md:py-6 border-b border-border/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <h1 
            className="text-xl md:text-2xl font-bold glow-text cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-foreground">Raske</span>
            <span className="text-primary">Fingre</span>
          </h1>
          <div className="flex gap-2 md:gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex gap-2 items-center" 
              onClick={() => navigate('/stats')}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Statistikk</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex gap-2 items-center" 
              onClick={() => navigate('/about')}
            >
              <InfoIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Om</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-8 md:py-12 flex flex-col items-center justify-center">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <div className="inline-block mb-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs tracking-wider">
            TEST SKRIVEHASTIGHETEN DIN
          </div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight glow-text mb-2">
            Hvor raskt flyr fingrene dine?
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Begynn å skrive for å starte testen og mål din hastighet og nøyaktighet.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto">
          <TypingTest duration={60} />
        </div>
        
        <div className="mt-12 text-center text-sm text-muted-foreground max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/60 backdrop-blur-sm rounded-md">
            <Zap className="h-4 w-4 text-primary animate-pulse-glow" />
            <p>
              Et lite tips: Fokuser på nøyaktighet først, hastigheten vil følge naturlig.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="py-4 md:py-6 border-t border-border/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>RaskeFingre Skrivetest &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
