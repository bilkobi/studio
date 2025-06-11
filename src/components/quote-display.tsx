"use client";

import { useEffect, useState } from 'react';

interface QuoteDisplayProps {
  quote: string;
  author: string;
  keyProp?: number; // To re-trigger animation when content changes
}

export default function QuoteDisplay({ quote, author, keyProp }: QuoteDisplayProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => {
      setShow(true);
    }, 50); 
    return () => clearTimeout(timer);
  }, [keyProp]);

  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${show ? 'opacity-100' : 'opacity-0'} min-h-[150px] md:min-h-[200px] flex flex-col justify-center`}
      aria-live="polite"
    >
      <blockquote className="text-2xl md:text-3xl lg:text-4xl italic text-center font-headline mb-4">
        <p>"{quote}"</p>
      </blockquote>
      <p className="text-lg md:text-xl text-center font-body text-muted-foreground">— {author}</p>
    </div>
  );
}
