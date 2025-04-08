
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Clock, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import TypingResults from './TypingResults';
import { getRandomQuote } from '@/lib/quotes';

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

  // Initialize with a random quote
  useEffect(() => {
    resetTest();
  }, []);

  // Timer countdown
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
    
    // Reset scroll position of typing content
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [duration]);

  const finishTest = useCallback(() => {
    if (!isFinished && startTime) {
      setIsActive(false);
      setIsFinished(true);
      
      const timeElapsed = (Date.now() - startTime) / 1000; // in seconds
      const minutes = timeElapsed / 60;
      const totalChars = correctChars + errorChars;
      const words = correctChars / 5; // standard: 5 chars = 1 word
      const wpm = Math.round(words / minutes);
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
      
      setResults({
        wpm,
        accuracy,
        correctChars,
        errorChars,
        totalChars
      });

      toast({
        title: "Test completed!",
        description: `Your typing speed: ${wpm} WPM with ${accuracy}% accuracy.`,
      });
    }
  }, [isFinished, startTime, correctChars, errorChars, toast]);

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
      
      // Auto-finish if reached the end of the quote
      if (currentCharIndex + 1 >= quote.length) {
        finishTest();
      }
    }
  };

  const renderTypingContent = () => {
    return quote.split('').map((char, index) => {
      // Check if this character has been typed
      const isTyped = index < currentCharIndex;
      // Check if the typed character matches the expected one
      const isCorrect = index < input.length && input[index] === char;
      // Check if this is the current character being typed
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

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {!isFinished ? (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="font-mono text-lg">{timeLeft}s</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetTest}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Restart
            </Button>
          </div>
          
          <Card className="relative">
            <CardContent 
              className="p-6 min-h-[200px] max-h-[300px] overflow-auto font-mono text-lg leading-relaxed"
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
              aria-label="Typing input"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
            
            <p className="text-center text-sm text-muted-foreground mt-2">
              {isActive 
                ? "Keep typing..." 
                : "Click on the text or start typing to begin"}
            </p>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button onClick={() => inputRef.current?.focus()}>
              {isActive ? "Continue Typing" : "Start Test"}
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
