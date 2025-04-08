
import React from 'react';
import { Clock, Zap } from "lucide-react";

interface TypingMetricsProps {
  timeLeft: number;
  isActive: boolean;
  currentWPM: number;
}

const TypingMetrics: React.FC<TypingMetricsProps> = ({ 
  timeLeft, 
  isActive, 
  currentWPM 
}) => {
  return (
    <div className="flex gap-6">
      <div className="flex items-center bg-secondary/40 backdrop-blur-sm p-2 rounded-lg border border-border/20">
        <Clock className="mr-2 h-4 w-4 text-primary" />
        <span className="font-mono text-lg">{timeLeft}s</span>
      </div>
      
      {isActive && (
        <div className="flex items-center bg-secondary/40 backdrop-blur-sm p-2 rounded-lg border border-border/20">
          <Zap className="mr-2 h-4 w-4 text-primary animate-pulse-glow" />
          <span className="font-mono text-lg">{currentWPM} OPM</span>
        </div>
      )}
    </div>
  );
};

export default TypingMetrics;
