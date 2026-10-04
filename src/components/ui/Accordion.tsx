import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first item open for instant value

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        
        return (
          <div 
            key={index} 
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen 
                ? 'bg-[#15151c] border-indigo-500/35 shadow-lg shadow-indigo-500/5' 
                : 'bg-[#111116] border-white/[0.08] hover:border-white/15 hover:bg-[#141419]'
            }`}
          >
            <button
              type="button"
              className="w-full px-5 sm:px-6 py-4.5 flex items-center justify-between text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-inset gap-4 min-h-[48px]"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span className={`font-semibold text-sm sm:text-base transition-colors ${isOpen ? 'text-white' : 'text-zinc-300'}`}>
                {item.question}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-250 ${
                isOpen ? 'bg-indigo-500/15 text-indigo-400 rotate-180' : 'bg-white/[0.04] text-zinc-400'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            
            {/* CSS Grid Zero-Jank Animation */}
            <div 
              className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-white/[0.04]">
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
