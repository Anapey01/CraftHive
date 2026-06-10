'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Footer from '@/components/ui/Footer';

import { Mail, Phone, MapPin, ArrowRight, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { sendContactEmail } from '@/lib/EmailAction';


export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const formData = new FormData(event.currentTarget);
    
    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage(result.message || 'Message sent successfully!');
        event.currentTarget.reset(); 
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      
      // Clear status messages after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 5000);
    }
  }

  return (
    <section id="contact" 
    className="relative min-h-screen bg-[#000] overflow-hidden px-6 py-16 md:py-20 md:px-16 border-t border-white/5">

      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-[#cd1d0b] font-body text-xs tracking-[0.25em] uppercase mb-3">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#fff] leading-[0.95]">
            Start with an artwork.
            <br />
            <em>Leave with a statement.</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-12 items-start">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-display text-2xl text-[#ce1a06] mb-4">Visit the Studio</h3>
              <p className="font-body text-[#cdcec6] leading-relaxed">
                Our studio is open by appointment. We invite you to bring your artwork in person for a hands-on consultation.
              </p>
            </div>

            {[
              { icon: MapPin, label: 'Location', value: 'Tuba Road, Weija Tollbooth, Accra' },
              { icon: Phone, label: 'Phone', value: '0244699121 / 0206564018' },
              { icon: Mail, label: 'Email', value: 'crafthiveghana@gmail.com' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c31b07]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon size={16} className="text-[#c31b07]" />
                </div>
                <div>
                  <p className="font-body text-ivory-dim/50 text-xs tracking-widest uppercase mb-0.5">{item.label}</p>
                  <p className="font-body text-ivory text-sm">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-white/[0.07]">
              <p className="font-body text-ivory-dim/40 text-xs tracking-widest uppercase mb-4">Studio Hours</p>
              <div className="space-y-2 font-body text-sm text-ivory-dim">
                <p>Mon – Fri &nbsp;&nbsp;8:00am – 5:00pm</p>
                <p>Saturday &nbsp;10:00am – 3:00pm</p>
                <p className="text-ivory-dim/40">Sunday — Closed</p>
              </div>
            </div>
          </motion.div>
          
          {/* Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-3xl p-8"
            encType="multipart/form-data"
          >
            <h3 className="font-display text-2xl text-[#cd1d0b] mb-5">
              Send an Enquiry
            </h3>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500 shrink-0" />
                <p className="font-body text-green-500 text-sm">{statusMessage}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                <XCircle size={20} className="text-red-500 shrink-0" />
                <p className="font-body text-red-500 text-sm">{statusMessage}</p>
              </div>
            )}

            <div className="space-y-4">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                disabled={isSubmitting}
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-2xl px-4 py-3 font-body text-ivory text-sm placeholder:text-ivory-dim/30 focus:outline-none focus:border-gold/40 transition-colors disabled:opacity-50"
                placeholder="Full Name *"
              />

              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                required
                disabled={isSubmitting}
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-2xl px-4 py-4 font-body text-ivory text-sm placeholder:text-ivory-dim/30 focus:outline-none focus:border-gold/40 transition-colors disabled:opacity-50"
                placeholder="Phone Number *"
              />

              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                disabled={isSubmitting}
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-2xl px-4 py-4 font-body text-ivory text-sm placeholder:text-ivory-dim/30 focus:outline-none focus:border-gold/40 transition-colors disabled:opacity-50"
                placeholder="Email Address *"
              />

              <div>
                <label htmlFor="attachment" className="font-body text-ivory-dim/50 text-xs tracking-widest uppercase mb-2 block">
                  Upload Artwork (Optional, max 5MB)
                </label>
                <input
                  id="attachment"
                  type="file"
                  name="attachment"
                  accept="image/*,.pdf,.doc,.docx"
                  disabled={isSubmitting}
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-2xl px-4 py-3 font-body text-ivory-dim text-sm focus:outline-none focus:border-gold/40 transition-colors disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#cd1d0b]/20 file:text-[#cd1d0b] hover:file:bg-[#cd1d0b]/30 cursor-pointer"
                />
              </div>

              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                disabled={isSubmitting}
                rows={5}
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-2xl px-4 py-4 font-body text-ivory text-sm placeholder:text-ivory-dim/30 focus:outline-none focus:border-gold/40 transition-colors min-h-[150px] resize-none disabled:opacity-50"
                placeholder="Tell us about your artwork, framing requirements, restoration project, or any enquiry you have... *"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#671b12] text-white font-body text-sm tracking-widest uppercase font-semibold hover:bg-[#170604]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Enquiry
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

            <p className="font-body text-ivory-dim/30 text-xs text-center mt-4">
              File uploads are optional (max 5MB). We typically respond within 24 hours.
            </p>
          </motion.form>
        </div>
      </div>
       <Footer />
    </section>
   
  );
}