import React from 'react';

const ContactUs = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="p-10 m-10 bg-base-200 rounded-md shadow-2xl">
        {/* Heading */}
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-6 text-primary">Contact Us</h1>

        {/* Contact Details */}
        <div className="mb-8">
          <p className="text-sm md:text-base lg:text-xl mb-3">You can reach us through:</p>
          <ul className="space-y-4 text-sm md:text-base lg:text-xl ml-5 md:ml-10">
            <li className="flex items-center">
              <span className="mr-2 text-primary">
                <i className="fas fa-envelope"></i>
              </span>
              Email: <a href="mailto:subramanimurugan420@gmail.com" className="text-blue-500 underline ml-2">subramanimurugan420@gmail.com</a>
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-primary">
                <i className="fas fa-phone"></i>
              </span>
              Phone: <a href="tel:+919384725988" className="text-blue-500 underline ml-2">+91 9384725988</a>
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-primary">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              Address: 19, Radha Nagar, Tirupur, Tamil Nadu, India
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-4 text-primary">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                className="w-full p-3  rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Message</label>
              <textarea
                className="w-full p-3  rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                rows="5"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full text-white py-3 rounded-md hover:bg-primary-dark bg-primary"
            >
              Submit
            </button>
          </form>
        </div>
        {/* Map */}
        <div>
          <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-4 text-primary">Our Location</h2>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d978.677810682985!2d77.3593970564455!3d11.134870072557893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1737112347045!5m2!1sen!2sin"
            width="100%"
            height="300"
            className="border rounded-md"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

    </div>

  );
};

export default ContactUs;
