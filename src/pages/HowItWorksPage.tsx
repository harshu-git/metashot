import { Helmet } from 'react-helmet-async';
import { Upload, Sliders, Settings, Download, Share2, ShieldCheck } from 'lucide-react';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';

export function HowItWorksPage() {
  return (
    <>
      <Helmet>
        <title>{pageMeta.howItWorks.title}</title>
        <meta name="description" content={pageMeta.howItWorks.description} />
      </Helmet>

      <div className="w-full max-w-4xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">How MetaShot Works</h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A simple, private, and fast way to prepare your photos for social media.
            Everything happens right here in your browser.
          </p>
        </div>

        {/* Ad Slot 1 */}
        <AdSlot slot="how-ad-1" size="md" className="mb-12" />

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#333] before:to-transparent">
          {/* Step 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-indigo-500 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              1
            </div>
            <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-6 bg-[#141414] rounded-2xl border border-[#242424]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#222] rounded-xl">
                  <Upload className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Upload Your Photo</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Drag and drop your photo into the converter, or tap to choose from your gallery or camera. Supports JPG, PNG, WEBP, and HEIC.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-indigo-500 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              2
            </div>
            <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-6 bg-[#141414] rounded-2xl border border-[#242424]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#222] rounded-xl">
                  <Sliders className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Edit & Adjust</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Use our mobile-friendly editor to crop with social presets (1:1, 4:5, 9:16), zoom into key areas, and rotate with 1 tap.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-indigo-500 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              3
            </div>
            <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-6 bg-[#141414] rounded-2xl border border-[#242424]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#222] rounded-xl">
                  <Settings className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Process Locally</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Tap "Process Photo". The browser converts the image on your device at maximum visual quality and preserves metadata cleanly.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-indigo-500 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              4
            </div>
            <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-6 bg-[#141414] rounded-2xl border border-[#242424]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#222] rounded-xl">
                  <Download className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Download or Share</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Preview your processed photo, check file specs, and save directly to your phone or share straight to Instagram with 1 tap.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-indigo-500 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              5
            </div>
            <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-6 bg-[#141414] rounded-2xl border border-[#242424]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#222] rounded-xl">
                  <Share2 className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Post to Instagram</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Upload your perfectly formatted photo to Instagram without any quality degradation or loss of metadata.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Callout */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-center">
          <ShieldCheck className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">100% On-Device Processing</h2>
          <p className="text-zinc-300 text-sm max-w-xl mx-auto leading-relaxed">
            Unlike other online file converters, MetaShot never uploads your photos to any remote server. 
            All operations use your browser's local processing power.
          </p>
        </div>
        
        {/* Ad Slot 2 */}
        <div className="mt-12">
          <AdSlot slot="how-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default HowItWorksPage;
