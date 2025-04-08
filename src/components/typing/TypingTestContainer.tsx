
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RotateCcw } from "lucide-react";
import { getRandomQuote } from '@/lib/quotes';
import { saveTypingResult } from '@/services/typingResultsService';
import TypingResults from '../TypingResults';
import TypingMetrics from './TypingMetrics';
import TypingContent from './TypingContent';
import TypingInput from './TypingInput';

interface TypingTestContainerProps {
  duration?: number;
}

const TypingTestContainer: React.FC<TypingTestContainerProps> = ({ duration = 60 }) => {
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

  const calculateCurrentWPM = () => {
    if (!startTime || !isActive) return 0;
    
    const timeElapsedInMinutes = (Date.now() - startTime) / 1000 / 60;
    if (timeElapsedInMinutes <= 0) return 0;
    
    return Math.round((correctChars / 5) / timeElapsedInMinutes);
  };

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="w-full space-y-6">
      {!isFinished ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <TypingMetrics 
              timeLeft={timeLeft} 
              isActive={isActive} 
              currentWPM={calculateCurrentWPM()} 
            />
            
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
          
          <TypingContent 
            quote={quote}
            currentCharIndex={currentCharIndex}
            input={input}
            contentRef={contentRef}
            onContentClick={handleFocusInput}
          />
          
          <TypingInput 
            input={input}
            isActive={isActive}
            onInputChange={handleInputChange}
            inputRef={inputRef}
            onFocusClick={handleFocusInput}
          />
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

export default TypingTestContainer;
