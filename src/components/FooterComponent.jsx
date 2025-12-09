import React from 'react'
const footerComponent = () => {
  return (
    <div className='bg-dark footer'>
      <div className="container py-3">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">About CSE Ramnad</h5>
            <p className='para'>
            The Computer Science training center in Ramnad offers practical, skill-based courses in programming, full-stack development, MS Office, Tally, graphics, and UI/UX. With experienced faculty, online/offline classes, ISO certification, and 26+ years of service, we provide quality computer education at affordable fees.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="footer-title heading">Quick Links</h5>
            <ul className="list-unstyled para">
              <li><a href="/home" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/courses" className="footer-link">Courses</a></li>
              <li><a href="/progress" className="footer-link">Events</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="footer-title heading">Contact Us</h5>
            <p className='para'><i className="bi bi-geo-alt-fill me-2 para"></i>Pal-Lucky Plazza,<br />   G.H.Road,<br /> Ramnadhapuram, <br />Tamil Nadu, India</p>
            <p className='para'><i className="bi bi-telephone-fill me-2"></i>+91 7010038188, +91 9965163156</p>
            <a href='#' target="cseramnad@gmail.com" className='text-white text-decoration-none para'><i className="bi bi-envelope-fill me-2"></i>cseramnad@gmail.com</a>
            <div className="footer-social">
              <a href="https://www.facebook.com/cseramnad" target="_blank" className="me-3"><i className="bi bi-facebook"></i></a>
              <a href="https://www.youtube.com/@cseramnad" target="_blank" className="me-3"><i className="bi bi-youtube"></i></a>
              <a href="https://in.linkedin.com/company/cseramnad" target="_blank" className="me-3"><i className="bi bi-linkedin"></i></a>
              <a href="https://www.instagram.com/cse_ramnad/" target="_blank"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
        <hr className="bg-white" />
        <div className="text-center pb-3 para">
          &copy; {new Date().getFullYear()} CSE Ramnad. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}

export default footerComponent