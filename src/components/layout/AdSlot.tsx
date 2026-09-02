import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'banner';
  format?: '300x250' | '320x50' | '728x90' | '468x60' | '160x300' | '160x600';
}

export function AdSlot({ slot, className = '', format }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-distribute ad formats across different slots & screen sizes
  const getFormat = (): '300x250' | '320x50' | '728x90' | '468x60' | '160x300' | '160x600' => {
    if (format) return format;
    if (slot.includes('bottom') || slot.includes('banner')) return '300x250';
    if (slot.includes('top') || slot.includes('hero')) return '320x50';
    if (slot.includes('skyscraper')) return '160x600';
    if (slot.includes('side')) return '160x300';
    return '300x250';
  };

  const activeFormat = getFormat();

  const adConfigMap = {
    '300x250': {
      key: '2237ead7c4ba76c870ec7fa042b7ee4e',
      height: 250,
      width: 300,
      maxWidth: '300px',
    },
    '320x50': {
      key: '2bcfc1008a1a30ed615a52ba44428110',
      height: 50,
      width: 320,
      maxWidth: '320px',
    },
    '728x90': {
      key: '44b5f1ef0534d69302a90ee2da766910',
      height: 90,
      width: 728,
      maxWidth: '728px',
    },
    '468x60': {
      key: 'f9d9a1fa162816ae3fa5f04241c284f5',
      height: 60,
      width: 468,
      maxWidth: '468px',
    },
    '160x300': {
      key: '9e374bd0a7f8d76f2bd8f1236483cd4b',
      height: 300,
      width: 160,
      maxWidth: '160px',
    },
    '160x600': {
      key: '3b690f9a35d3cd686616883fbf16ab99',
      height: 600,
      width: 160,
      maxWidth: '160px',
    },
  };

  const adConfig = adConfigMap[activeFormat];

  const adHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions={'key':'${adConfig.key}','format':'iframe','height':${adConfig.height},'width':${adConfig.width},'params':{}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/${adConfig.key}/invoke.js"></script></body></html>`;

  return (
    <div className={`w-full max-w-4xl mx-auto my-3 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold mb-1 select-none">
        Advertisement
      </span>
      <div
        ref={containerRef}
        data-ad-slot={slot}
        style={{ minHeight: `${adConfig.height}px`, width: '100%', maxWidth: adConfig.maxWidth }}
        className="flex items-center justify-center bg-[#111]/30 rounded-lg overflow-hidden"
      >
        <iframe
          title={`ad-${slot}`}
          srcDoc={adHtml}
          style={{
            width: '100%',
            height: `${adConfig.height}px`,
            maxWidth: adConfig.maxWidth,
            border: 'none',
            overflow: 'hidden',
          }}
          scrolling="no"
        />
      </div>
    </div>
  );
}
