import { Helmet } from 'react-helmet-async';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';
import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';

export function PrivacyPage() {
  const lastUpdated = "September 2, 2026";

  return (
    <>
      <Helmet>
        <title>{pageMeta.privacy.title}</title>
        <meta name="description" content={pageMeta.privacy.description} />
      </Helmet>

      <div className="relative w-full max-w-4xl mx-auto py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Guaranteed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 text-xs font-mono">Last updated: {lastUpdated}</p>
        </div>
        
        {/* Ad Slot 1 */}
        <AdSlot slot="privacy-ad-1" size="md" className="mb-12" />

        <div className="space-y-6 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          {/* Key Principle Banner */}
          <div className="glass-panel rounded-3xl border border-emerald-500/35 p-6 sm:p-8 bg-emerald-950/20 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-3 text-emerald-400">
              <ServerOff className="w-6 h-6 shrink-0" />
              <h2 className="text-lg font-bold text-white">100% Client-Side Processing Architecture</h2>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed">
              MetaShot is engineered entirely as a client-side web application. When you upload, crop, or process images, every calculation is executed locally inside your device's web browser. <strong>Your photos are never transmitted to or stored on any server.</strong>
            </p>
          </div>

          <section className="glass-panel rounded-3xl border border-white/[0.1] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" />
              <span>1. Overview</span>
            </h2>
            <p>
              At MetaShot, we consider privacy a fundamental requirement, not an afterthought. This Privacy Policy explains our practices. Because our processing occurs locally, we do not have access to your personal files, camera photos, or location data.
            </p>
          </section>

          <section className="glass-panel rounded-3xl border border-white/[0.1] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-purple-400" />
              <span>2. Zero Personal Data Collection</span>
            </h2>
            <p className="mb-4">
              MetaShot requires no registration, account creation, or login credentials. We explicitly do not collect or log:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-sm">
              <li>Names, email addresses, phone numbers, or passwords</li>
              <li>Your uploaded photos, cropped versions, or exported files</li>
              <li>EXIF or location metadata extracted from your images</li>
              <li>Social media credentials or tokens</li>
            </ul>
          </section>

          <section className="glass-panel rounded-3xl border border-white/[0.1] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span>3. Analytics & Advertisements</span>
            </h2>
            <p className="mb-4">
              To understand general performance and keep MetaShot completely free, we use lightweight anonymized traffic metrics (such as page visits). These metrics never track your photos or identity.
            </p>
            <p>
              Advertisements displayed on the site help fund hosting and maintenance. Third-party advertising partners may place standard anonymous cookies in accordance with standard browser privacy controls.
            </p>
          </section>
        </div>

        {/* Ad Slot 2 */}
        <div className="mt-14 max-w-3xl mx-auto">
          <AdSlot slot="privacy-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default PrivacyPage;
