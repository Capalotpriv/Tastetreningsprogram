
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Dine resultater</CardTitle>
        <CardDescription className="text-center">
          Slik presterte du i skrivetesten
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <div className="text-3xl font-bold text-primary">{wpm}</div>
            <div className="text-sm text-muted-foreground">Ord per minutt</div>
          </div>
          
          <div className="text-center p-4 bg-secondary rounded-lg">
            <div className="text-3xl font-bold text-primary">{accuracy}%</div>
            <div className="text-sm text-muted-foreground">Nøyaktighet</div>
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
          <h4 className="text-sm font-medium">Statistikk</h4>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between p-2 bg-secondary/50 rounded">
              <span className="text-muted-foreground">Korrekte tastetrykk:</span>
              <span className="font-medium">{correctChars}</span>
            </div>
            
            <div className="flex justify-between p-2 bg-secondary/50 rounded">
              <span className="text-muted-foreground">Feil tastetrykk:</span>
              <span className="font-medium">{errorChars}</span>
            </div>
            
            <div className="flex justify-between p-2 bg-secondary/50 rounded">
              <span className="text-muted-foreground">Totale tastetrykk:</span>
              <span className="font-medium">{totalChars}</span>
            </div>
            
            <div className="flex justify-between p-2 bg-secondary/50 rounded">
              <span className="text-muted-foreground">Feilrate:</span>
              <span className="font-medium">
                {totalChars > 0 ? ((errorChars / totalChars) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <Button onClick={onRestart} size="lg">
          Prøv igjen
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TypingResults;
