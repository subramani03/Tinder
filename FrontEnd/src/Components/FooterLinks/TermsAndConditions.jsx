import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto rounded-md shadow-md text-sm md:text-base lg:text-xl">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-6 text-primary text-center">Terms and Conditions</h1>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          Welcome to DevTinder, a platform designed to connect developers worldwide. By accessing or using our
          app, you agree to comply with these Terms and Conditions. Please read them carefully before using our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Eligibility</h2>
        <p>
          To use DevTinder, you must:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Be at least 18 years old or the age of majority in your jurisdiction.</li>
          <li>Not be prohibited from using our services under applicable laws.</li>
          <li>Create an account using accurate, complete, and truthful information.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Account Responsibilities</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You agree to notify us immediately of any unauthorized access or use of your account.</li>
          <li>You are solely responsible for all activities conducted under your account.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">User Conduct</h2>
        <p>When using DevTinder, you agree to:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Use the platform only for lawful purposes.</li>
          <li>Respect the privacy and boundaries of other users.</li>
          <li>Not engage in harassment, abuse, or offensive behavior.</li>
          <li>Not share or post any harmful, defamatory, or illegal content.</li>
          <li>Not use the platform to solicit personal, financial, or sensitive information from other users.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Prohibited Activities</h2>
        <p>
          You agree not to engage in any activity that disrupts or interferes with the platform's functionality or security, including:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Using bots, scripts, or automated tools to access the platform.</li>
          <li>Reverse engineering, modifying, or hacking the platform.</li>
          <li>Uploading viruses, malware, or other harmful code.</li>
          <li>Creating fake accounts or impersonating others.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Content Ownership</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            Any content you post, such as your profile, messages, or images, remains your property. 
            However, you grant us a non-exclusive, royalty-free license to use it for operating and promoting the platform.
          </li>
          <li>
            You represent that you own or have the right to share any content you post and that it does not infringe the rights of others.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account at any time if you violate these Terms and Conditions or for any other reason at our sole discretion.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p>
          DevTinder is provided "as is" without any warranties, express or implied. We are not responsible for:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Disputes, damages, or issues arising between users.</li>
          <li>Unauthorized access to or alteration of your account or data.</li>
          <li>Any direct, indirect, or consequential damages resulting from your use of the platform.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms and Conditions at any time. Any changes will be communicated via the app or email. 
          Continued use of the platform after changes are implemented constitutes your acceptance of the updated Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Governing Law</h2>
        <p>
          These Terms and Conditions are governed by the laws of [Your Country/State], without regard to its conflict of law principles.
        </p>
      </section>

    </div>
  );
};

export default TermsAndConditions;
