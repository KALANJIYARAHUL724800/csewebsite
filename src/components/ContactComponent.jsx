import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const ContactComponent = () => {
  return (
    <div className="contact-container container py-5">
      <h1 className="contact-title text-center mb-4 heading" style={{ color: '#004aad' }}>Contact Information & Location</h1>
      <hr />
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-6">
          <div className="contact-card card mx-auto shadow-sm" style={{ maxWidth: '600px' }}>
            <div className="contact-card-body card-body">

              <div className="contact-row d-flex align-items-start mb-3">
                <i className="contact-icon bi bi-envelope fs-3 me-3 text-primary"></i>
                <div className="contact-text">
                  <h5 className="contact-heading mb-1 heading">Email</h5>
                  <p className="contact-info mb-0 para">cseramnad@gmail.com</p>
                </div>
              </div>

              <div className="contact-row d-flex align-items-start mb-3">
                <i className="contact-icon bi bi-telephone fs-3 me-3 text-primary"></i>
                <div className="contact-text">
                  <h5 className="contact-heading mb-1 heading">Phone</h5>
                  <p className="contact-info mb-0 para">+91 9965163156</p>
                </div>
              </div>

              <div className="contact-row d-flex align-items-start mb-3">
                <i className="contact-icon bi bi-geo-alt fs-3 me-3 text-primary"></i>
                <div className="contact-text">
                  <h5 className="contact-heading mb-1 heading">Address</h5>
                  <p className="contact-info mb-0 para">
                    CSE Computer Education, II Floor, Pal-Lucky Plaza,<br />
                    G.H.Road, Ishwarya Hotel Upstair, Ramnad-623501
                  </p>
                </div>
              </div>

              <div className="contact-row d-flex align-items-start">
                <i className="contact-icon bi bi-clock fs-3 me-3 text-primary"></i>
                <div className="contact-text">
                  <h5 className="contact-heading mb-1 heading">Working Hours</h5>
                  <p className="contact-info mb-0 para">Mon-Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.646781595759!2d78.83156917480446!3d9.364491083647685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b019992f49bbca3%3A0x7caf2262af7a3a0c!2sCSE%20COMPUTER%20EDUCATION!5e0!3m2!1sen!2sin!4v1764839839333!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactComponent;
