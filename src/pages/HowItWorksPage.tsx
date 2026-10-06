import { Helmet } from 'react-helmet-async';
import { Upload, Sliders, Settings, Download, Share2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';
import { Button } from '@/components/ui/Button';
import { TiltCard } from '@/components/ui/TiltCard';

export function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Upload Your Photo",
      desc: "Drag and drop any photo into the converter, or tap to choose from your phone gallery or camera. Supports JPG, PNG, WEBP, and Apple HEIC.",
      icon: Upload,
      accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      num: "02",
      title: "Frame & Crop (3:4)",
      desc: "Apply the standard 3:4 Ray-Ban Meta aspect ratio preset, fine-tune zoom on your focal point, and adjust rotation with single-tap controls.",
      icon: Sliders,
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      num: "03",
      title: "Local Metadata Injection",
      desc: "Tap 'Generate Meta Photo'. The tool processes the canvas in your browser, injecting Ray-Ban Meta Gen 2 EXIF and XMP tags without server round-trips.",
      icon: Settings,
      accent: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    },
    {
      num: "04",
      title: "Direct Instagram Sharing",
      desc: "On mobile, tap 'Share Directly to Instagram Stories' to open your phone's native share sheet. Instagram detects the embedded metadata automatically.",
      icon: Share2,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      num: "05",
      title: "Save High-Res Backup",
      desc: "Download an uncompressed copy at 3024 × 4032 resolution directly to your camera roll for safekeeping or reposting anytime.",
      icon: Download,
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{pageMeta.howItWorks.title}</title>
        <meta name="description" content={pageMeta.howItWorks.description} />
      </Helmet>

      <div className="relative w-full max-w-4xl mx-auto py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2 block">
            Step-by-Step Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            How MetaShot Works
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Fast, secure, and entirely client-side. See how your images are formatted and tagged for Instagram Stories in seconds.
          </p>
        </div>

        {/* Ad Slot 1 */}
        <AdSlot slot="how-ad-1" size="md" className="mb-14" />

        {/* Inspira Timeline */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-5 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500/50 before:via-purple-500/30 before:to-transparent">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 1;

            return (
              <div 
                key={step.num}
                className={`relative flex items-start md:items-center justify-between md:justify-normal group ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Node */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-indigo-400/90 glass-pill bg-white/[0.06] text-indigo-300 font-bold text-xs shadow-xl shadow-indigo-500/25 shrink-0 md:order-1 md:-translate-x-1/2 z-10 transition-transform group-hover:scale-110 backdrop-blur-xl">
                  {step.num}
                </div>

                {/* Content Card with 3D Tilt */}
                <TiltCard 
                  className={`w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] rounded-3xl ${
                    isEven ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                  tiltMaxAngle={7}
                  glareOpacity={0.12}
                >
                  <div className="glass-panel-interactive rounded-3xl p-6 sm:p-7 border border-white/[0.1] h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2.5 rounded-xl border ${step.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-semibold">Step {step.num}</span>
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{step.title}</h2>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* 100% On-Device Privacy Guarantee Callout with 3D Tilt */}
        <TiltCard className="mt-20 rounded-3xl" tiltMaxAngle={5} glareOpacity={0.1}>
          <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-emerald-500/35 bg-emerald-950/20 text-center relative overflow-hidden shadow-2xl backdrop-blur-2xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">100% In-Browser Guarantee</h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6">
              Unlike remote file converters, MetaShot executes entirely inside your device's browser memory. Your personal photos are never transferred, processed, or stored on external servers.
            </p>
            <Link to="/converter">
              <Button variant="glow" size="lg" className="rounded-2xl h-12 px-7">
                <span>Try MetaShot Now</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </TiltCard>
        
        {/* Ad Slot 2 */}
        <div className="mt-14">
          <AdSlot slot="how-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default HowItWorksPage;
