import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { Upload, Shield, Monitor, Lock, Crop, Download, Zap, Smartphone, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { AdSlot } from '@/components/layout/AdSlot';
import { pageMeta } from '@/seo/metadata';

export function HomePage() {
  const faqItems = [
    {
      question: "What does MetaShot do?",
      answer: "MetaShot is a browser-based photo processing tool that helps you prepare images for Instagram. It provides crop, resize, rotate, and quality adjustment features, all processed locally on your device with Ray-Ban Meta hardware metadata."
    },
    {
      question: "Are my photos uploaded to a server?",
      answer: "No. MetaShot processes all images directly in your browser using local canvas and metadata engines. Your photos are never uploaded to any external server. Everything happens on your device."
    },
    {
      question: "Does MetaShot belong to Ray-Ban or Meta?",
      answer: "No. MetaShot is an independent project built by Harsh Shrimali and is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc., Ray-Ban, or Instagram."
    },
    {
      question: "Do I need an account or subscription?",
      answer: "No. MetaShot is completely free to use and does not require any account, sign-in, or payment."
    }
  ];

  return (
    <>
      <Helmet>
        <title>{pageMeta.home.title}</title>
        <meta name="description" content={pageMeta.home.description} />
        <meta name="keywords" content={pageMeta.home.keywords} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "MetaShot",
              "url": "https://metashot.app",
              "description": "${pageMeta.home.description}",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0"
              }
            }
          `}
        </script>
      </Helmet>

      {/* Hero Section with Inspira Ambient Radial Glow */}
      <section className="relative w-full py-16 sm:py-24 md:py-32 flex flex-col items-center text-center px-4 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] sm:h-[450px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/3 w-[300px] sm:w-[400px] h-[300px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        <div className="z-10 max-w-4xl flex flex-col items-center">
          {/* Luminous Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-white/[0.14] text-xs font-semibold uppercase tracking-wider mb-8 text-zinc-300 shadow-xl shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">MetaShot</span>
            <span className="text-zinc-500">•</span>
            <span className="text-indigo-400 font-medium">Built by Harsh Shrimali</span>
          </div>

          {/* Inspira Gradient Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-3xl leading-[1.1]">
            Make Your Photos <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Meta-Ready</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            Format your images for Instagram Stories with 3:4 framing and authentic Ray-Ban Meta lens metadata. Fast, secure, and processed 100% in your browser.
          </p>
          
          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link to="/converter">
              <Button 
                variant="glow" 
                size="lg" 
                icon={<Upload className="w-5 h-5" />} 
                className="h-14 px-8 text-base font-semibold shadow-2xl shadow-indigo-600/30 rounded-2xl group"
              >
                <span>Upload Photo Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button 
                variant="secondary" 
                size="lg" 
                className="h-14 px-7 text-base font-medium rounded-2xl text-zinc-300 hover:text-white"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-white/[0.1] shadow-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>No sign-up needed</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-white/[0.1] shadow-sm">
              <Monitor className="w-4 h-4 text-indigo-400" />
              <span>100% In-browser</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-white/[0.1] shadow-sm">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>Zero server uploads</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot 1 */}
      <div className="max-w-5xl mx-auto px-4 my-4">
        <AdSlot slot="home-ad-1" size="md" />
      </div>

      {/* How It Works - Inspira Interactive Cards */}
      <section className="py-16 sm:py-20 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2 block">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Three Simple Steps
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              No software installations or accounts required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="glass-panel-interactive rounded-3xl p-7 flex flex-col items-start relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold mb-2">Step 01</span>
              <h3 className="text-xl font-bold text-white mb-2">Select Your Photo</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Choose any photo from your phone gallery or desktop. Supports JPG, PNG, WEBP, and Apple HEIC formats.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-panel-interactive rounded-3xl p-7 flex flex-col items-start relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Crop className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-semibold mb-2">Step 02</span>
              <h3 className="text-xl font-bold text-white mb-2">Adjust Framing</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Use the 3:4 Ray-Ban Meta preset, zoom in on your subject, and rotate as desired with touch-friendly sliders.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-panel-interactive rounded-3xl p-7 flex flex-col items-start relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-2">Step 03</span>
              <h3 className="text-xl font-bold text-white mb-2">Share to Stories</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Post directly to Instagram Stories with 1 tap or save the full-resolution file with verified Meta camera tags.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Inspira Ambient Glass */}
      <section className="py-16 sm:py-20 px-4 w-full bg-[#070709]/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2 block">
              Performance & Privacy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Creators Use MetaShot
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel-interactive rounded-3xl p-7 flex gap-5 border border-white/[0.09]">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Instant In-Browser Processing</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Metadata injection and canvas rendering execute directly in your browser with zero latency or upload wait times.
                </p>
              </div>
            </div>
            
            <div className="glass-panel-interactive rounded-3xl p-7 flex gap-5 border border-white/[0.09]">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Complete Privacy Guarantee</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Your photos are never stored, logged, or sent across the network. All pixels and EXIF bytes remain on your device.
                </p>
              </div>
            </div>

            <div className="glass-panel-interactive rounded-3xl p-7 flex gap-5 border border-white/[0.09]">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Engineered for Mobile</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Seamlessly integrates with iOS Safari and Android Chrome native Web Share sheets for 1-tap Instagram Stories posting.
                </p>
              </div>
            </div>

            <div className="glass-panel-interactive rounded-3xl p-7 flex gap-5 border border-white/[0.09]">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Native 12MP Ultra-Sharp Export</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Export at 3024 × 4032 native Ray-Ban Meta resolution with customizable JPEG compression quality up to 100%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-16 sm:py-24 px-4 w-full">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2 block">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion items={faqItems} />

          <div className="mt-10 text-center">
            <Link 
              to="/faq" 
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors"
            >
              <span>Explore all answers in our FAQ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Slot 2 */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <AdSlot slot="home-ad-2" size="banner" />
      </div>
    </>
  );
}

export default HomePage;
