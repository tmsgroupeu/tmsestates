/* NEW FILE: src/app/[locale]/terms-of-use/page.tsx */
export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-[#0A2342] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
        
        {/* Header */}
        <div className="border-b border-gray-100 pb-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#0A2342] mb-2">
                Terms of Use
            </h1>
            <p className="text-sm text-gray-500 font-medium">
                Legal Disclaimer & Conditions
            </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none prose-headings:font-montserrat prose-headings:font-bold prose-headings:text-[#0A2342] prose-p:text-gray-600">
            
            <p className="font-bold">
                Please Read These Terms Carefully Before Using This Website
            </p>

            <p>
                Welcome to the TMS ESTATES LTD website. This website has been created to provide visitors with access to information regarding properties, listings, land for sale or rent, and other real estate related content that may be of interest. The site may also include information about TMS ESTATES LTD, its services, and its professional activities within Cyprus.
            </p>
            <p>
                By accessing or using any part of this website, you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Use. If you do not agree with any part of these terms, you must discontinue use of this website immediately.
            </p>

            <h3>Copyright Notice</h3>
            <p>
                All content available on this website, including text, images, graphics, design elements, layout, and structure, is protected by Cyprus, European Union, and international copyright laws.
            </p>
            <p>
                You may view, download, or print materials from this website solely for personal, non-commercial use. Any copies must retain the copyright notice of TMS ESTATES LTD. No ownership rights are transferred.
                Unauthorised copying, reproduction, modification, distribution, publication, scraping, or commercial use of this website content is strictly prohibited without prior written consent.
            </p>

            <h3>Trademarks</h3>
            <p>
                All trademarks, logos, and service marks displayed on this website are the property of TMS ESTATES LTD or their respective owners and may not be used without written permission.
            </p>

            <h3>Links to Third-Party Websites</h3>
            <p>
                This website may contain links to external websites. TMS ESTATES LTD has no control over such websites and accepts no responsibility for their content, accuracy, or privacy practices. Accessing third-party websites is at your own risk.
            </p>

            <h3>Disclaimer</h3>
            <p>
                All information on this website is provided on an “as is” and “as available” basis. TMS ESTATES LTD makes no warranties regarding accuracy, completeness, or suitability for any purpose.
            </p>

            <h3>Limitation of Liability</h3>
            <p>
                TMS ESTATES LTD shall not be liable for any damage arising from the use or inability to use this website, including indirect or consequential damages, to the fullest extent permitted by law.
            </p>

            <h3>Updates</h3>
            <p>
                TMS ESTATES LTD reserves the right to amend these Terms of Use at any time. Continued use of the website constitutes acceptance of any updated terms.
            </p>

            <h3>Geographical Notice</h3>
            <p>
                TMS ESTATES LTD does not operate, advertise, or provide services in the occupied areas of the Republic of Cyprus.
            </p>

        </div>
      </div>
    </main>
  );
}