import React from 'react';

const CancellAndRefund = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto  rounded-md shadow-md text-sm md:text-base lg:text-xl">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-6 text-primary text-center">Cancellation and Refund Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          This policy outlines the terms and conditions for cancelling your premium membership with DevTinder 
          and requesting a refund. Please read it carefully before purchasing a subscription.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Cancellation Policy</h2>
        <p>
          You can cancel your premium membership at any time through your account settings. Upon cancellation:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            Your premium features will remain active until the end of the current billing cycle.
          </li>
          <li>
            You will not be charged for the next billing cycle.
          </li>
          <li>
            Cancellation does not entitle you to a refund for the remaining period of your subscription.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Refund Policy</h2>
        <p>
          Refunds are provided under the following circumstances:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            If you experience technical issues preventing access to premium features, and our support team cannot resolve them within a reasonable time frame.
          </li>
          <li>
            If you accidentally purchased a subscription and contact us within 48 hours of the transaction.
          </li>
        </ul>
        <p>
          Refunds are not provided in the following cases:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>If you change your mind after purchasing the premium membership.</li>
          <li>If you do not use the premium features during your subscription period.</li>
          <li>If your account is terminated for violating our <a href="/terms-and-conditions" className="text-blue-600 underline">Terms and Conditions</a>.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">How to Request a Refund</h2>
        <p>
          To request a refund, please contact our support team by email at <a href="mailto:support@devtinder.com" className="text-blue-600 underline">support@devtinder.com</a> within the applicable time frame. Include:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Your account username or registered email address.</li>
          <li>The reason for the refund request.</li>
          <li>Any relevant transaction details (e.g., receipt or transaction ID).</li>
        </ul>
        <p>
          Our team will review your request and notify you of the outcome within 7 business days.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Processing of Refunds</h2>
        <p>
          Approved refunds will be processed back to your original payment method within 5-10 business days, depending on your payment provider.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl md:text-2xl  font-semibold mb-4">Changes to This Policy</h2>
        <p>
          DevTinder reserves the right to update this cancellation and refund policy at any time. 
          Any changes will be communicated through the app or via email. Continued use of the premium membership constitutes acceptance of the updated policy.
        </p>
      </section>
    </div>
  );
};

export default CancellAndRefund;
