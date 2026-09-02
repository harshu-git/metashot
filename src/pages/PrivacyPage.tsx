import { Helmet } from 'react-helmet-async';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';

export function PrivacyPage() {
  const lastUpdated = "September 2, 2026";

  return (
    <>
      <Helmet>
        <title>{pageMeta.privacy.title}</title>
        <meta name="description" content={pageMeta.privacy.description} />
      </Helmet>

      <div className="w-full max-w-3xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight text-center">Privacy Policy</h1>
        <p className="text-zinc-500 mb-8 text-center text-sm">Last updated: {lastUpdated}</p>
        
        {/* Ad Slot 1 */}
        <AdSlot slot="privacy-ad-1" size="md" className="mb-10" />

        <div className="space-y-8 text-zinc-400 text-sm sm:text-base leading-relaxed">
          <section className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-3">1. Overview</h2>
            <p>
              At MetaShot, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our browser-based photo processing tool. Our core philosophy is that your photos belong to you, which is why we built our service to process images locally on your device.
            </p>
          </section>

          <section className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-3">2. Image Processing & Storage</h2>
            <p className="font-medium text-white mb-2">
              All image processing is performed locally in your web browser. Your photos are not uploaded to, stored on, or transmitted to our servers.
            </p>
            <p>
              When you use MetaShot to edit, crop, or process a photo, the files remain entirely on your device. Once you close the browser tab or refresh the page, any processed data in memory is cleared. We have no access to the images you process.
            </p>
          </section>

          <section className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-3">3. Data Collection</h2>
            <p className="mb-3">
              Because MetaShot is a client-side application, we do not require user accounts, registrations, or personal information to use the service.
            </p>
            <p>We do not collect:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2 text-zinc-300">
              <li>Names, email addresses, or contact information</li>
              <li>Your uploaded photos or processed images</li>
              <li>Metadata extracted from your images</li>
            </ul>
          </section>

          <section className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-3">4. Analytics & Ads</h2>
            <p className="mb-3">
              To improve our service, we may use basic, anonymized analytics to understand general metrics such as page visits and feature usage. These analytics never involve your photos or personal identifiers.
            </p>
            <p>
              To keep MetaShot free, we may display advertisements provided by third-party networks (such as Google AdSense). These third parties may use cookies according to standard industry privacy practices.
            </p>
          </section>
        </div>

        {/* Ad Slot 2 */}
        <div className="mt-10">
          <AdSlot slot="privacy-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default PrivacyPage;
