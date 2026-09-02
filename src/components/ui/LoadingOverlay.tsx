import { Loader2 } from 'lucide-react';

export interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = 'Processing your photo...' }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm rounded-xl">
      <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
      <p className="text-white text-lg font-medium mb-1">{message}</p>
      <p className="text-zinc-500 text-sm">This may take a moment</p>
    </div>
  );
}
