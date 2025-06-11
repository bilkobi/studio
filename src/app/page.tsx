"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import QuoteDisplay from '@/components/quote-display';
import { quotes, type Quote } from '@/lib/quotes';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [quoteKey, setQuoteKey] = useState(0);

  const getRandomQuote = useCallback(() => {
    if (quotes.length === 0) {
      setCurrentQuote({text: "Nessun aforisma disponibile.", author: "Sistema"});
      setQuoteKey(prevKey => prevKey + 1);
      return;
    }
    
    let randomIndex;
    if (quotes.length === 1) {
      randomIndex = 0;
    } else {
      do {
        randomIndex = Math.floor(Math.random() * quotes.length);
      } while (quotes[randomIndex] === currentQuote); // Avoid same quote if possible
    }
    
    setCurrentQuote(quotes[randomIndex]);
    setQuoteKey(prevKey => prevKey + 1);
  }, [currentQuote]); // Include currentQuote to ensure a new quote is fetched if it's the only dependency that makes sense to avoid same quote

  useEffect(() => {
    getRandomQuote();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial quote load

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-background text-foreground font-body selection:bg-accent selection:text-accent-foreground">
      <main className="container mx-auto max-w-3xl flex flex-col items-center justify-center text-center space-y-10 py-12 flex-grow">
        <header>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-primary mb-8">
            Aforismi Storici
          </h1>
        </header>
        
        {currentQuote ? (
          <QuoteDisplay quote={currentQuote.text} author={currentQuote.author} keyProp={quoteKey} />
        ) : (
          <div className="min-h-[150px] md:min-h-[200px] flex items-center justify-center">
            <p className="text-xl text-muted-foreground">Caricamento aforisma...</p>
          </div>
        )}
        
        <Button 
          onClick={getRandomQuote}
          className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
          size="lg"
          aria-label="Mostra una nuova citazione"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Nuova Citazione
        </Button>
      </main>
      <footer className="py-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Aforismi Storici. Realizzato con saggezza.</p>
      </footer>
    </div>
  );
}
