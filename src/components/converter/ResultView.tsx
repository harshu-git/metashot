import { useState } from 'react';
import { Download, Plus, Share2, Check, Glasses, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import type { ProcessedImage } from '../../types';
import { Button } from '../ui/Button';
import { TiltCard } from '../ui/TiltCard';

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
      {/* Inspira Celebration Header */}
      <div className="text-center space-y-3 max-w-lg">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider shadow-xl shadow-emerald-500/10">
          <Glasses className="w-4 h-4" />
          <span>Meta Photo Ready</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Ready for <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Instagram Stories</span>
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm">
          Hardware tags injected. Post directly to Stories to unlock the glasses indicator.
        </p>
      </div>
      
      {/* Framed Image Preview with 3D Spatial Tilt */}
      <TiltCard className="w-full max-w-xl rounded-3xl" tiltMaxAngle={7} glareOpacity={0.15}>
        <div className="w-full glass-panel p-3.5 sm:p-5 rounded-3xl border border-white/[0.12] shadow-2xl relative overflow-hidden group">
          <div className="relative overflow-hidden rounded-2xl bg-[#070709]">
            <img 
              src={processedImage.url} 
              alt="Processed result with Meta EXIF tags" 
              className="w-full max-h-[380px] sm:max-h-[460px] object-contain rounded-2xl mx-auto"
            />
          </div>
        </div>
      </TiltCard>

      {/* Direct Story Action Callout Card */}
      <div className="w-full max-w-xl glass-panel relative rounded-3xl p-6 sm:p-7 border border-pink-500/40 bg-gradient-to-br from-pink-950/35 via-purple-950/25 to-[#070709]/70 shadow-2xl text-center space-y-4 overflow-hidden backdrop-blur-2xl">
        <div className="flex items-center justify-center gap-2 text-pink-400 font-semibold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Instant Instagram Story Sharing</span>
        </div>
        <p className="text-zinc-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Tap below to open your phone's share menu, then select <strong>Instagram Stories</strong> to post with camera tags active!
        </p>
        
        {/* Main Share Button with Gradient & Spring Response */}
        <button
          type="button"
          onClick={handleShareToInstagram}
          className="w-full h-14 flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-base shadow-xl shadow-purple-600/30 active:scale-[0.98] transition-all cursor-pointer border border-white/20 animate-shimmer"
        >
          <Share2 className="w-5 h-5" />
          <span>{shared ? 'Opening Share Menu...' : 'Share Directly to Instagram Stories'}</span>
        </button>
      </div>

      {/* Embedded Metadata Verification Card */}
      <div className="w-full max-w-xl glass-panel rounded-3xl p-6 border border-white/[0.1] shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <span className="text-xs font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Verified Hardware Metadata
          </span>
          <span className="text-[11px] font-mono text-indigo-400 font-medium glass-pill px-2.5 py-0.5 rounded-full border border-indigo-500/25">
            {processedImage.profileName || 'Ray-Ban Meta Gen 2'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="glass-card-subtle rounded-2xl p-3 text-center border border-white/[0.08]">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Device</div>
            <div className="text-xs font-semibold text-zinc-200 truncate mt-0.5">Ray-Ban Meta 2</div>
          </div>
          <div className="glass-card-subtle rounded-2xl p-3 text-center border border-white/[0.08]">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Make Tag</div>
            <div className="text-xs font-semibold text-zinc-200 truncate mt-0.5">Meta AI</div>
          </div>
          <div className="glass-card-subtle rounded-2xl p-3 text-center border border-white/[0.08]">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Sensor</div>
            <div className="text-xs font-semibold text-emerald-400 mt-0.5">12MP Ultra-wide</div>
          </div>
          <div className="glass-card-subtle rounded-2xl p-3 text-center border border-white/[0.08]">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Spin View</div>
            <div className="text-xs font-semibold text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-zinc-400 glass-pill py-1.5 px-3 rounded-full mx-auto w-fit border border-white/[0.06]">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Processed 100% locally in your browser • Zero server uploads</span>
        </div>
      </div>

      {/* Secondary Action Buttons */}
      <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3 pt-1">
        <Button 
          variant="secondary" 
          size="lg" 
          onClick={handleDownload} 
          icon={downloaded ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
          className="flex-1 h-12 rounded-2xl text-zinc-200 font-medium"
        >
          {downloaded ? 'Saved to Device!' : 'Save Backup to Device'}
        </Button>

        <Button 
          variant="glow" 
          size="lg" 
          onClick={onCreateAnother} 
          icon={<Plus className="w-4 h-4" />}
          className="flex-1 h-12 rounded-2xl font-medium"
        >
          Convert Another Photo
        </Button>
      </div>
    </div>
  );
}

export default ResultView;
