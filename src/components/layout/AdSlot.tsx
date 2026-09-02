import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'banner';
  format?: '728x90' | '160x300';
}

export function AdSlot({ slot, className = '', format }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // If format is not explicitly passed, alternate based on slot name
  const activeFormat: '728x90' | '160x300' = format || (slot.includes('bottom') || slot.includes('2') ? '160x300' : '728x90');

  const adConfig = activeFormat === '728x90' 
    ? {
        key: '44b5f1ef0534d69302a90ee2da766910',
        height: 90,
        width: 728,
        maxWidth: '728px',
      }
    : {
        key: '9e374bd0a7f8d76f2bd8f1236483cd4b',
        height: 300,
        width: 160,
        maxWidth: '160px',
      };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const adIframe = document.createElement('iframe');
    adIframe.style.width = '100%';
    adIframe.style.height = `${adConfig.height}px`;
    adIframe.style.maxWidth = adConfig.maxWidth;
    adIframe.style.border = 'none';
    adIframe.style.overflow = 'hidden';
    adIframe.scrolling = 'no';

    const adHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : '${adConfig.key}',
              'format' : 'iframe',
              'height' : ${adConfig.height},
              'width' : ${adConfig.width},
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//www.highrevenueformat.com/${adConfig.key}/invoke.js"></script>
        </body>
      </html>
    `;

    container.appendChild(adIframe);
    
    const doc = adIframe.contentWindow?.document || adIframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(adHtml);
      doc.close();
    }
  }, [activeFormat, adConfig.height, adConfig.key, adConfig.maxWidth, adConfig.width]);

  return (
    <div className={`w-full max-w-4xl mx-auto my-4 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold mb-1 select-none">
        Advertisement
      </span>
      <div
        ref={containerRef}
        data-ad-slot={slot}
        style={{ minHeight: `${adConfig.height}px` }}
        className="w-full flex items-center justify-center bg-[#111]/30 rounded-lg overflow-hidden"
      />
    </div>
  );
}
