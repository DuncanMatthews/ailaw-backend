import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions for AILawyer.co.za</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using AILawyer.co.za, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
        <p>
          AILawyer.co.za provides AI-powered legal research tools for South African legal professionals. Our services are intended for informational purposes only and do not constitute legal advice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <p>
          You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
        <p>
          The content, features, and functionality of AILawyer.co.za are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
        <p>
          You retain all rights to any content you submit, post, or display on or through AILawyer.co.za. By providing content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content in connection with our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
        <p>You agree not to use AILawyer.co.za:</p>
        <ul className="list-disc list-inside ml-4">
          <li>In any way that violates any applicable law or regulation</li>
          <li>To impersonate or attempt to impersonate the company, an employee, or another user</li>
          <li>To engage in any other conduct that restricts or inhibits anyone&lsquo;s use of the service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
        <p>
          AILawyer.co.za and its services are provided on an &lsquo;as is&lsquo; and &lsquo;as available&lsquo; basis. We make no warranties, expressed or implied, regarding the operation or availability of the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
        <p>
          AILawyer.co.za shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes. Your continued use of AILawyer.co.za after such changes constitutes your acceptance of the new Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
          <br />
          <a href="mailto:terms@ailawyer.co.za" className="text-blue-600 hover:underline">terms@ailawyer.co.za</a>
        </p>
      </section>

      <footer className="text-sm text-gray-600">
        Last updated: {new Date().toDateString()}
      </footer>
    </div>
  );
};

export default TermsAndConditions;