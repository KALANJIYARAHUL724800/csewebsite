import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseContent = () => {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZS5lQCvP0Z4Dz6SZaRNenWeXXFivGmn9gng&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTEwJ4SXiGAACXmvydNyxhs2tE0F_-5L5eg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqSdmH3UiXqyDAhju2U-RFu6QvQ5hMRIXr8Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQedZC-X5RWwHfrBciyWmWjaE1qzstF3cnmeg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtlfCTLIkntmn4gYgjQw4YYUtcUBBlwfWLQA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsrCKLG3CjZBgBQ7w_su-nDZ7WNMhmYSaa4Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJeyzQIYzl6-aaV5Cin4YQZufKxETn4iz2vg&s"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const imageWidth = 400;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-3">HDCA (Higher Diploma in Computer Applications)</h1>
      <div className="my-5">
        <h2 className="text-center mb-4">HDCA Image Marquee</h2>
        <div
          className="overflow-hidden border rounded mx-auto"
          style={{ width: `${imageWidth}px`, height: "220px", position: "relative" }}
        >
          <div
            style={{
              display: "flex",
              width: `${images.length * imageWidth}px`,
              transform: `translateX(-${currentIndex * imageWidth}px)`,
              transition: "transform 0.5s ease-in-out"
            }}
          >
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`HDCA ${idx + 1}`}
                className="img-fluid"
                style={{ width: `${imageWidth}px`, height: "220px", objectFit: "cover" }}
              />
            ))}
          </div>
        </div>
      </div>
      <h4 className="text-center mb-4 text-muted">
        Learn practical computer applications for a successful career
      </h4>
      <section className="mb-4">
        <h3>Overview</h3>
        <p>
          HDCA is a professional course designed to equip students with essential computer skills for the modern workplace.
          It focuses on practical applications such as Tally ERP 9, MS Office, programming basics, and database management.
        </p>
      </section>
      <section className="mb-4">
        <h3>About Tally</h3>
        <p>
          Tally ERP 9 is one of the most popular accounting software programs used in businesses.
          In HDCA, students learn to manage accounts, generate invoices, prepare financial statements, and handle taxation using Tally.
          Mastering Tally prepares students for roles like Tally Operator, Accountant, and Finance Assistant.
        </p>
      </section>
      <section className="mb-4">
        <h3>Microsoft Office Suite</h3>
        <p>
          MS Office is an essential tool for any office environment. HDCA covers Word for document preparation, Excel for spreadsheets and data analysis,
          and PowerPoint for creating professional presentations. These skills help students become proficient in office tasks and administration.
        </p>
      </section>
      <section className="mb-4">
        <h3>Programming Fundamentals</h3>
        <p>
          Students are introduced to programming languages such as C, C++, or Java. The focus is on logic building, problem solving, and basic coding skills.
          This foundation helps in understanding software applications and prepares students for more advanced IT courses in the future.
        </p>
      </section>
      <section className="mb-4">
        <h3>Database Management</h3>
        <p>
          HDCA teaches the basics of databases and SQL. Students learn to store, manage, and retrieve data efficiently, which is crucial for business operations.
          Understanding databases enhances career opportunities in IT and administrative roles.
        </p>
      </section>
      <section className="mb-4">
        <h3>Career Opportunities</h3>
        <p>
          After completing HDCA, students can pursue careers as Tally Operators, Data Entry Operators, Computer Assistants, Office Executives, or even start their own IT or accounting business.
          The course equips students with practical skills that are highly valued in offices and industries.
        </p>
      </section>
      <section className="mb-4">
        <h3>Conclusion</h3>
        <p>
          HDCA provides a comprehensive learning experience for students who want to gain practical computer application skills.
          It combines software training, programming, and database knowledge, making students job-ready and enhancing their career prospects.
        </p>
      </section>
    </div>
  );
};

export default CourseContent;
