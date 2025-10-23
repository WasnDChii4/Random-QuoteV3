import React, { useEffect, useState } from "react";
import { RefreshCw, ShareIcon } from "lucide-react";

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
      const quoteData = data[0];
  
      setQuote({
        content: quoteData.quote,
        character: quoteData.character,
        anime: quoteData.show,
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
    <div className="bg-[#1E1E2E]/75 place-self-center w-11/12 flex flex-col p-3 md:p-7 rounded-xl backdrop-blur-xs shadow-lg shadow-[#1E1E2E] border border-white/15 m-4">
      <h1 className="text-2xl md:text-5xl font-jaini-purva-regular mb-2 md:mb-4">Anime Quote</h1>
      <div className="mb-6">
        <svg className="w-6 md:w-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
        </svg>
        <p className="text-white text-xl md:text-3xl leading-relaxed mb-6 ml-6 font-caveat-brush-regular">
          {quote.content}
        </p>
        {quote.character && (
          <div className="space-y-1 text-right">
            <p className="text-md md:text-lg text-white/75 font-chela-one-regular">
              ~ {quote.character}
            </p>
            {quote.anime && (
              <p className="text-xs md:text-sm text-white/50 font-chau-philomene-one-regular-italic">
                from {quote.anime}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="tooltip tooltip-bottom" data-tip="New Quote">
          <button onClick={fetchQuote} disabled={loading} className="mb-2 flex place-self-start gap-2 bg-[#f06230]/75 hover:bg-[#f97c2c]/50 disabled:bg-[#f06230]/25 px-4 py-2 rounded-lg transition-all duration-200 border border-[#f06230]/75 hover:border-[#f97c2c]/50">
            <RefreshCw className={`w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Share">
          <button onClick={fetchQuote} disabled={loading} className=" mb-2 flex place-self-start gap-2 bg-[#f06230]/75 hover:bg-[#f97c2c]/50 disabled:bg-[#f06230]/25 px-4 py-2 rounded-lg transition-all duration-200 border border-[#f06230]/75 hover:border-[#f97c2c]/50">
            <ShareIcon className="" />
          </button>
        </div>
      </div>
    </div>
  )
}