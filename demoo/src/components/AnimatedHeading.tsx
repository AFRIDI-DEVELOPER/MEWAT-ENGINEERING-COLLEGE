import { useState, useEffect } from 'react';

interface AnimatedHeadingProps {
  text: string;
  initialDelay?: number;
  charDelay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedHeading({
  text,
  initialDelay = 200,
  charDelay = 30,
  duration = 500,
  className = '',
}: AnimatedHeadingProps) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  const lines = text.split('\n');

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        const lineLength = line.length;
        return (
          <span key={lineIndex} className="block">
            {line.split('').map((char, charIndex) => {
              const delay = lineIndex * lineLength * charDelay + charIndex * charDelay;
              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all"
                  style={{
                    opacity: startAnimation ? 1 : 0,
                    transform: startAnimation ? 'translateX(0)' : 'translateX(-18px)',
                    transitionDuration: `${duration}ms`,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
