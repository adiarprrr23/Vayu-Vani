import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (phase === 'typing') {
      // Typing phase: Add one letter at a time
      if (displayText.length < text.length) {
        timeoutId = setTimeout(() => {
          setDisplayText((prev) => prev + text[prev.length]);
        }, 100); // Typing speed: 100ms per letter
      } else {
        // Switch to pausing phase after typing is complete
        setPhase('pausing');
        timeoutId = setTimeout(() => setPhase('deleting'), 5000); // 5-second pause
      }
    } else if (phase === 'deleting') {
      // Deleting phase: Remove one letter at a time
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, 50); // Deleting speed: 50ms per letter
      } else {
        // Switch to pausing phase after deleting is complete
        setPhase('pausing');
        timeoutId = setTimeout(() => setPhase('typing'), 5000); // 5-second pause
      }
    }

    // Cleanup timeout on unmount or phase change
    return () => clearTimeout(timeoutId);
  }, [text, displayText, phase]);

  return (
    <span className={`${className} inline-flex items-center`}>
      {displayText}
      <span className="ml-1 animate-blink">|</span> {/* Blinking cursor */}
    </span>
  );
}