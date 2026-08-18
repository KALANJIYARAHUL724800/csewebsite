import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { showAllAbout } from "../index";

const AboutComponent = () => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const fetchData = async () => {
      try {
        const res = await showAllAbout();
        const aboutContent = JSON.parse(res.data[0].content);
        console.log(aboutContent['about']['udumalpet']);
        
        setData(aboutContent);
      } catch (err) { }
    };

    fetchData();
  }, []);
  if (!data) return <p>Please Wait</p>;

const galleryImages = [
  "/gallery/Counselling-1.jpg",
  "/gallery/Counselling-2.jpg",
  "/gallery/3.jpeg",
  "/gallery/4.jpeg",
  "/gallery/5.jpeg",
  "/gallery/6.jpeg",
  "/gallery/7.jpeg",
  "/gallery/8.jpeg",
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
            <h1 className="display-5 fw-bold text-white mt-4 heading">{data.hero.title}</h1>
            <p className="lead text-light para">{data.hero.subtitle}</p>
            <p className="text-white-50 para">{data.hero.description}</p>

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

    {/* ================= ABOUT SECTION ================= */}
{data?.about && (
  <section className="about-section container py-5" data-aos="fade-up">

    <div className="row align-items-center gy-4">

      {/* ================= DESKTOP GIRL ================= */}
      <div className="col-md-4 about-girl-desktop text-center">
        <img
          src="/about/girl.png"
          alt="girl"
          className="about-girl-img"
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="col-md-4 about-content">

        <h2
          className="fw-bold mb-3 heading"
          style={{ color: "#004aad" }}
        >
          {data.about.title}
        </h2>

        <p className="text-muted lh-lg para">
          {data.about.description}
        </p>


        {/* ================= MOBILE WHY CHOOSE AREA ================= */}
        <div className="mobile-why-wrapper">

          {/* Girl pointing towards Why Choose Us */}
          <div className="mobile-girl">
            <img
              src="/about/say.png"
              alt="Why choose us"
            />
          </div>

          {/* Why Choose Us */}
          <div className="mobile-reasons">

            <h5
              className="mt-4 fw-semibold heading"
              style={{ color: "#004aad" }}
            >
              {data.about.reasonsTitle}
            </h5>

            <ul className="list-unstyled text-muted ps-0 para">
              {data.about.reasons?.map((reason, index) => (
                <li key={index} className="mb-2">
                  <span className="reason-check">✅</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

          </div>

        </div>


        {/* ================= DESKTOP WHY CHOOSE ================= */}
        <div className="desktop-reasons">

          <h5
            className="mt-4 fw-semibold heading"
            style={{ color: "#004aad" }}
          >
            {data.about.reasonsTitle}
          </h5>

          <ul className="list-unstyled text-muted ps-2 para">
            {data.about.reasons?.map((reason, index) => (
              <li key={index} className="mb-2">
                ✅ {reason}
              </li>
            ))}
          </ul>

        </div>

      </div>


      {/* ================= RIGHT IMAGES ================= */}
      <div className="col-md-4 about-right-images text-center">

        <img
          src={data.about.image}
          alt="About"
          className="about-main-image"
        />

        <img
          src={data.about.udumalpet}
          alt="Udumalpet"
          className="about-second-image"
        />

      </div>

    </div>

  </section>
)}

      {/* SERVICES */}
      {data.features && (
        <section id="services" className="py-5 bg-white" data-aos="fade-up">
          <h3 className="text-center fw-bold mb-5 heading" style={{ color: "#004aad" }}>Our Features</h3>
          <div className="container">

            {/* FEATURES LOOP */}
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
                      <i className={`fas ${f.icon} fa-3x text-warning`}></i>
                    </div>
                    {f.image && (<img
                      src={f.image ?? ""}
                      style={{ height: "250px", width: "200px", position: "relative", left: "40px" }}
                      className="img-fluid ms-5"
                    />)}
                    <h5 className="fw-bold heading">{f.title}</h5>
                    <p className="text-muted para">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}
        {/* Social Media */}
        <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-3 heading" style={{ color: "#004aad" }}>Follow Us</h2>
          <p className="mb-4 text-muted para">Stay connected with us on social media!</p>
          <div className="d-flex justify-content-center gap-3">
            <a href="https://www.facebook.com/cseramnad" target="_blank" className="btn btn-primary btn-lg rounded-circle d-flex align-items-center justify-content-center">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.youtube.com/@cseramnad" target="_blank" className="btn btn-danger btn-lg rounded-circle d-flex align-items-center justify-content-center">
              <i className="bi bi-youtube"></i>
            </a>
            <a href="https://in.linkedin.com/company/cseramnad" target="_blank" className="btn btn-info btn-lg rounded-circle d-flex align-items-center justify-content-center text-white">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/cse_ramnad/" target="_blank" className="btn btn-pink btn-lg rounded-circle d-flex align-items-center justify-content-center text-white" style={{ backgroundColor: '#E4405F' }}>
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </section>
      {/* GALLERY */}
     <section className="py-5 bg-white" data-aos="fade-up">
  <h3
    className="text-center fw-bold mb-4 heading"
    style={{ color: "#004aad" }}
  >
    Gallery
  </h3>

  <div className="container">
    <div
      id="galleryCarousel"
      className="carousel slide shadow rounded overflow-hidden"
      data-bs-ride="carousel"
      data-bs-interval="1000"
      data-bs-wrap="true"
    >
      <div className="carousel-inner">
        {galleryImages.map((g, i) => {
          const src = g.startsWith("public/")
            ? g.replace("public", "")
            : g;

          return (
            <div
              key={i}
              className={`carousel-item ${i === 0 ? "active" : ""}`}
            >
              <img
                src={src}
                className="d-block w-100"
                alt={`slide-${i}`}
                style={{
                  height: "480px",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Previous Button */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#galleryCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      {/* Next Button */}
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
