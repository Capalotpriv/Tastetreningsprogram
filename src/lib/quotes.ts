
// Collection of quotes for the typing test
const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "In the middle of difficulty lies opportunity.",
  "Believe you can and you're halfway there.",
  "It always seems impossible until it's done.",
  "You miss 100% of the shots you don't take.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It does not matter how slowly you go as long as you do not stop.",
  "The best way to predict the future is to create it.",
  "The mind is everything. What you think you become.",
  "The only way to do great work is to love what you do.",
  "If you want to achieve greatness, stop asking for permission.",
  "All our dreams can come true, if we have the courage to pursue them.",
  "Success is walking from failure to failure with no loss of enthusiasm.",
  "If you are not willing to risk the usual, you will have to settle for the ordinary.",
  "The successful warrior is the average man, with laser-like focus.",
  "Don't watch the clock; do what it does. Keep going.",
  "The difference between ordinary and extraordinary is that little extra.",
  "The harder I work, the luckier I get.",
  "Opportunities don't happen. You create them.",
  "Quality is not an act, it is a habit.",
  "The secret of getting ahead is getting started.",
  "The only place where success comes before work is in the dictionary.",
  "Typing quickly is a skill that can be developed with practice and patience.",
  "Your speed and accuracy will improve over time with consistent practice.",
  "Focus on accuracy first, then gradually increase your typing speed.",
  "Good posture and proper finger positioning are essential for efficient typing.",
  "Learning to touch type without looking at the keyboard will significantly improve your speed.",
];

/**
 * Get a random quote from the collection
 */
export const getRandomQuote = (): string => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

/**
 * Calculate words per minute from characters typed and time elapsed
 */
export const calculateWPM = (charactersTyped: number, timeElapsedInSeconds: number): number => {
  // Using the standard 5 characters = 1 word
  const words = charactersTyped / 5;
  const minutes = timeElapsedInSeconds / 60;
  
  return Math.round(words / minutes);
};

/**
 * Calculate accuracy percentage
 */
export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};
