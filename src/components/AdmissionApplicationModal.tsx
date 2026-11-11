import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  FileText,
  Printer,
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRADES_LIST, INSTITUTE_INFO } from '../data/itiData';

interface AdmissionApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedTradeId?: string;
}

export const AdmissionApplicationModal: React.FC<AdmissionApplicationModalProps> = ({
  isOpen,
  onClose,
  preSelectedTradeId
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    gender: 'Male',
    category: 'ST (Meghalaya)',
    dob: '',
    phone: '',
    email: '',
    district: 'East Khasi Hills',
    address: '',
    qualification: 'Class 10th (SSLC) Pass',
    percentage: '',
    firstChoiceTrade: preSelectedTradeId || 'copa',
    secondChoiceTrade: 'wireman',
    declaration: false
  });

  const [submittedData, setSubmittedData] = useState<{
    applicationNo: string;
    submittedAt: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.dob) {
      alert('Please fill in all mandatory fields (Name, Date of Birth, Phone).');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const appNo = `SOH-CTS-2027-${randomNum}`;
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setSubmittedData({
      applicationNo: appNo,
      submittedAt: dateStr
    });

    // Fire joyful celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const handlePrintSlip = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !submittedData) return;

    const firstTrade = TRADES_LIST.find(t => t.id === formData.firstChoiceTrade)?.name || formData.firstChoiceTrade;
    const secondTrade = TRADES_LIST.find(t => t.id === formData.secondChoiceTrade)?.name || formData.secondChoiceTrade;
    let customLogo: string | null = null;
    try {
      customLogo = localStorage.getItem('iti_sohra_logo_img');
    } catch {
      // ignore
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>ITI Sohra - Application Acknowledgement (${submittedData.applicationNo})</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #1e293b; max-width: 800px; margin: 0 auto; line-height: 1.5; font-size: 14px; }
            .header { text-align: center; border-bottom: 2px solid #004a99; padding-bottom: 12px; margin-bottom: 16px; }
            .gov { font-size: 12px; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; }
            .inst { font-size: 19px; font-weight: bold; color: #004a99; margin: 4px 0; }
            .sub { font-size: 12px; color: #64748b; }
            .app-badge { display: inline-block; background: #eaf0f6; border: 1px solid #004a99; color: #004a99; font-size: 15px; font-weight: bold; padding: 6px 14px; border-radius: 4px; margin: 12px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
            th { background: #f8fafc; font-weight: 600; width: 35%; color: #334155; }
            .checklist { background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 8px; margin-top: 15px; font-size: 13px; }
            .checklist ul { padding-left: 20px; margin: 6px 0 0 0; }
            .footer { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 12px; }
            .stamp { border: 2px dashed #004a99; color: #004a99; padding: 8px 12px; border-radius: 4px; text-align: center; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            ${customLogo ? `<img src="${customLogo}" alt="Logo" style="max-height: 60px; max-width: 120px; object-fit: contain; margin-bottom: 8px;" /><br/>` : ''}
            <div class="gov">Directorate of Employment & Craftsmen Training • Government of Meghalaya</div>
            <div class="inst">GOVERNMENT INDUSTRIAL TRAINING INSTITUTE SOHRA</div>
            <div class="sub">Saitsohpen, Sohra (Cherrapunji), East Khasi Hills - 793108 | itisohra@gmail.com</div>
            <div class="app-badge">Pre-Registration Acknowledgement: ${submittedData.applicationNo}</div>
          </div>

          <p>This acknowledges the preliminary registration for admission into Craftsmen Training Scheme (CTS) for the upcoming academic session at Govt. ITI Sohra.</p>

          <table>
            <tr><th>Application Number</th><td><strong>${submittedData.applicationNo}</strong></td></tr>
            <tr><th>Candidate Name</th><td>${formData.fullName}</td></tr>
            <tr><th>Father / Guardian Name</th><td>${formData.fatherName || 'N/A'}</td></tr>
            <tr><th>Date of Birth & Gender</th><td>${formData.dob} (${formData.gender})</td></tr>
            <tr><th>Community / Category</th><td>${formData.category}</td></tr>
            <tr><th>Contact Phone & Email</th><td>${formData.phone} | ${formData.email || 'N/A'}</td></tr>
            <tr><th>District & Address</th><td>${formData.district}, Meghalaya — ${formData.address || 'Local Resident'}</td></tr>
            <tr><th>Qualifying Exam & Score</th><td>${formData.qualification} (${formData.percentage ? formData.percentage + '%' : 'Awaiting'})</td></tr>
            <tr><th>1st Choice Trade</th><td><strong>${firstTrade}</strong></td></tr>
            <tr><th>2nd Choice Trade</th><td>${secondTrade}</td></tr>
            <tr><th>Submitted On</th><td>${submittedData.submittedAt}</td></tr>
          </table>

          <div class="checklist">
            <strong>Checklist of Documents required for Verification at ITI Sohra:</strong>
            <ul>
              <li>Original Mark Sheet and Pass Certificate of Class 8th / 10th (SSLC)</li>
              <li>Meghalaya ST / SC Caste Certificate issued by competent authority</li>
              <li>Permanent Residential Certificate (PRC) / EPIC / Aadhaar Card</li>
              <li>Four (4) recent Passport-size colour photographs</li>
              <li>Transfer Certificate (TC) or Character Certificate from last attended institution</li>
            </ul>
          </div>

          <div class="footer">
            <div class="stamp">
              ITI SOHRA ADMISSION DESK<br/>
              Preliminary Candidate Copy
            </div>
            <div>
              <strong>Office of the Vice-Principal</strong><br/>
              Govt. ITI Sohra, Meghalaya
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white border border-black/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Modal Top Header */}
        <div className="bg-[#004a99] text-white p-5 flex items-center justify-between border-b-2 border-[#003875]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 flex items-center justify-center text-white rounded-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase">
                Candidate Portal
              </span>
              <h3 className="text-base sm:text-lg font-bold mt-0.5">
                Online Pre-Registration • CTS 2027-28
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {submittedData ? (
            /* Success & Printable Slip View */
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Pre-Registration Submitted Successfully!
                </span>
                <h4 className="text-xl font-bold text-slate-900">
                  Welcome, {formData.fullName}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your registration has been logged with the Govt. ITI Sohra Admissions Desk.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Application Reference No:</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">{submittedData.applicationNo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Primary Trade Applied:</span>
                  <span className="font-semibold text-slate-800">
                    {TRADES_LIST.find(t => t.id === formData.firstChoiceTrade)?.name || formData.firstChoiceTrade}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Candidate Category:</span>
                  <span className="font-semibold text-slate-800">{formData.category}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Registered On:</span>
                  <span className="font-medium text-slate-700">{submittedData.submittedAt}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3.5 rounded-xl text-left text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  Next Steps for Admission:
                </div>
                <p>
                  1. Print this acknowledgement receipt slip using the button below.
                </p>
                <p>
                  2. Bring original marksheets, Meghalaya ST certificate, and 4 passport photos to the ITI Sohra Campus, Saitsohpen during document verification days.
                </p>
                <p>
                  3. You can also track state-wide allotments at <strong>{INSTITUTE_INFO.dectPortalUrl}</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xs bg-[#004a99] hover:bg-[#003875] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print Acknowledgement Slip
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#EAF0F6] border border-[#bcd0e4] rounded-xs p-3 text-xs text-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#004a99] shrink-0 mt-0.5" />
                  <div>
                    <strong>Session 2027-2028 Admissions Open:</strong> Official online admissions facilitated via <strong>idect.in</strong> (Directorate of Employment & Craftsmen Training, Meghalaya).
                  </div>
                </div>
                <a
                  href="https://idect.in"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#004a99] hover:bg-[#003875] text-white font-bold text-xs px-3 py-1.5 rounded-xs shrink-0 inline-flex items-center gap-1 transition-colors self-start sm:self-auto"
                >
                  <span>Go to idect.in</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wanphrang Kharkongor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father's / Guardian's Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bah B. Kharkongor"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth * (Min 14 yrs)
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs sm:text-sm bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Social Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs sm:text-sm bg-white"
                  >
                    <option value="ST (Meghalaya)">ST (Scheduled Tribe - Meghalaya)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="PWD">Person with Disability (PWD)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number * (For SMS Alerts)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="candidate@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Home District
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs sm:text-sm bg-white"
                  >
                    <option value="East Khasi Hills">East Khasi Hills (Sohra, Shillong, Pynursla)</option>
                    <option value="West Khasi Hills">West Khasi Hills (Nongstoin, Mairang)</option>
                    <option value="Eastern West Khasi Hills">Eastern West Khasi Hills</option>
                    <option value="South West Khasi Hills">South West Khasi Hills (Mawkyrwat)</option>
                    <option value="Ri-Bhoi">Ri-Bhoi District</option>
                    <option value="West Jaintia Hills">West Jaintia Hills (Jowai)</option>
                    <option value="East Jaintia Hills">East Jaintia Hills (Khliehriat)</option>
                    <option value="Garo Hills">Garo Hills (West / East / South)</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>
              </div>

              {/* Trade Choices */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Course Selection & Qualifications
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Highest Qualification
                    </label>
                    <select
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs bg-white"
                    >
                      <option value="Class 10th (SSLC) Pass">Class 10th (SSLC / Matric) Pass</option>
                      <option value="Class 8th Pass">Class 8th Pass</option>
                      <option value="Class 12th (HSSLC) Pass">Class 12th (HSSLC) Pass</option>
                      <option value="Graduate / Other">Graduate / Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Percentage / Grade in Qualifying Exam
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 68.5% or First Div"
                      value={formData.percentage}
                      onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      1st Preference Trade *
                    </label>
                    <select
                      value={formData.firstChoiceTrade}
                      onChange={(e) => setFormData({ ...formData, firstChoiceTrade: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-emerald-400 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs font-medium"
                    >
                      {TRADES_LIST.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      2nd Preference Trade
                    </label>
                    <select
                      value={formData.secondChoiceTrade}
                      onChange={(e) => setFormData({ ...formData, secondChoiceTrade: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs"
                    >
                      {TRADES_LIST.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Locality / Village / Town Address in Sohra / Meghalaya
                </label>
                <input
                  type="text"
                  placeholder="e.g. Saitsohpen, Sohra (Cherrapunji) - PIN 793108"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="decl"
                  required
                  checked={formData.declaration}
                  onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                />
                <label htmlFor="decl" className="text-xs text-slate-600 leading-normal">
                  I hereby declare that the information provided is correct to the best of my knowledge. I agree to abide by the rules, uniform code, and discipline of Government ITI Sohra.
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xs bg-[#004a99] hover:bg-[#003875] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
