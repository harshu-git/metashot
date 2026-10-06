import { useState } from 'react';
import { Sparkles, Camera, CheckCircle2, Layers, Cpu, Maximize2 } from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';

export function HeroMotionShowcase() {
  const [activeChip, setActiveChip] = useState<string>('exif');

  return (
    <div className="relative w-full max-w-3xl mx-auto my-8 sm:my-12 px-2 select-none">
      {/* 3D Motion Stage Wrapper */}
      <TiltCard 
        className="rounded-3xl shadow-2xl p-1 bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent" 
        tiltMaxAngle={9} 
        glareOpacity={0.2}
      >
        <div className="relative rounded-[22px] glass-panel overflow-hidden border border-white/[0.1] bg-[#0c0c14]/80 p-5 sm:p-8 backdrop-blur-2xl">
          
          {/* Ambient Inner Glowing Lighting */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
          
          {/* Top HUD Telemetry Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] relative z-10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold tracking-wide">3:4 STORY ENGINE</span>
              <span className="text-zinc-500">•</span>
              <span className="text-indigo-400 hidden sm:inline">LOCAL HARDWARE PIPELINE</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold">
                12MP 3024×4032
              </span>
            </div>
          </div>

          {/* Central Holographic Spatial Graphic */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center relative z-10">
            
            {/* Visual Viewport with Optical Reticle */}
            <div className="md:col-span-7 relative flex items-center justify-center min-h-[260px] sm:min-h-[300px] rounded-2xl bg-gradient-to-br from-[#12121e] to-[#0a0a10] border border-white/[0.08] overflow-hidden group">
              
              {/* Dynamic Optical Grid Background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.4) 0%, transparent 60%),
                                    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
                  backgroundSize: '100% 100%, 32px 32px, 32px 32px'
                }}
              />

              {/* Holographic 3:4 Story Framing Target with Animated Scanning Laser */}
              <div className="relative w-40 sm:w-48 h-52 sm:h-64 rounded-xl border-2 border-indigo-400/60 shadow-2xl shadow-indigo-500/20 flex flex-col items-center justify-between p-3 overflow-hidden bg-indigo-950/20 backdrop-blur-sm transition-transform group-hover:scale-105 duration-300">
                
                {/* Vertical Laser Scanline */}
                <div 
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-bounce pointer-events-none"
                  style={{ animationDuration: '2.5s' }}
                />

                {/* Corner Rule of Thirds Crosshairs */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/60" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/60" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/60" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/60" />

                {/* Aperture Center Ring */}
                <div className="my-auto relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-dashed border-indigo-400/50 animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="w-10 h-10 rounded-full border border-pink-400/40 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                  <Camera className="w-5 h-5 text-indigo-300 absolute" />
                </div>

                {/* Story Aspect Label */}
                <div className="w-full flex items-center justify-between text-[10px] font-mono text-zinc-300 px-1">
                  <span>RATIO: 3:4</span>
                  <span className="text-emerald-400 font-semibold">STORY MATCH</span>
                </div>
              </div>

              {/* Floating Holographic Parallax Badges */}
              <div className="absolute top-3 right-3 glass-pill px-2.5 py-1 rounded-lg border border-white/[0.1] text-[10px] font-mono text-pink-300 flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3 h-3 text-pink-400" />
                <span>EXIF INJECTOR</span>
              </div>
              <div className="absolute bottom-3 left-3 glass-pill px-2.5 py-1 rounded-lg border border-white/[0.1] text-[10px] font-mono text-indigo-300 flex items-center gap-1.5 shadow-lg">
                <Maximize2 className="w-3 h-3 text-indigo-400" />
                <span>3024 × 4032 NATIVE</span>
              </div>
            </div>

            {/* Interactive Feature Telemetry Panel */}
            <div className="md:col-span-5 flex flex-col gap-3">
              
              <div 
                onClick={() => setActiveChip('exif')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  activeChip === 'exif' 
                    ? 'bg-indigo-500/15 border-indigo-500/40 shadow-lg shadow-indigo-500/10' 
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-sm font-bold text-white">Full Optical EXIF Profile</h4>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  Injects f/2.2, 2.2mm focal length, and Meta camera tags so Instagram unlocks authentic story capabilities.
                </p>
              </div>

              <div 
                onClick={() => setActiveChip('spinview')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  activeChip === 'spinview' 
                    ? 'bg-purple-500/15 border-purple-500/40 shadow-lg shadow-purple-500/10' 
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <h4 className="text-sm font-bold text-white">SpinView Depth Tags</h4>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  Embeds authentic hardware motion metadata for Meta ecosystem compatibility.
                </p>
              </div>

              <div 
                onClick={() => setActiveChip('local')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  activeChip === 'local' 
                    ? 'bg-emerald-500/15 border-emerald-500/40 shadow-lg shadow-emerald-500/10' 
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">Client-Side Canvas Engine</h4>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  Zero server roundtrips. Maximum privacy and instantaneous rendering right in your browser.
                </p>
              </div>

            </div>
          </div>

          {/* Bottom Interactive Hint */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
              Hover or tilt to inspect spatial depth
            </span>
            <span className="hidden sm:inline text-zinc-400">
              GPU-Accelerated 3D Transform
            </span>
          </div>

        </div>
      </TiltCard>
    </div>
  );
}

export default HeroMotionShowcase;
