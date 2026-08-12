import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "aos/dist/aos.css";
import AOS from "aos";
const ContactComponent = () => {

  const [data, setData] = useState({
    contactForm: true
  });
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const validate = () => {
    const err = {};
    if (!contact.name.trim()) err.name = "Name required";
    if (!contact.email.match(/^\S+@\S+\.\S+$/)) err.email = "Valid email required";
    if (!contact.message.trim()) err.message = "Message required";
    return err;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setContact({ name: "", email: "", message: "" });
      }, 1800);
    }
  };

  return (
    <div className="contact-container container py-5">
      <h1 className="contact-title text-center mb-4 heading" style={{ color: '#004aad' }}>Contact Information & Location</h1>
      <hr />
      {/* cse ramnad */}
      <div className="row">
        {/* LEFT SIDE */}
        <h1 className="contact-title text-center mb-4 heading" style={{ color: '#004aad' }}>Ramnad</h1>
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
                  <p className="contact-info mb-0 para">+91 7010038188</p>
                  <p className="contact-info mb-0 para">+91 9965163156</p>
                </div>
              </div>

              <div className="contact-row d-flex align-items-start mb-3">
                <i className="contact-icon bi bi-geo-alt fs-3 me-3 text-primary"></i>
                <div className="contact-text">
                  <h5 className="contact-heading mb-1 heading">Address</h5>
                  <p className="contact-info mb-0 para">
                    பல்-லக்கி பிளாசா,ஐஸ்வர்யா ஹோட்டல் மாடியில்,<br />
                    இராமநாதபுரம்.
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

      {/* udumalpet */}
      <div className="row py-3">
        {/* LEFT SIDE */}
        <h1 className="contact-title text-center mb-4 heading" style={{ color: '#004aad' }}>Udumalpet</h1>
        <hr />
        <div className="col-md-6">
          <div className="contact-card card mx-auto shadow-sm" style={{ maxWidth: '600px' }}>
            <div className="contact-card-body card-body">

              <div className="contact-row d-flex align-items-start mb-3">
                <i className="contact-icon bi bi-envelope fs-3 me-3 text-primary"></i>
                <div className="contact-text">
                  <h5 className="contact-heading mb-1 heading">Email</h5>
                  <p className="contact-info mb-0 para">cseudt2016@gmail.com</p>
                </div>
              </div>

              <div className="contact-row d-flex align-items-start mb-3">
                <i className="contact-icon bi bi-telephone fs-3 me-3 text-primary"></i>
                <div className="contact-text">
                  <h5 className="contact-heading mb-1 heading">Phone</h5>
                  <p className="contact-info mb-0 para">+91 7373537833</p>
                  <p className="contact-info mb-0 para">+91 9080082772</p>
                </div>
              </div>

              <div className="contact-row d-flex align-items-start mb-3">
                <i className="contact-icon bi bi-geo-alt fs-3 me-3 text-primary"></i>
                <div className="contact-text">
                  <h5 className="contact-heading mb-1 heading">Address</h5>
                  <p className="contact-info mb-0 para">
                    U.K.P காம்ப்ளக்ஸ்,2nd FLOOR,(புவனேஸ்வரி மெடிக்கல் மாடியில்),<br />
                    உடுமலை.
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
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.921747930285!2d77.2475144748162!3d10.585291162690634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9cd18f5b2b44d%3A0x44b00d8c226e5a57!2sCSE%20Computer%20Education!5e0!3m2!1sen!2sin!4v1786098210933!5m2!1sen!2sin"
  width="100%"
  height="350"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
></iframe>
        </div>
      </div>
      {/* kilakarai */}
      <div className="row py-3">
        {/* LEFT SIDE */}
        <h1 className="contact-title text-center mb-4 heading" style={{ color: '#004aad' }}>Kilakarai</h1>
        <hr />
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
                  <p className="contact-info mb-0 para">+91 6383678645</p>
                  <p className="contact-info mb-0 para">+91 9080082772</p>
                </div>
              </div>

              <div className="contact-row d-flex align-items-start mb-3">
                <i className="contact-icon bi bi-geo-alt fs-3 me-3 text-primary"></i>
                <div className="contact-text">
                  <h5 className="contact-heading mb-1 heading">Address</h5>
                  <p className="contact-info mb-0 para">
                   வள்ளல் சீதக்காதி சாலை, பீஸா பேக்கரி மாடியில்,<br />
                    கீழக்கரை.
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
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d696.1703129401934!2d78.78487395220961!3d9.232311391451553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b019bf60ee3020b%3A0xaad199be9a960419!2sPizza%20bakery!5e0!3m2!1sen!2sin!4v1786099132081!5m2!1sen!2sin"
  width="100%"
  height="350"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
></iframe>
        </div>
      </div>
      {/* contact form */}
      <div className="row">
        <div className="col-md-12">
          <section id="contact" className="py-5" data-aos="fade-up">
            <h3 className="text-center fw-bold mb-4 heading" style={{ color: "#004aad" }}>
              Contact Us
            </h3>

            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <form onSubmit={handleSubmit} className="card p-4 shadow border-0">

                    <div className="mb-3">
                      <label className="form-label heading">Name</label>
                      <input
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label heading">Email</label>
                      <input
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label heading">Message</label>
                      <textarea
                        name="message"
                        rows="4"
                        value={contact.message}
                        onChange={handleChange}
                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      />
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </div>

                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-send me-2"></i>
                      {sent ? "Sent!" : "Send Message"}
                    </button>

                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>


    </div>
  );
}

export default ContactComponent;
