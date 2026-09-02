import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'banner';
  format?: '728x90' | '300x250' | 'native';
}

export function AdSlot({ slot, className = '', format = '728x90' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous ad elements on route change / remount
    container.innerHTML = '';

    const adIframe = document.createElement('iframe');
    adIframe.style.width = '100%';
    adIframe.style.height = format === '728x90' ? '90px' : '250px';
    adIframe.style.maxWidth = format === '728x90' ? '728px' : '300px';
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
              'key' : '44b5f1ef0534d69302a90ee2da766910',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//www.highrevenueformat.com/44b5f1ef0534d69302a90ee2da766910/invoke.js"></script>
        </body>
      </html>
    `;

    container.appendChild(adIframe);
    
    // Inject ad doc
    const doc = adIframe.contentWindow?.document || adIframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(adHtml);
      doc.close();
    }
  }, [format]);

  return (
    <div className={`w-full max-w-4xl mx-auto my-4 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold mb-1 select-none">
        Advertisement
      </span>
      <div
        ref={containerRef}
        data-ad-slot={slot}
        className="w-full flex items-center justify-center min-h-[90px] bg-[#111]/30 rounded-lg overflow-hidden"
      />
    </div>
  );
}
