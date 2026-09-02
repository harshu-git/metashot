import { useState } from 'react';
import { Download, Plus, Share2, Check, Glasses, CheckCircle2 } from 'lucide-react';
import type { ProcessedImage } from '../../types';
import { Button } from '../ui/Button';

interface ResultViewProps {
  processedImage: ProcessedImage;
  onCreateAnother: () => void;
}

export function ResultView({ processedImage, onCreateAnother }: ResultViewProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = processedImage.url;
    a.download = processedImage.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleShareToInstagram = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        const file = new File([processedImage.blob], processedImage.filename, { type: 'image/jpeg' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Ray-Ban Meta Story',
            text: 'Captured with Ray-Ban Meta',
          });
          setShared(true);
          setTimeout(() => setShared(false), 3000);
          return;
        }
      } catch (err) {
        // User dismissed share sheet or cancelled
        return;
      }
    }
    if (typeof navigator === 'undefined' || !navigator.share) {
      alert('Direct sharing is supported on mobile browsers. Please open this page on your phone (Chrome/Safari) to share directly to Instagram Stories.');
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6 items-center">
      {/* Header Badge */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Glasses className="w-4 h-4" />
          Meta Photo Generated
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Your Meta photo is ready!</h2>
        <p className="text-zinc-400 text-xs sm:text-sm">
          Share directly to <strong>Instagram Stories</strong> to activate the glasses mode.
        </p>
      </div>
      
      {/* Photo Preview */}
      <div className="w-full max-w-xl bg-[#121212] p-3 sm:p-4 rounded-2xl border border-[#262626] shadow-2xl">
        <img 
          src={processedImage.url} 
          alt="Processed result" 
          className="w-full max-h-[380px] sm:max-h-[460px] object-contain rounded-xl bg-black/40"
        />
      </div>

      {/* Direct Story Action Callout */}
      <div className="w-full max-w-xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-indigo-950/40 rounded-2xl p-4 sm:p-5 border border-pink-500/30 shadow-xl text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-pink-400 font-semibold text-sm">
          <Glasses className="w-5 h-5" />
          <span>Post Directly to Instagram Stories</span>
        </div>
        <p className="text-zinc-300 text-xs sm:text-sm">
          Tap below to open your phone's share menu, then select <strong>Instagram Stories</strong> to post with the glasses feature active!
        </p>
        
        {/* Main Share Button */}
        <button
          type="button"
          onClick={handleShareToInstagram}
          className="w-full h-13 flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-base shadow-xl shadow-purple-600/30 active:scale-[0.98] transition-all"
        >
          <Share2 className="w-5 h-5" />
          {shared ? 'Opening Share Menu...' : 'Share Directly to Instagram Stories'}
        </button>
      </div>

      {/* Embedded Metadata Verification Card */}
      <div className="w-full max-w-xl bg-[#141414] rounded-2xl p-4 border border-[#222] shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-[#222] pb-2.5">
          <span className="text-xs font-semibold text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Embedded Hardware Profile
          </span>
          <span className="text-[11px] font-mono text-indigo-400 font-medium">
            {processedImage.profileName || 'Ray-Ban Meta'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-[#1c1c1c] rounded-lg p-2 text-center">
            <div className="text-[10px] text-zinc-500 uppercase">Device</div>
            <div className="text-xs font-medium text-zinc-200 truncate">Ray-Ban Meta 2</div>
          </div>
          <div className="bg-[#1c1c1c] rounded-lg p-2 text-center">
            <div className="text-[10px] text-zinc-500 uppercase">Make Tag</div>
            <div className="text-xs font-medium text-zinc-200 truncate">Meta AI</div>
          </div>
          <div className="bg-[#1c1c1c] rounded-lg p-2 text-center">
            <div className="text-[10px] text-zinc-500 uppercase">Sensor</div>
            <div className="text-xs font-medium text-emerald-400">12MP Ultra-wide</div>
          </div>
          <div className="bg-[#1c1c1c] rounded-lg p-2 text-center">
            <div className="text-[10px] text-zinc-500 uppercase">Spin View</div>
            <div className="text-xs font-medium text-emerald-400">Active</div>
          </div>
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3">
        <Button 
          variant="secondary" 
          size="md" 
          onClick={handleDownload} 
          icon={downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          className="flex-1 h-11 rounded-xl text-zinc-300"
        >
          {downloaded ? 'Saved to Device!' : 'Save Backup to Device'}
        </Button>

        <Button 
          variant="secondary" 
          size="md" 
          onClick={onCreateAnother} 
          icon={<Plus className="w-4 h-4" />}
          className="flex-1 h-11 rounded-xl text-zinc-300"
        >
          Convert Another Photo
        </Button>
      </div>
    </div>
  );
}
