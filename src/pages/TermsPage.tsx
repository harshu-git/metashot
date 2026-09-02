import { Helmet } from 'react-helmet-async';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';

export function TermsPage() {
  const lastUpdated = "September 2, 2026";

  return (
    <>
      <Helmet>
        <title>{pageMeta.terms.title}</title>
        <meta name="description" content={pageMeta.terms.description} />
      </Helmet>

      <div className="w-full max-w-3xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight text-center">Terms of Service</h1>
        <p className="text-zinc-500 mb-8 text-center text-sm">Last updated: {lastUpdated}</p>
        
        {/* Ad Slot 1 */}
        <AdSlot slot="terms-ad-1" size="md" className="mb-10" />

        <div className="space-y-8 text-zinc-400 text-sm sm:text-base leading-relaxed">
          <section className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using MetaShot ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree, please do not use this service.
            </p>
          </section>

          <section className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-3">2. Service Description</h2>
            <p>
              MetaShot provides a browser-based photo processing tool designed to format and optimize images. The Service is provided free of charge, supported by advertisements, and requires no account registration.
            </p>
          </section>

          <section className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
            <p className="mb-2">
              You retain all rights to any images you process using MetaShot. By using the Service, you agree:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300">
              <li>You have the legal right to process the images you use with our tool.</li>
              <li>You will not use the Service for any illegal or unauthorized purpose.</li>
            </ul>
          </section>

          <section className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Disclaimer & Warranties</h2>
            <div className="p-4 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl text-zinc-300 text-xs sm:text-sm mb-3">
              MetaShot is an independent third-party project and is NOT affiliated with, endorsed by, or sponsored by Meta Platforms, Inc., Ray-Ban, Instagram, or any other third-party service.
            </div>
            <p>
              The Service is provided on an "as is" and "as available" basis without warranties of any kind.
            </p>
          </section>
        </div>

        {/* Ad Slot 2 */}
        <div className="mt-10">
          <AdSlot slot="terms-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default TermsPage;
