import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const ContactComponent = () => {
  return (
    <div className="contact-container container py-5">
      <h1 className="contact-title text-center mb-4 heading" style={{color: '#004aad'}}>Contact Information</h1>

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
  );
}

export default ContactComponent;
