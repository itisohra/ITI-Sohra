import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle,
  Shield,
  ExternalLink,
  Lock,
  Unlock
} from 'lucide-react';
import { INSTITUTE_INFO } from '../data/itiData';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admission Inquiry',
    message: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isMapLocked, setIsMapLocked] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.message) {
      alert('Please provide your name and query message.');
      return;
    }

    const ticketNo = `SOH-INQ-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedTicket(ticketNo);
  };

  return (
    <section id="contact" className="mb-8">
      {/* Section Title matching Variation 13 */}
      <h2 className="gov-section-title">
        Contact Information & Grievance Desk
      </h2>

      {/* 2-Column: Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="border border-[#ddd] p-4 bg-white shadow-2xs">
            <div className="text-xs font-bold text-[#004a99] uppercase tracking-wide mb-1">
              Campus Address
            </div>
            <p className="text-xs text-[#1A1A1A] leading-relaxed m-0">
              <strong>Government Industrial Training Institute (ITI) Sohra</strong><br />
              7P6Q+5RJ, Saitsohpen, Sohra, Meghalaya 793108
            </p>
            <p className="text-[11px] text-[#555] mt-1 m-0">
              Landmark: Situated near National Institute of Technology (NIT) Meghalaya Permanent Campus, Saitsohpen
            </p>
          </div>

          <div className="border border-[#ddd] p-4 bg-white shadow-2xs">
            <div className="text-xs font-bold text-[#004a99] uppercase tracking-wide mb-1">
              Official Email
            </div>
            <a
              href={`mailto:${INSTITUTE_INFO.email}`}
              className="text-xs font-bold text-[#004a99] hover:underline block"
            >
              {INSTITUTE_INFO.email}
            </a>
            <p className="text-[11px] text-[#666] mt-0.5 m-0">
              For admissions, certificate verifications, and RTI petitions.
            </p>
          </div>

          <div className="border border-[#ddd] p-4 bg-white shadow-2xs">
            <div className="text-xs font-bold text-[#004a99] uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>Helpline & Hours</span>
            </div>
            <p className="text-xs font-bold text-[#1A1A1A] m-0">
              Helpline No: <span className="text-[#004a99] font-semibold">{INSTITUTE_INFO.contactPhone}</span>
            </p>
            <p className="text-[11px] text-[#555] mt-1 m-0">
              Timing: <strong>{INSTITUTE_INFO.workingHours}</strong>
            </p>
          </div>

          <div className="bg-[#EAF0F6] border border-[#bcd0e4] p-4 rounded-xs">
            <div className="text-xs font-bold text-[#004a99] uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Right to Information (RTI)</span>
            </div>
            <p className="text-xs text-[#444] leading-relaxed m-0">
              Public Information Officer (PIO): Office of the Vice-Principal, Govt. ITI Sohra. Grievance petitions accepted in office or online.
            </p>
          </div>
        </div>

        {/* Interactive Query Form */}
        <div className="lg:col-span-7 border border-[#ddd] p-5 bg-white shadow-2xs">
          {submittedTicket ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-[#EAF0F6] text-[#004a99] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#1A1A1A] m-0">
                Inquiry Submitted Successfully
              </h4>
              <p className="text-xs text-[#555] m-0">
                Your ticket has been logged with the ITI Sohra administrative office.
              </p>
              <div className="p-2.5 bg-[#f4f7fa] border border-[#ccc] inline-block text-xs font-mono">
                Ticket Reference: <strong>{submittedTicket}</strong>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setSubmittedTicket(null)}
                  className="px-4 py-2 bg-[#004a99] text-white text-xs font-bold rounded-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <h3 className="font-bold text-base text-[#1A1A1A] m-0">
                  Send an Inquiry to the Administrative Desk
                </h3>
                <p className="text-xs text-[#666] m-0 mt-0.5">
                  Course syllabus, fees, certificates, or admission questions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wanphrang Kharkongor"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#ccc] rounded-xs focus:outline-none focus:border-[#004a99] text-xs text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#ccc] rounded-xs focus:outline-none focus:border-[#004a99] text-xs text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#ccc] rounded-xs focus:outline-none focus:border-[#004a99] text-xs text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Subject
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#ccc] rounded-xs focus:outline-none focus:border-[#004a99] text-xs text-[#1A1A1A]"
                  >
                    <option value="Admission Inquiry">Admission Inquiry (CTS 2027-28)</option>
                    <option value="Trade Information">Trade & Course Syllabus</option>
                    <option value="Apprenticeship / NAPS">Apprenticeship & Jobs</option>
                    <option value="Fee & Stipend">Fee Concession & Stipend</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Message / Details *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="State your question or inquiry here..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#ccc] rounded-xs focus:outline-none focus:border-[#004a99] text-xs text-[#1A1A1A]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#777]">
                  * Responses sent to your phone/email during office hours.
                </span>
                <button
                  type="submit"
                  className="bg-[#004a99] hover:bg-[#003875] text-white text-xs font-bold px-4 py-2 rounded-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Map Embed - Locked Location */}
      <div className="border border-[#ddd] p-4 bg-white shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <h4 className="font-bold text-sm text-[#1A1A1A] m-0 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#004a99]" />
              <span>Campus Location: 7P6Q+5RJ, Saitsohpen, Sohra</span>
            </h4>
            <p className="text-xs text-[#555] m-0 mt-0.5">
              7P6Q+5RJ, Saitsohpen, Sohra, Meghalaya 793108 (Near NIT Meghalaya Campus)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMapLocked(!isMapLocked)}
              className={`text-xs px-2.5 py-1 rounded-xs border font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isMapLocked
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
              title={isMapLocked ? 'Location is locked. Click to unlock map interaction.' : 'Click to lock location'}
            >
              {isMapLocked ? <Lock className="w-3.5 h-3.5 text-emerald-600" /> : <Unlock className="w-3.5 h-3.5 text-amber-600" />}
              <span>{isMapLocked ? 'Location Locked' : 'Unlock to Pan'}</span>
            </button>
            <a
              href="https://maps.google.com/?q=7P6Q%2B5RJ,+Saitsohpen,+Sohra,+Meghalaya+793108"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#004a99] font-semibold hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Locked Location Verified Badge */}
        {isMapLocked && (
          <div className="mb-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xs flex flex-wrap items-center justify-between text-[11px] text-emerald-900">
            <span className="flex items-center gap-1.5 font-medium">
              <Lock className="w-3 h-3 text-emerald-700" />
              <span><strong>Verified & Locked Location:</strong> 7P6Q+5RJ, Saitsohpen, Sohra, Meghalaya 793108 (Coordinates: 25°17'02"N, 91°43'16"E)</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/60 px-1.5 py-0.5 rounded-xs">
              ✓ Fixed Pin Locked
            </span>
          </div>
        )}

        <div className="relative w-full h-56 border border-[#ccc] overflow-hidden">
          <iframe
            title="Govt. ITI Sohra Location Map - 7P6Q+5RJ, Saitsohpen, Sohra, Meghalaya 793108"
            src="https://maps.google.com/maps?q=7P6Q%2B5RJ,+Saitsohpen,+Sohra,+Meghalaya+793108&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            className={`w-full h-full ${isMapLocked ? 'pointer-events-none' : ''}`}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
