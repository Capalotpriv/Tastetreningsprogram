
import React from 'react';
import TypingTestContainer from './typing/TypingTestContainer';

interface TypingTestProps {
  duration?: number;
}

const TypingTest: React.FC<TypingTestProps> = ({ duration = 60 }) => {
  return <TypingTestContainer duration={duration} />;
};

export default TypingTest;
