import { Helmet } from 'react-helmet-async';
import { Info, Shield, Target, Sparkles, Heart } from 'lucide-react';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';
import { TiltCard } from '@/components/ui/TiltCard';

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>{pageMeta.about.title}</title>
        <meta name="description" content={pageMeta.about.description} />
      </Helmet>

      <div className="relative w-full max-w-4xl mx-auto py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            About MetaShot
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            A free, client-side utility built by Harsh Shrimali to give creators seamless Ray-Ban Meta formatting and privacy-first image processing.
          </p>
        </div>

        {/* Ad Slot 1 */}
        <AdSlot slot="about-ad-1" size="md" className="mb-12" />
        
        <div className="space-y-8">
          {/* Main Story Card with 3D Tilt */}
          <TiltCard className="rounded-3xl" tiltMaxAngle={6} glareOpacity={0.15}>
            <div className="glass-panel rounded-3xl border border-white/[0.1] p-7 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Info className="w-5 h-5" />
                </div>
                <span>What is MetaShot?</span>
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
                MetaShot is an open, browser-based media utility designed to help mobile and desktop users format photos for Instagram Stories. It simulates the 3:4 framing, aspect ratio, and hardware camera metadata of Ray-Ban Meta Smart Glasses.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                We engineered MetaShot because creators shouldn't need expensive gear or clunky desktop editors just to test out or publish camera tags on Instagram. Everything works cleanly right inside your web browser.
              </p>
            </div>
          </TiltCard>

          {/* Mission and Privacy Grid with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TiltCard className="rounded-3xl h-full" tiltMaxAngle={7} glareOpacity={0.12}>
              <div className="glass-panel-interactive rounded-3xl border border-white/[0.1] p-7 sm:p-8 backdrop-blur-2xl h-full">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  To build lightweight, accessible web utilities that respect user privacy. We believe helpful tools should be fast, transparent, and work directly on user hardware without subscriptions or paywalls.
                </p>
              </div>
            </TiltCard>
            
            <TiltCard className="rounded-3xl h-full" tiltMaxAngle={7} glareOpacity={0.12}>
              <div className="glass-panel-interactive rounded-3xl border border-white/[0.1] p-7 sm:p-8 backdrop-blur-2xl h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Zero-Server Privacy</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  By leveraging modern HTML5 Canvas and client-side binary EXIF injectors, MetaShot keeps your photos entirely on your device. No images are uploaded, analyzed, or stored on remote servers.
                </p>
              </div>
            </TiltCard>
          </div>

          {/* Creator Attribution Card with 3D Tilt */}
          <TiltCard className="rounded-3xl" tiltMaxAngle={5} glareOpacity={0.1}>
            <div className="glass-panel rounded-3xl border border-white/[0.1] p-6 sm:p-8 text-center flex flex-col items-center justify-center backdrop-blur-2xl">
              <div className="inline-flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400/20" />
                <span>Created with care</span>
              </div>
              <p className="text-zinc-300 text-sm">
                Designed and developed by <strong className="text-white">Harsh Shrimali</strong>.
              </p>
            </div>
          </TiltCard>

          {/* Legal Disclaimer */}
          <div className="p-6 rounded-2xl glass-card-subtle border border-white/[0.08] text-center">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Independent Project Disclaimer</h2>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-2xl mx-auto">
              MetaShot is an independent third-party project. It is not affiliated with, endorsed by, sponsored by, or connected to Meta Platforms, Inc., Ray-Ban, EssilorLuxottica, Instagram, or any of their respective subsidiaries or affiliates. All trademarks, service marks, trade names, and product names belong to their respective owners.
            </p>
          </div>
        </div>

        {/* Ad Slot 2 */}
        <div className="mt-12">
          <AdSlot slot="about-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default AboutPage;
