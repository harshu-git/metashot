import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { Upload, Shield, Monitor, Lock, Crop, Download, Zap, Smartphone, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { AdSlot } from '@/components/layout/AdSlot';
import { pageMeta } from '@/seo/metadata';

export function HomePage() {
  const faqItems = [
    {
      question: "What does MetaShot do?",
      answer: "MetaShot is a browser-based photo processing tool that helps you prepare images for Instagram. It provides crop, resize, rotate, and quality adjustment features, all processed locally on your device."
    },
    {
      question: "Are my photos uploaded to a server?",
      answer: "No. MetaShot processes all images directly in your browser. Your photos are never uploaded to our servers. Everything happens locally on your device."
    },
    {
      question: "Does MetaShot belong to Ray-Ban or Meta?",
      answer: "No. MetaShot is an independent third-party project and is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc., Ray-Ban, or Instagram."
    },
    {
      question: "Do I need an account?",
      answer: "No. MetaShot is completely free to use and does not require any account or registration."
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

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-28 flex flex-col items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />
        
        <div className="z-10 max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
            Make Your Photos <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Meta-Ready</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
            Prepare your photos for Instagram with our fast, browser-based image processing tool.
          </p>
          
          <Link to="/converter" className="mb-10">
            <Button size="lg" icon={<Upload className="w-5 h-5" />} className="h-13 px-8 text-base font-semibold shadow-xl shadow-indigo-600/30">
              Upload Photo
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>No account required</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-indigo-400" />
              <span>Browser-based processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>Your photos stay on your device</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot 1 */}
      <div className="px-4">
        <AdSlot slot="home-ad-1" size="md" />
      </div>

      {/* How It Works Section */}
      <section className="py-16 px-4 w-full bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141414] border border-[#242424] rounded-2xl p-6 sm:p-8 flex flex-col items-start relative overflow-hidden group hover:border-[#333] transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-zinc-500 font-mono text-xs mb-2">Step 1</span>
              <h3 className="text-xl font-semibold text-white mb-3">Upload</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">Select a photo from your device or camera. Supports JPG, PNG, WEBP, and HEIC.</p>
            </div>

            <div className="bg-[#141414] border border-[#242424] rounded-2xl p-6 sm:p-8 flex flex-col items-start relative overflow-hidden group hover:border-[#333] transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                <Crop className="w-6 h-6" />
              </div>
              <span className="text-zinc-500 font-mono text-xs mb-2">Step 2</span>
              <h3 className="text-xl font-semibold text-white mb-3">Edit</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">Crop, zoom, rotate, and adjust quality to get your photo looking exactly right.</p>
            </div>

            <div className="bg-[#141414] border border-[#242424] rounded-2xl p-6 sm:p-8 flex flex-col items-start relative overflow-hidden group hover:border-[#333] transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                <Download className="w-6 h-6" />
              </div>
              <span className="text-zinc-500 font-mono text-xs mb-2">Step 3</span>
              <h3 className="text-xl font-semibold text-white mb-3">Download</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">Get your high-quality processed photo ready for Instagram instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 w-full bg-[#0e0e0e]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">Why MetaShot</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-6 rounded-2xl border border-[#242424] bg-[#141414]">
              <div className="shrink-0 mt-1">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Processing happens instantly in your browser. No waiting for uploads or server queues.</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-6 rounded-2xl border border-[#242424] bg-[#141414]">
              <div className="shrink-0 mt-1">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Privacy First</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Your photos never leave your device. We respect your privacy and don't store your images.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-2xl border border-[#242424] bg-[#141414]">
              <div className="shrink-0 mt-1">
                <Smartphone className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Works Everywhere</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Optimized for mobile phones, tablets, and desktops. Access our tools anytime, anywhere.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-2xl border border-[#242424] bg-[#141414]">
              <div className="shrink-0 mt-1">
                <ImageIcon className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">High Quality</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Preserve maximum image sharpness with configurable settings tailored for social uploads.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 px-4 w-full">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
          <Accordion items={faqItems} />
          <div className="mt-8 text-center">
            <Link to="/faq" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors">
              Read all FAQs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Slot 2 */}
      <div className="px-4 pb-12">
        <AdSlot slot="home-ad-2" size="banner" />
      </div>
    </>
  );
}

export default HomePage;
