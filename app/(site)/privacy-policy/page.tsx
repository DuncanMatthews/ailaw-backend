import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mt-30 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy for AILawyer.co.za</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p>
          At AILawyer.co.za, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices concerning the collection, use, and disclosure of your data when you use our website and services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Personal information (such as name, email address, and professional details)</li>
          <li>Usage data (such as IP address, browser type, and pages visited)</li>
          <li>Legal research queries and case information you provide</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Provide and improve our AI-powered legal research services</li>
          <li>Communicate with you about our services</li>
          <li>Analyze usage patterns to enhance user experience</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
        <p>
          We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our website and providing our services. These third parties are obligated to keep your information confidential.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Access, correct, or delete your personal information</li>
          <li>Object to or restrict the processing of your data</li>
          <li>Request a copy of your data in a portable format</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;last updated&quot;date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          <a href="mailto:privacy@ailawyer.co.za" className="text-blue-600 hover:underline">privacy@ailawyer.co.za</a>
        </p>
      </section>

      <footer className="text-sm text-gray-600">
        Last updated: {new Date().toDateString()}
      </footer>
    </div>
  );
};

export default PrivacyPolicy;