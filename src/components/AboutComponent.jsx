import React from 'react';
import { useEffect,useState } from 'react';
import { getAllAboutContents } from "../index";
const AboutComponent = () => {
   const [data, setData] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getAllAboutContents(); 
            console.log("Fetched About Content: ", response.data);
            setData(response.data); 
         } catch (err) {
            console.error("Error fetching about content:", err);
         }
      };
      fetchData(); 

      return () => {
         
      };
   }, []);
   if (data === null) {
      return <div>Loading...</div>;
   }
   
  return (
    <div className="about-main">
        <h1 className='about-h1'>About Us</h1>
        <div className="scene" aria-hidden="true">
          <div className="cube" role="img" aria-label="Animated 3D cube">
            <div className="cube__face face-front"><img src="public\cselogo.png"  className="cube-img img-fluid" /></div>
            <div className="cube__face face-back"><img src="public\cselogo.png"   className="cube-img img-fluid" /></div>
            <div className="cube__face face-right"><img src="public\cselogo.png"  className="cube-img img-fluid" /></div>
            <div className="cube__face face-left"><img src="public\cselogo.png"   className="cube-img img-fluid" /></div>
            <div className="cube__face face-top"><img src="public\cselogo.png"    className="cube-img img-fluid" /></div>
            <div className="cube__face face-bottom"><img src="public\cselogo.png" className="cube-img img-fluid" /></div>
          </div>
        </div>
        <h2>Empowering Digital Careers Since 1998</h2>
        <p>
          Welcome to <b>CSE Computer Education,</b> the most trusted and long-standing computer training center in <b>Ramanathapuram,</b> Tamil Nadu. Established in <b>1998,</b> we have been at the forefront of delivering high-quality computer education to thousands of students and professionals for over 25 years.
        </p>
        <p>
          Recognized for excellence and innovation, CSE Computer Education is an <b>ISO 9001:2015 certified institution</b> that offers a wide range of <b>industry-relevant computer courses,</b> from foundational computer literacy to advanced programming and software development. Whether you’re a school student, college graduate, working professional, or job seeker, our courses are tailored to equip you with the skills needed for today’s digital world.
        </p>

        <h2>Why Choose CSE Computer Education?</h2>
        <p>We stand out as a leading <b>computer education institute in Ramanathapuram</b> for several key reasons:</p>
        <ul>
          <li><b>25+ years of proven experience</b> in the education industry</li>
          <li><b>ISO 9001:2015 certified</b> for quality education and management</li>
          <li>Only <b>Tally Assessment Center (TAC)</b> in Ramanathapuram</li>
          <li><b>Government-recognized certifications</b> upon course completion</li>
          <li><b>Highly qualified and experienced faculty,</b> including engineering graduates</li>
          <li>Courses designed with <b>practical project work and hands-on training</b></li>
          <li>Strong focus on <b>career placement support</b> through job fairs and internship opportunities</li>
          <li>Contribution to society by offering <b>free exam guides</b> to school students</li>
        </ul>

        <i className="fa fa-eye"></i>
        <h2>Our Vision</h2>
        <p>
          To bridge the digital divide by providing affordable, high-quality computer education that empowers individuals with the knowledge and skills required for the modern workplace.
        </p>

        <i className="fa fa-bullseye"></i>
        <h2>Our Mission</h2>
        <ul>
          <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>To offer a wide range of <b>career-oriented computer courses</b></li>
          <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>To maintain the highest standards of <b>quality and ethics</b> in education</li>
          <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>To create <b>employment-ready candidates</b> with practical project experience</li>
          <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>To <b>support students’ academic growth</b> through free learning resources</li>
          <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>To contribute to the <b>IT development of rural and semi-urban India</b></li>
        </ul>

        <h2>Unique Highlights</h2>
        <h3>✅ Only Tally Assessment Center in Ramanathapuram</h3>
        <p>
          CSE Computer Education is proud to be the <b>only authorized Tally Assessment Center (TAC)</b> in the region. After completing Tally training at our center, students can appear for <b>official Tally online assessments</b>, and receive <b>certificates directly from Tally Solutions Pvt Ltd</b>, enhancing their credibility and job prospects.
        </p>

        <h3>✅ Career-Oriented Project Submissions</h3>
        <p>
          Every student at CSE is required to complete a <b>course-based project</b> and submit a detailed report. This hands-on experience ensures that students not only learn the theory but also gain <b>practical skills</b> in real-world scenarios.
        </p>

        <h3>✅ Job Fair and Placement Support</h3>
        <p>To bridge the gap between training and employment, we <b>conduct regular job fairs</b> for our students, connecting them with local businesses and IT firms. Our dedicated placement cell supports students with:</p>
        <ul>
          <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Resume building</li>
          <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Interview preparation</li>
          <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Company referrals</li>
          <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Internship connections</li>
        </ul>

        <div className="features">
          <div className="feature-card">
            <i className="fas fa-laptop-code"></i>
            <h2>Practical Learning</h2>
            <ul>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Custom-tailored <b>internship programs for programming students</b></li>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}><b>Live projects and real-world tasks</b> as part of the course</li>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}><b>Project submission and evaluation</b> for certification</li>
            </ul>
          </div>

          <div className="feature-card">
            <i className="fas fa-user-graduate"></i>
            <h2>Our Team – Qualified & Passionate Faculty</h2>
            <p>Our strength lies in our <b>dedicated team of trainers and instructors</b>, who are committed to helping students succeed. We have a team of:</p>
            <ul>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Experienced <b>Engineering graduates</b> for programming courses</li>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Certified <b>Tally and office application trainers</b></li>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Graphic and web design specialists</li>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Soft skills and interview training experts</li>
            </ul>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-globe"></i>
            <h2>Social Commitment</h2>
            <p>At CSE Computer Education, we believe in <b>giving back to the community.</b> Every year, we provide <b>free previous year question and answer books</b> for <b>10th and 12th standard students</b> in and around Ramanathapuram.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-shield-halved"></i>
            <h2>Our Legacy of Trust</h2>
            <p>With over two decades of consistent performance and commitment to excellence, we have built a <b>reputation of trust</b> among parents, students, and professionals in Ramanathapuram. Thousands of students have successfully completed their courses at CSE Computer Education and gone on to secure <b>jobs in top companies</b>, start freelance careers, or <b>pursue higher education</b>.</p>
          </div>

          <div className="feature-card">
            <i className="fa fa-thumbs-up"></i>
            <h2>Student Success Stories</h2>
            <ul>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Software Developers</li>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Web Designers</li>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Accountants and Tally Operators</li>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Freelance Graphic Designers</li>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>System Administrators</li>
              <li style={{ marginLeft: '30px', listStyleType: 'circle' }}>Office Executives</li>
            </ul>
          </div>

          <div className="feature-card">
            <h2>Start Your Digital Journey with CSE Today!</h2>
            <p>Join the thousands of students who have transformed their lives through CSE Computer Education. Whether you are a beginner or looking to upskill, we have the right course for you. Learn the skills, get certified, and build your career confidently.</p>
          </div>
        </div>
    </div>
  );
};

export default AboutComponent;
