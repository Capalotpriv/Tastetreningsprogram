
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, RefreshCw, Trophy, Check, X, Keyboard } from 'lucide-react';

interface TypingResultsProps {
  results: {
    wpm: number;
    accuracy: number;
    correctChars: number;
    errorChars: number;
    totalChars: number;
  };
  onRestart: () => void;
}

const TypingResults: React.FC<TypingResultsProps> = ({ results, onRestart }) => {
  const { wpm, accuracy, correctChars, errorChars, totalChars } = results;

  return (
    <Card className="w-full futuristic-card overflow-hidden">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <Trophy className="h-10 w-10 text-primary animate-pulse-glow" />
        </div>
        <CardTitle className="text-2xl text-center glow-text">Dine resultater</CardTitle>
        <CardDescription className="text-center">
          Slik presterte du i skrivetesten
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-center p-6 neon-border">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-primary glow-text">{wpm}</div>
              <div className="text-sm text-muted-foreground mt-1">Ord per minutt</div>
            </div>
          </div>
          
          <div className="text-center p-6 neon-border">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-primary glow-text">{accuracy}%</div>
              <div className="text-sm text-muted-foreground mt-1">Nøyaktighet</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Nøyaktighet</span>
            <span className="font-medium">{accuracy}%</span>
          </div>
          <Progress value={accuracy} className="h-2" />
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-primary" />
            <span>Detaljert statistikk</span>
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-secondary/40 rounded-lg border border-border/20">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Korrekte tastetrykk:</span>
              </span>
              <span className="font-medium">{correctChars}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-secondary/40 rounded-lg border border-border/20">
              <span className="flex items-center gap-2">
                <X className="h-4 w-4 text-red-500" />
                <span className="text-muted-foreground">Feil tastetrykk:</span>
              </span>
              <span className="font-medium">{errorChars}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-secondary/40 rounded-lg border border-border/20">
              <span className="flex items-center gap-2">
                <Keyboard className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Totale tastetrykk:</span>
              </span>
              <span className="font-medium">{totalChars}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-secondary/40 rounded-lg border border-border/20">
              <span className="flex items-center gap-2">
                <X className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Feilrate:</span>
              </span>
              <span className="font-medium">
                {totalChars > 0 ? ((errorChars / totalChars) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center pt-2 pb-6">
        <Button 
          onClick={onRestart} 
          size="lg" 
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Prøv igjen
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TypingResults;
