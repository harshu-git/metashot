import { Helmet } from 'react-helmet-async';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';
import { FileText, AlertTriangle, ShieldCheck, Scale } from 'lucide-react';

export function TermsPage() {
  const lastUpdated = "September 2, 2026";

  return (
    <>
      <Helmet>
        <title>{pageMeta.terms.title}</title>
        <meta name="description" content={pageMeta.terms.description} />
      </Helmet>

      <div className="relative w-full max-w-4xl mx-auto py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-zinc-500 text-xs font-mono">Last updated: {lastUpdated}</p>
        </div>
        
        {/* Ad Slot 1 */}
        <AdSlot slot="terms-ad-1" size="md" className="mb-12" />

        <div className="space-y-6 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          <section className="glass-panel rounded-3xl border border-white/[0.08] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>1. Acceptance of Terms</span>
            </h2>
            <p>
              By accessing and using MetaShot ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the Service immediately.
            </p>
          </section>

          <section className="glass-panel rounded-3xl border border-white/[0.08] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span>2. Service Description & User Rights</span>
            </h2>
            <p className="mb-3">
              MetaShot provides client-side photo framing, cropping, and EXIF metadata injection tools. The service operates locally in your browser and is provided free of charge.
            </p>
            <p>
              <strong>You retain 100% ownership and copyright of any photos you process.</strong> MetaShot does not claim ownership or license rights over any uploaded or converted content.
            </p>
          </section>

          <section className="glass-panel rounded-3xl border border-white/[0.08] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>3. Independent Project & Third-Party Disclaimer</span>
            </h2>
            <div className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-zinc-300 text-xs sm:text-sm mb-4 leading-relaxed">
              MetaShot is an independent third-party project created by Harsh Shrimali. It is <strong>NOT</strong> affiliated with, sponsored by, or endorsed by Meta Platforms, Inc., Ray-Ban, EssilorLuxottica, Instagram, or any of their affiliates.
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              The service is provided on an "as-is" and "as-available" basis. While we strive to maintain compatibility with Instagram Stories, third-party platform policies and algorithms may change without notice.
            </p>
          </section>
        </div>

        {/* Ad Slot 2 */}
        <div className="mt-14 max-w-3xl mx-auto">
          <AdSlot slot="terms-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default TermsPage;
