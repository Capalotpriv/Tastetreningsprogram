import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Clock, RotateCcw, Keyboard, ZapOff, Timer, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import TypingResults from './TypingResults';
import { getRandomQuote } from '@/lib/quotes';
import { saveTypingResult } from '@/services/typingResultsService';

interface TypingTestProps {
  duration?: number;
}

const TypingTest: React.FC<TypingTestProps> = ({ duration = 60 }) => {
  const { toast } = useToast();
  const [quote, setQuote] = useState('');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [errorChars, setErrorChars] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [results, setResults] = useState<{
    wpm: number;
    accuracy: number;
    correctChars: number;
    errorChars: number;
    totalChars: number;
  } | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            finishTest();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      finishTest();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTest = useCallback(() => {
    if (!isActive && !isFinished) {
      setStartTime(Date.now());
      setIsActive(true);
      inputRef.current?.focus();
    }
  }, [isActive, isFinished]);

  const resetTest = useCallback(() => {
    const newQuote = getRandomQuote();
    setQuote(newQuote);
    setInput('');
    setStartTime(null);
    setTimeLeft(duration);
    setIsActive(false);
    setIsFinished(false);
    setCorrectChars(0);
    setErrorChars(0);
    setCurrentCharIndex(0);
    setResults(null);
    
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [duration]);

  const finishTest = useCallback(async () => {
    if (!isFinished && startTime) {
      setIsActive(false);
      setIsFinished(true);
      
      const timeElapsed = (Date.now() - startTime) / 1000; // in seconds
      const minutes = timeElapsed / 60;
      const totalChars = correctChars + errorChars;
      const words = correctChars / 5; // standard: 5 chars = 1 word
      const wpm = Math.round(words / minutes);
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
      
      const testResults = {
        wpm,
        accuracy,
        correctChars,
        errorChars,
        totalChars
      };
      
      setResults(testResults);

      try {
        await saveTypingResult({
          wpm,
          accuracy,
          correct_chars: correctChars,
          error_chars: errorChars,
          total_chars: totalChars,
          test_duration: duration,
          user_id: null
        });
        
        toast({
          title: "Test fullført!",
          description: `Din skrivehastighet: ${wpm} OPM med ${accuracy}% nøyaktighet. Resultatet er lagret!`,
        });
      } catch (error) {
        console.error("Failed to save result:", error);
        toast({
          title: "Test fullført!",
          description: `Din skrivehastighet: ${wpm} OPM med ${accuracy}% nøyaktighet. (Kunne ikke lagre resultatet)`,
          variant: "destructive"
        });
      }
    }
  }, [isFinished, startTime, correctChars, errorChars, toast, duration]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive && !isFinished) {
      startTest();
    }
    
    if (isActive && !isFinished) {
      const typedChar = e.target.value.slice(-1);
      const expectedChar = quote[currentCharIndex];
      
      if (typedChar === expectedChar) {
        setCorrectChars(prev => prev + 1);
      } else {
        setErrorChars(prev => prev + 1);
      }
      
      setCurrentCharIndex(prev => prev + 1);
      setInput(e.target.value);
      
      if (currentCharIndex + 1 >= quote.length) {
        finishTest();
      }
    }
  };

  const renderTypingContent = () => {
    return quote.split('').map((char, index) => {
      const isTyped = index < currentCharIndex;
      const isCorrect = index < input.length && input[index] === char;
      const isCurrent = index === currentCharIndex;
      
      return (
        <span
          key={`${index}-${char}`}
          className={cn(
            "typing-character",
            isTyped && (isCorrect ? "correct" : "incorrect"),
            isCurrent && "current"
          )}
        >
          {char}
          {isCurrent && <span className="typing-cursor" />}
        </span>
      );
    });
  };

  const calculateCurrentWPM = () => {
    if (!startTime || !isActive) return 0;
    
    const timeElapsedInMinutes = (Date.now() - startTime) / 1000 / 60;
    if (timeElapsedInMinutes <= 0) return 0;
    
    return Math.round((correctChars / 5) / timeElapsedInMinutes);
  };

  return (
    <div className="w-full space-y-6">
      {!isFinished ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <div className="flex items-center bg-secondary/40 backdrop-blur-sm p-2 rounded-lg border border-border/20">
                <Clock className="mr-2 h-4 w-4 text-primary" />
                <span className="font-mono text-lg">{timeLeft}s</span>
              </div>
              
              {isActive && (
                <div className="flex items-center bg-secondary/40 backdrop-blur-sm p-2 rounded-lg border border-border/20">
                  <Zap className="mr-2 h-4 w-4 text-primary animate-pulse-glow" />
                  <span className="font-mono text-lg">{calculateCurrentWPM()} OPM</span>
                </div>
              )}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetTest}
              className="flex items-center gap-2 border-border/30"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Start på nytt</span>
            </Button>
          </div>
          
          <Card className="relative futuristic-card overflow-hidden">
            <CardContent 
              className="p-4 sm:p-6 min-h-[200px] max-h-[300px] overflow-auto font-mono text-base sm:text-lg leading-relaxed bg-secondary/20"
              ref={contentRef}
              onClick={() => inputRef.current?.focus()}
            >
              {renderTypingContent()}
            </CardContent>
          </Card>
          
          <div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="sr-only"
              aria-label="Skriveinput"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              {isActive 
                ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/40 rounded-md border border-border/20">
                    <Keyboard className="h-4 w-4 text-primary" />
                    Fortsett å skrive...
                  </span>
                ) 
                : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/40 rounded-md border border-border/20">
                    <ZapOff className="h-4 w-4 text-primary" />
                    Klikk på teksten eller begynn å skrive for å starte
                  </span>
                )}
            </p>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button 
              onClick={() => inputRef.current?.focus()}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              {isActive ? (
                <>
                  <Keyboard className="mr-2 h-4 w-4" />
                  Fortsett å skrive
                </>
              ) : (
                <>
                  <Timer className="mr-2 h-4 w-4" />
                  Start test
                </>
              )}
            </Button>
          </div>
        </>
      ) : (
        <TypingResults 
          results={results!} 
          onRestart={resetTest} 
        />
      )}
    </div>
  );
};

export default TypingTest;
