import { Helmet } from 'react-helmet-async';
import { Accordion } from '@/components/ui/Accordion';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';
import { Link } from 'react-router';
import { MessageSquare, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TiltCard } from '@/components/ui/TiltCard';

export function FaqPage() {
  const faqItems = [
    {
      question: "What does MetaShot do?",
      answer: "MetaShot is a browser-based photo processing tool that helps you prepare images for Instagram Stories. It provides 3:4 aspect ratio cropping, resizing, rotation, and JPEG quality adjustment, and injects authentic Ray-Ban Meta hardware EXIF and XMP tags entirely locally on your device."
    },
    {
      question: "Are my photos uploaded to any external server?",
      answer: "No. MetaShot processes all images directly inside your web browser using HTML5 Canvas and client-side binary EXIF manipulation. Your photos are never uploaded, logged, or transmitted over the network."
    },
    {
      question: "How does Instagram detect the photo as Ray-Ban Meta?",
      answer: "MetaShot embeds the exact EXIF and XMP metadata structure created by Ray-Ban Meta smart glasses (including camera make 'Meta AI', model 'Ray-Ban Meta Smart Glasses 2', lens specs, and SpinView tags). When shared directly to Instagram Stories on mobile, Instagram recognizes these native metadata identifiers."
    },
    {
      question: "Do I need to install an app or create an account?",
      answer: "No. MetaShot is 100% web-based and runs in modern browsers on Android, iOS, Windows, and macOS. No account registration, password, or subscription is required."
    },
    {
      question: "Does MetaShot belong to Ray-Ban or Meta?",
      answer: "No. MetaShot is an independent third-party project created by Harsh Shrimali and is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc., Ray-Ban, EssilorLuxottica, or Instagram."
    },
    {
      question: "What image formats can I upload?",
      answer: "We support standard photo formats including JPG, PNG, WEBP, and Apple HEIC (from iPhones and iPads). All outputs are exported as high-resolution JPEGs with complete Meta camera metadata."
    },
    {
      question: "Is MetaShot completely free to use?",
      answer: "Yes, MetaShot is free to use without restrictions. The project is sustained through non-intrusive advertisements that help cover hosting and domain maintenance costs."
    },
    {
      question: "What happens to my images after I close the page?",
      answer: "Once you close the browser tab or refresh, all image data in browser memory is immediately discarded. Nothing is retained."
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

      <div className="relative w-full max-w-4xl mx-auto py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about MetaShot, image privacy, Instagram compatibility, and metadata processing.
          </p>
        </div>

        {/* Ad Slot 1 */}
        <AdSlot slot="faq-ad-1" size="md" className="mb-10" />
        
        {/* Accordion Component */}
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqItems} />
        </div>
        
        {/* Still Have Questions CTA Card with 3D Tilt */}
        <TiltCard className="mt-16 max-w-3xl mx-auto rounded-3xl" tiltMaxAngle={6} glareOpacity={0.12}>
          <div className="p-8 rounded-3xl glass-panel border border-white/[0.1] text-center shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Have a question or feedback?</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              We are continuously improving MetaShot. Get in touch with us directly and we'll reply promptly.
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="md" className="rounded-xl px-6 h-11 text-zinc-200">
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </TiltCard>

        {/* Ad Slot 2 */}
        <div className="mt-14">
          <AdSlot slot="faq-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default FaqPage;
