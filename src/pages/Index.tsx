
import React from 'react';
import TypingTest from '@/components/TypingTest';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            <span className="text-foreground">Quick</span>Fingers
          </h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/stats')}>
              Stats
            </Button>
            <Button variant="outline" onClick={() => navigate('/about')}>
              About
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Test Your Typing Speed</h2>
          <p className="text-muted-foreground mt-2">
            Start typing to begin the test. How fast can your fingers fly?
          </p>
        </div>
        
        <TypingTest duration={60} />
        
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Pro tip: Focus on accuracy first, speed will follow naturally.
          </p>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>QuickFingers Typing Test &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
