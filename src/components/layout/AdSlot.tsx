interface AdSlotProps {
  slot: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'banner';
}

export function AdSlot({ slot, className = '', size = 'md' }: AdSlotProps) {
  const sizeClasses: Record<string, string> = {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-32',
    banner: 'h-[250px]',
  };

  return (
    <div className={`w-full max-w-4xl mx-auto my-4 ${className}`}>
      <div
        className={`w-full ${sizeClasses[size]} bg-[#111]/50 border border-dashed border-[#2a2a2a] rounded-lg flex items-center justify-center`}
        data-ad-slot={slot}
      >
        <span className="text-zinc-600 text-xs uppercase tracking-widest font-medium select-none">
          Advertisement
        </span>

        {/* Replace this block with your AdSense or ad network code:
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        */}
      </div>
    </div>
  );
}
