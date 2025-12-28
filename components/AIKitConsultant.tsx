
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useStore } from '../context/StoreContext';

export const AIKitConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Welcome to the Premium Lounge. I'm your AI Kit Specialist. Looking for a specific era, team, or player's kit?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are an expert football kit consultant for 'Premium Kits Bangladesh'. You help fans find authentic jerseys. You have deep knowledge of football history, club aesthetics, and jersey technology (Player vs Fan editions). Be professional, enthusiastic, and helpful.",
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm currently unable to process your request. Please try again later." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Apologies, there's a technical foul with my connection. Please try again shortly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[90]">
      {isOpen ? (
        <div className="w-[350px] md:w-[400px] h-[500px] md:h-[600px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col overflow-hidden animate-slide-up">
          <div className="bg-brand-dark p-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-crimson rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm uppercase tracking-widest">Kit Consultant</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Always Active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <Minimize2 size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-gray-50/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-brand-crimson text-white rounded-tr-none shadow-md' 
                  : 'bg-white border border-gray-100 text-brand-dark rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin text-brand-crimson" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Consulting...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-50">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about kits..."
                className="w-full bg-gray-50 border border-gray-100 rounded-full pl-6 pr-14 py-4 text-sm focus:outline-none focus:border-brand-crimson transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center hover:bg-brand-crimson transition-all"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-3 flex justify-center gap-4">
               <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                 <Sparkles size={10} className="text-brand-gold" /> Powered by Gemini
               </span>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-brand-dark text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-crimson to-transparent opacity-0 group-hover:opacity-40 transition-opacity rounded-full"></div>
          <MessageSquare size={24} className="relative z-10" />
          <div className="absolute -top-1 -right-1 bg-brand-gold text-[8px] font-bold text-brand-dark px-1.5 py-0.5 rounded-full border-2 border-brand-dark shadow-sm">AI</div>
        </button>
      )}
    </div>
  );
};
