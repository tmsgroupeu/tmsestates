/* NEW FILE: src/app/[locale]/privacy-policy/page.tsx */
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0A2342] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
        
        {/* Header */}
        <div className="border-b border-gray-100 pb-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#0A2342] mb-2">
                Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 font-medium">
                Last updated: 01 December 2025
            </p>
        </div>

        {/* Content - Prose for clean typography */}
        <div className="prose prose-slate max-w-none prose-headings:font-montserrat prose-headings:font-bold prose-headings:text-[#0A2342] prose-p:text-gray-600 prose-li:text-gray-600">
            
            <p>
                TMS ESTATES LTD respects your privacy and is committed to protecting your personal data in accordance with Regulation (EU) 2016/679 (GDPR) and the laws of the Republic of Cyprus.
            </p>

            <h3>Data Controller</h3>
            <p>
                TMS ESTATES LTD is the data controller responsible for processing your personal data.
            </p>

            <h3>Personal Data We Collect</h3>
            <p>
                We may collect your name, email address, telephone number, property preferences, enquiry details, IP address, and basic technical data through cookies.
            </p>

            <h3>Purposes of Processing</h3>
            <p>
                Personal data is processed to respond to enquiries, provide real estate services, communicate with clients, improve website functionality, and comply with legal obligations.
            </p>

            <h3>Legal Basis</h3>
            <p>
                Processing is based on consent, contractual necessity, legal obligations, or legitimate interests in accordance with GDPR.
            </p>

            <h3>Data Retention & Sharing & Transfers</h3>
            <p>
                Personal data is retained only for as long as necessary for the purposes collected or as required by law. We do not sell personal data. Data may be shared with professional advisors, IT providers, or authorities where legally required. Personal data is not transferred outside the EEA unless appropriate safeguards are in place.
            </p>

            <h3>Your Rights</h3>
            <p>
                You have rights of access, rectification, erasure, restriction, portability, objection, and withdrawal of consent.
            </p>

            <h3>Complaints</h3>
            <p>
                You may lodge a complaint with the Office of the Commissioner for Personal Data Protection of Cyprus.
            </p>

            <h3>Cookies</h3>
            <p>
                Cookies are used to enhance website functionality. You may control cookies through your browser settings.
            </p>

            <h3>Data Security</h3>
            <p>
                Appropriate technical and organisational measures are implemented to protect personal data.
            </p>

            <h3>Policy Updates</h3>
            <p>
                This Privacy Policy may be updated at any time. Continued use of the website constitutes acceptance of any changes.
            </p>

            <h3>Geographical Notice</h3>
            <p>
                We do not operate, advertise, or provide services in the occupied areas of the Republic of Cyprus.
            </p>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-8 not-prose">
                <h4 className="font-bold text-[#0A2342] mb-2">Submission of a Complaint</h4>
                <p className="text-sm text-gray-600 mb-4">
                    If you feel that your concerns in regard to the use of your personal data or any of your data protection rights have not been addressed by us, you have the right to contact us.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li><strong>Email:</strong> info@tmsestates.com</li>
                    <li><strong>Address:</strong> Onisilou 4, Lordos Kantara BLD BLC A, 4532 Limassol, Cyprus</li>
                </ul>
                <p className="text-xs text-gray-500">
                    You also have the right to submit a complaint with the Personal Data Protection Commissioner’s Office: <a href="http://www.dataprotection.gov.cy" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">http://www.dataprotection.gov.cy</a>
                </p>
            </div>

        </div>
      </div>
    </main>
  );
}