// ShippingAndDelivery.js
import React from 'react';

const ShippingAndDelivery = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto rounded-md shadow-md text-sm md:text-base lg:text-xl">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 text-primary">Shipping and Delivery</h1>
      <p>
        Welcome to the Shipping and Delivery page. Here, you'll find details about our delivery 
        policies, shipping options, and estimated delivery times.
      </p>
      <h2 className="text-xl md:text-2xl font-semibold mt-6">Delivery Policy</h2>
      <p>
        We aim to process and ship all orders within 1-2 business days. Delivery times may vary 
        based on your location and chosen shipping method.
      </p>
      <h2 className="text-xl md:text-2xl font-semibold mt-6">Shipping Options</h2>
      <ul className="list-disc pl-6">
        <li>Standard Shipping: 5-7 business days</li>
        <li>Express Shipping: 2-3 business days</li>
        <li>Overnight Shipping: Next business day</li>
      </ul>
      <h2 className="text-xl md:text-2xll font-semibold mt-6">Tracking Your Order</h2>
      <p>
        Once your order is shipped, we will provide a tracking number via email so you can monitor 
        its progress.
      </p>
      <p className="mt-4">
        For any questions or concerns regarding shipping, please contact us at{' '}
        <a href="mailto:support@devtinder.com" className="text-blue-500 underline">
          support@tinder-dating.rest.com
        </a>.
      </p>
    </div>
  );
};

export default ShippingAndDelivery;
