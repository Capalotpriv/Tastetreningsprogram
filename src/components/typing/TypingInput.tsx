
import React from 'react';
import { Button } from '@/components/ui/button';
import { Keyboard, ZapOff, Timer } from 'lucide-react';

interface TypingInputProps {
  input: string;
  isActive: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onFocusClick: () => void;
}

const TypingInput: React.FC<TypingInputProps> = ({
  input,
  isActive,
  onInputChange,
  inputRef,
  onFocusClick
}) => {
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={onInputChange}
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

      <div className="flex justify-center mt-6">
        <Button 
          onClick={onFocusClick}
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
    </div>
  );
};

export default TypingInput;
