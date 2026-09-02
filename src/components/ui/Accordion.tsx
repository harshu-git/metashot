import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        
        return (
          <div 
            key={index} 
            className={`border-b border-[#1a1a1a] last:border-b-0 transition-colors ${isOpen ? 'bg-[#222]' : ''}`}
          >
            <button
              className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span className="text-white font-medium text-base">{item.question}</span>
              <ChevronDown 
                className={`w-5 h-5 text-zinc-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5 pt-1">
                <p className="text-zinc-400 text-sm leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
