export interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = 'Injecting Ray-Ban Meta metadata...' }: LoadingOverlayProps) {
  return (
    <div 
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#09090b]/85 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 animate-in fade-in"
      role="status"
      aria-live="polite"
    >
      {/* Inspira Glowing Concentric Indicator */}
      <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping opacity-30" />
        <div className="absolute inset-1 rounded-full border-2 border-indigo-500/30 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-2 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 opacity-80 blur-xs" />
      </div>

      <p className="text-white text-base sm:text-lg font-semibold tracking-tight mb-1 text-center">
        {message}
      </p>
      <p className="text-zinc-400 text-xs sm:text-sm font-medium">
        Preserving ultra-sharp 12MP resolution locally
      </p>
    </div>
  );
}
