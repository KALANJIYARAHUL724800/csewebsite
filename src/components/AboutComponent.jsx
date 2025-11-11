import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { showAllAbout } from "../index";

const AboutComponent = () => {
  const [data, setData] = useState(null);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const fetchData = async () => {
      try {
        const res = await showAllAbout();
        const aboutContent = JSON.parse(res.data[0].content);
        setData(aboutContent);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  if (!data) return <p>Loading...</p>;
  const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

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

  const galleryImages = [
    "public/gallery/Counselling-1.jpg",
    "public/gallery/Counselling-2.jpg",
    "public/gallery/Lab.png",
    "public/gallery/Class-2.jpg",
  ];

  return (
    <div className="about-page bg-light m-0 p-0" style={{ overflowX: "hidden" }}>
      {/* HERO SECTION */}
      {data.hero && (
        <section
          className="hero-section text-center d-flex align-items-center justify-content-center position-relative"
          style={{
            background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${data.hero.backgroundImage}') center/cover no-repeat`,
            minHeight: "100vh",
            margin: 0,
            padding: 0,
          }}
        >
          <div data-aos="fade-down">
            <img
              src={data.hero.logo}
              alt="CSE Logo"
              style={{ height: "180px" }}
            />
            <h1 className="display-5 fw-bold text-white mt-4">{data.hero.title}</h1>
            <p className="lead text-light">{data.hero.subtitle}</p>
            <p className="text-white-50">{data.hero.description}</p>

            <div className="mt-3">
              {data.hero.buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.link}
                  className={`btn btn-${btn.style} btn-lg me-2`}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT SECTION */}
      {data?.about && (
        <section className="container py-5" data-aos="fade-up">
          <div className="row align-items-center gy-4">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3 text-dark">{data.about.title}</h2>
              <p className="text-muted lh-lg">{data.about.description}</p>

              <h5 className="mt-4 text-primary fw-semibold">{data.about.reasonsTitle}</h5>
              <ul className="list-unstyled text-muted ps-2">
                {data.about.reasons?.map((reason, index) => (
                  <li key={index} className="mb-2">
                    ✅ {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-6 text-center">
              <img
                src={data.about.image}
                alt="About"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: "350px", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
      )}


      {/* SERVICES */}
      {data.features && (
        <section id="services" className="py-5 bg-white" data-aos="fade-up">
          {/* Otherwise, you can add a heading manually */}
          <h3 className="text-center fw-bold mb-5">Our Features</h3>

          <div className="container">
            <div className="row g-4">
              {data.features.map((f, i) => (
                <div
                  key={i}
                  className="col-md-4"
                  data-aos="zoom-in"
                  data-aos-delay={i * 100}
                >
                  <div className="card p-4 text-center shadow-sm border-0 h-100 hover-card">
                    <div className="mb-3">
                      {/* FontAwesome icon class */}
                      <i className={`fas ${f.icon} fa-3x text-warning`}></i>
                    </div>
                    <h5 className="fw-bold">{f.title}</h5>
                    <p className="text-muted">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


{/* TESTIMONIALS */}
{data.testimonials && (
  <section className="py-5" data-aos="fade-up">
    <h3 className="text-center fw-bold mb-5">Testimonials</h3>
    <div className="container">
      <div className="row g-4">
        {data.testimonials.map((t, i) => (
          <div
            key={i}
            className="col-md-6"
            data-aos="flip-left"
            data-aos-delay={i * 150}
          >
            <div className="testimonial-card p-4 h-100 position-relative d-flex align-items-center justify-content-between">
              <div className="border-animate"></div>

              {/* LEFT SIDE */}
              <div className="text-center me-3 flex-shrink-0">
                <img
                  src={t.img}
                  alt={t.name}
                  className="rounded-circle mb-3 shadow-lg"
                  width="90"
                  height="90"
                  style={{ objectFit: "cover" }}
                />
                <h6 className="fw-bold mb-0">{t.name}</h6>
                <p className="text-muted small mb-0">{t.role}</p>
              </div>

              {/* MIDDLE LINE */}
              <div className="divider mx-3"></div>

              {/* RIGHT SIDE */}
              <div className="flex-grow-1">
                <h3>Information</h3>
                <p className="fst-italic text-muted mb-0">“{t.text}”</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CSS STYLING */}
    <style>
      {`
        .testimonial-card {
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 6px 25px rgba(0,0,0,0.1);
          overflow: hidden;
          position: relative;
        }

        .testimonial-card .border-animate {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 15px;
          padding: 2px;
          background: linear-gradient(270deg, #ff6ec4, #7873f5, #42a5f5, #ff6ec4);
          background-size: 600% 600%;
          animation: borderMove 6s linear infinite;
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
        }

        @keyframes borderMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .divider {
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, #ff6ec4, #7873f5, #42a5f5);
          border-radius: 5px;
          opacity: 0.8;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          transition: all 0.4s ease;
        }
      `}
    </style>
  </section>
)}



      {/* GALLERY */}
      <section className="py-5 bg-white" data-aos="fade-up">
        <h3 className="text-center fw-bold mb-4">Gallery</h3>
        <div className="container">
          <div
            id="galleryCarousel"
            className="carousel slide shadow rounded overflow-hidden"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {galleryImages.map((g, i) => {
                const src = g.startsWith("public/") ? g.replace("public", "") : g;
                return (
                  <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                    <img
                      src={src}
                      className="d-block w-100"
                      alt={`slide-${i}`}
                      style={{ height: "480px", objectFit: "cover" }}
                    />
                  </div>
                );
              })}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#galleryCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#galleryCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      {data.contactForm && (<section id="contact" className="py-5" data-aos="fade-up">
        <h3 className="text-center fw-bold mb-4">Contact Us</h3>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form onSubmit={handleSubmit} className="card p-4 shadow border-0">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={contact.message}
                    onChange={handleChange}
                    rows="4"
                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  ></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">
                  {sent ? "Sent!" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>)}

      <style>
        {`
          .hover-card:hover {
            transform: translateY(-8px);
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }
        `}
      </style>
    </div>
  );
};

export default AboutComponent;
