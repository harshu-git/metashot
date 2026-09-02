import { Helmet } from 'react-helmet-async';
import { Info, Shield, Target } from 'lucide-react';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>{pageMeta.about.title}</title>
        <meta name="description" content={pageMeta.about.description} />
      </Helmet>

      <div className="w-full max-w-3xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight text-center">About MetaShot</h1>

        {/* Ad Slot 1 */}
        <AdSlot slot="about-ad-1" size="md" className="mb-8" />
        
        <div className="space-y-6">
          <div className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white flex items-center gap-3 mb-4">
              <Info className="text-indigo-400 w-5 h-5" />
              What is MetaShot?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4">
              MetaShot is a free, browser-based photo processing tool designed to help users quickly and easily prepare their photos for social media platforms, particularly Instagram. 
            </p>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              We built this tool to solve a common problem: getting the perfect crop, aspect ratio, and formatting for social media without needing to download complex software or sign up for expensive online services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#141414] rounded-2xl border border-[#242424] p-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-3 mb-3">
                <Target className="text-indigo-400 w-5 h-5" />
                Our Mission
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                To provide accessible, high-quality media utilities that respect user privacy by processing everything locally. We believe essential tools should be free, fast, and easy to use.
              </p>
            </div>
            
            <div className="bg-[#141414] rounded-2xl border border-[#242424] p-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-3 mb-3">
                <Shield className="text-indigo-400 w-5 h-5" />
                Privacy First
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                By leveraging modern web technologies, MetaShot processes all images directly within your browser. This means your private photos never leave your device and are never stored on our servers.
              </p>
            </div>
          </div>

          <div className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8 text-center">
            <h2 className="text-lg font-semibold text-white mb-2">Important Disclaimer</h2>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
              MetaShot is an independent third-party project. It is not affiliated with, endorsed by, sponsored by, or connected to Meta Platforms, Inc., Ray-Ban, Instagram, or any of their respective subsidiaries or affiliates. All trademarks, service marks, trade names, product names and logos appearing on the site are the property of their respective owners.
            </p>
          </div>
        </div>

        {/* Ad Slot 2 */}
        <div className="mt-10">
          <AdSlot slot="about-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default AboutPage;
