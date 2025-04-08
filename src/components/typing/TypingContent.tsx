
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface TypingContentProps {
  quote: string;
  currentCharIndex: number;
  input: string;
  contentRef: React.RefObject<HTMLDivElement>;
  onContentClick: () => void;
}

const TypingContent: React.FC<TypingContentProps> = ({
  quote,
  currentCharIndex,
  input,
  contentRef,
  onContentClick
}) => {
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

  return (
    <Card className="relative futuristic-card overflow-hidden">
      <CardContent 
        className="p-4 sm:p-6 min-h-[200px] max-h-[300px] overflow-auto font-mono text-base sm:text-lg leading-relaxed bg-secondary/20"
        ref={contentRef}
        onClick={onContentClick}
      >
        {renderTypingContent()}
      </CardContent>
    </Card>
  );
};

export default TypingContent;
