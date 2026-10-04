import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Copy, Check, Clock, Send } from 'lucide-react';
import { pageMeta } from '@/seo/metadata';
import { AdSlot } from '@/components/layout/AdSlot';

export function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = "harshumeta@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <Helmet>
        <title>{pageMeta.contact.title}</title>
        <meta name="description" content={pageMeta.contact.description} />
      </Helmet>

      <div className="relative w-full max-w-4xl mx-auto py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Contact the Developer
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Have a question, feedback, or a suggestion for MetaShot? Reach out directly to Harsh Shrimali.
          </p>
        </div>

        {/* Ad Slot 1 */}
        <AdSlot slot="contact-ad-1" size="md" className="mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-3xl mx-auto">
          {/* Email Support Card with One-Tap Copy */}
          <div className="glass-panel rounded-3xl border border-white/[0.08] p-7 sm:p-8 flex flex-col items-center text-center shadow-xl hover:border-white/[0.14] transition-colors relative group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
              <Mail className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Direct Email</h2>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              For bug reports, technical inquiries, and general questions.
            </p>

            <div className="w-full flex items-center gap-2 bg-white/[0.03] p-2 rounded-2xl border border-white/[0.06]">
              <a 
                href={`mailto:${email}`} 
                className="flex-1 truncate text-xs sm:text-sm font-mono text-indigo-400 hover:text-indigo-300 font-semibold text-left px-2"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white transition-all active:scale-95 shrink-0"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-xs text-emerald-400 font-medium mt-2 animate-in fade-in">
                Copied to clipboard!
              </span>
            )}
          </div>

          {/* Feedback & Feature Requests Card */}
          <div className="glass-panel rounded-3xl border border-white/[0.08] p-7 sm:p-8 flex flex-col items-center text-center shadow-xl hover:border-white/[0.14] transition-colors relative group">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Feedback & Ideas</h2>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Want a new camera preset, format, or feature added to MetaShot?
            </p>
            
            <a
              href={`mailto:${email}?subject=MetaShot%20Feature%20Suggestion`}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.08] text-sm font-semibold transition-all active:scale-[0.98]"
            >
              <Send className="w-4 h-4 text-purple-400" />
              <span>Send Feature Idea</span>
            </a>
          </div>
        </div>

        {/* SLA / Notice Banner */}
        <div className="max-w-3xl mx-auto glass-panel rounded-2xl border border-white/[0.06] p-5 text-center flex items-center justify-center gap-2.5 text-zinc-400 text-xs sm:text-sm">
          <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Independent developer project • Replies typically sent within 24 to 48 hours.</span>
        </div>
        
        {/* Ad Slot 2 */}
        <div className="mt-12 max-w-3xl mx-auto">
          <AdSlot slot="contact-ad-2" size="banner" />
        </div>
      </div>
    </>
  );
}

export default ContactPage;
