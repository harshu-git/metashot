import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare } from 'lucide-react';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>{pageMeta.contact.title}</title>
        <meta name="description" content={pageMeta.contact.description} />
      </Helmet>

      <div className="w-full max-w-3xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">Contact Us</h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            We'd love to hear from you. Get in touch with the MetaShot team.
          </p>
        </div>

        {/* Ad Slot 1 */}
        <AdSlot slot="contact-ad-1" size="md" className="mb-10" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-5">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Email Support</h2>
            <p className="text-zinc-400 text-sm mb-5">For general inquiries, feature requests, or technical issues.</p>
            <a 
              href="mailto:harshumeta@gmail.com" 
              className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors"
            >
              harshumeta@gmail.com
            </a>
          </div>

          <div className="bg-[#141414] rounded-2xl border border-[#242424] p-6 sm:p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#222] flex items-center justify-center text-zinc-300 mb-5">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Feedback</h2>
            <p className="text-zinc-400 text-sm mb-5">Have an idea to make MetaShot better? We are always looking to improve.</p>
            <span className="text-zinc-500 text-xs">
              Send an email with "Feedback" in the subject line.
            </span>
          </div>
        </div>

        <div className="bg-[#141414] rounded-2xl border border-[#242424] p-6 text-center">
          <p className="text-zinc-400 text-xs sm:text-sm">
            Please note: As an independent project, we strive to respond within 24–48 hours. Thank you!
          </p>
        </div>
        
        {/* Ad Slot 2 */}
        <div className="mt-10">
          <AdSlot slot="contact-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default ContactPage;
