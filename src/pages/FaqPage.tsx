import { Helmet } from 'react-helmet-async';
import { Accordion } from '@/components/ui/Accordion';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';

export function FaqPage() {
  const faqItems = [
    {
      question: "What does MetaShot do?",
      answer: "MetaShot is a browser-based photo processing tool that helps you prepare images for Instagram. It provides crop, resize, rotate, and quality adjustment features, all processed locally on your device."
    },
    {
      question: "Are my photos uploaded to a server?",
      answer: "No. MetaShot processes all images directly in your browser. Your photos are never uploaded to our servers. Everything happens locally on your device, ensuring maximum privacy and speed."
    },
    {
      question: "Does this work with Instagram?",
      answer: "MetaShot processes your photos and prepares them for sharing. However, Instagram's features and behavior can change, and specific platform features are not guaranteed by MetaShot. We simply provide tools to format your images effectively."
    },
    {
      question: "Do I need an account?",
      answer: "No. MetaShot is completely free to use and does not require any account or registration. Just open the website and start editing."
    },
    {
      question: "Does MetaShot belong to Ray-Ban or Meta?",
      answer: "No. MetaShot is an independent third-party project and is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc., Ray-Ban, or Instagram."
    },
    {
      question: "What image formats are supported?",
      answer: "We currently support standard web image formats including JPG, PNG, WEBP, and HEIC (on compatible devices). Your processed images can be exported as JPG, PNG, or WEBP."
    },
    {
      question: "Is MetaShot free?",
      answer: "Yes, MetaShot is completely free to use. The website is supported by advertisements to cover hosting and development costs."
    },
    {
      question: "What happens to my photos after processing?",
      answer: "Nothing. Your photos are processed in your browser and are never stored on any server. Once you close the page or refresh, the processed images are no longer available unless you explicitly downloaded them."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{pageMeta.faq.title}</title>
        <meta name="description" content={pageMeta.faq.description} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="w-full max-w-3xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Find answers to common questions about MetaShot and how it works.
          </p>
        </div>

        {/* Ad Slot 1 */}
        <AdSlot slot="faq-ad-1" size="md" className="mb-8" />
        
        <Accordion items={faqItems} />
        
        <div className="mt-12 p-6 bg-[#141414] rounded-2xl border border-[#242424] text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Still have questions?</h2>
          <p className="text-zinc-400 text-sm mb-4">We're here to help you get the most out of our tools.</p>
          <a href="/contact" className="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 bg-[#222] hover:bg-[#2a2a2a] text-white border border-[#333] px-5 py-2.5 text-sm">
            Contact Us
          </a>
        </div>

        {/* Ad Slot 2 */}
        <div className="mt-12">
          <AdSlot slot="faq-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default FaqPage;
