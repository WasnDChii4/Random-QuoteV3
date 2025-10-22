import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

export default function RandomQuote() {
  const [quote, setQuote] = useState({
    content: 'Loading...',
    character: '',
    anime: '',
  })

  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://yurippe.vercel.app/api/quotes?random=1");
      const data = await res.json();
  
      // ambil data pertama dari array hasil API
      const quoteData = data[0];
  
      setQuote({
        content: quoteData.quote,
        character: quoteData.character,
        anime: quoteData.show, // 'show' = nama anime
      });
    } catch (err) {
      setQuote({
        content: "Failed to load anime quote. Please try again.",
        character: "",
        anime: "",
      });
      console.error("Error fetching quote:", err);
    } finally {
      setLoading(false);
    }
  };  

  useEffect (() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-[#1E1E2E]/75 place-self-center w-11/12 max-w-md flex flex-col p-3 md:p-7 rounded-xl backdrop-blur-xs">
      <h1 className="text-2xl md:text-3xl font-jaini-purva-regular mb-2 md:mb-4">Anime Quote</h1>
      <div className="mb-6">
        <svg className="w-6 md:w-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
        </svg>
        <p className="text-white text-lg md:text-2xl leading-relaxed mb-6 ml-6">
          {quote.content}
        </p>
        {quote.character && (
          <div className="space-y-1">
            <p className="text-sm text-white/80 font-medium">
              ~ {quote.character}
            </p>
            {quote.anime && (
              <p className="text-xs text-white/50 italic">
                from {quote.anime}
              </p>
            )}
          </div>
        )}
      </div>
      <button
        onClick={fetchQuote}
        disabled={loading}
        className="mt-4 flex items-center justify-center gap-2 bg-pink-500/20 hover:bg-pink-500/30 disabled:bg-white/5 px-4 py-2 rounded-lg transition-all duration-200 border border-pink-500/30 hover:border-pink-500/50"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'Loading...' : 'New Anime Quote'}</span>
      </button>
    </div>
  )
}