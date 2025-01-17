import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto rounded-md shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-primary text-center">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          Welcome to DevTinder, a platform designed to connect developers with like-minded individuals. 
          Your privacy is important to us, and this policy explains how we collect, use, and protect your personal information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
          <b>Account Information :</b> When you sign up, we collect your name, email address, username, and profile details (e.g., skills, programming languages, bio).
          </li>
          <li>
          <b>Location Data :</b> We collect your approximate location to enhance match accuracy and provide localized services.
          </li>
          <li>
            <b>Usage Data :</b> Information about your activity on the app, including matches, chats, and interactions.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>To provide personalized match suggestions based on your preferences and profile.</li>
          <li>To improve our services, troubleshoot issues, and enhance user experience.</li>
          <li>To ensure user safety and detect fraudulent or unauthorized activities.</li>
          <li>To send notifications, updates, and promotional content (you can opt-out anytime).</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
        <p>
          We respect your privacy and only share your information under the following circumstances:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            With other users, as part of the app functionality (e.g., sharing your profile with matches).
          </li>
          <li>
            With service providers, to improve our app (e.g., hosting, analytics).
          </li>
          <li>
            To comply with legal obligations, such as responding to subpoenas or court orders.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
        <p>
          We retain your data as long as your account is active or as needed to provide our services. 
          If you delete your account, we may retain certain information for legal or compliance purposes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Access your data and request corrections or updates.</li>
          <li>Delete your account and request the removal of personal data.</li>
          <li>Opt-out of receiving promotional communications.</li>
          <li>Restrict or object to the processing of your data in certain circumstances.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Security</h2>
        <p>
          We use industry-standard security measures to protect your data from unauthorized access, loss, or misuse. 
          However, no method of transmission over the Internet or electronic storage is 100% secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
        <p>
          Our app may contain links to third-party websites or services. 
          We are not responsible for the privacy practices or content of these external sites.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time to reflect changes in our practices. 
          You will be notified of significant changes through the app or email.
        </p>
      </section>

    </div>
  );
};

export default PrivacyPolicy;
