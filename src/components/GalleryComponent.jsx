import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const GalleryComponent = () => {
	useEffect(() => {
		AOS.init({ duration: 300, once: true });
	}, []);

	const images = [
		{ src: "/gallery/Class-1.jpg", alt: "Class 1" },
		{ src: "/gallery/Entrance.jpg", alt: "Entrance" },
		{ src: "/gallery/1.jpeg", alt: "1" },
		{ src: "/gallery/2.jpeg", alt: "2" },
		{ src: "/gallery/3.jpeg", alt: "3" },
		{ src: "/gallery/4.jpeg", alt: "4" },
		{ src: "/gallery/entrance2.jpg", alt: "Entrance 2" },
		{ src: "/gallery/Counselling-1.jpg", alt: "Counselling 1" },
		{ src: "/gallery/Counselling-2.jpg", alt: "Counselling 2" },
		{ src: "/gallery/Class-2.jpg", alt: "Class 2" },
		{ src: "/gallery/cls3.jpg", alt: "Class 3" },
		{ src: "/gallery/Lab.png", alt: "Lab" },
	];

	return (
		<div id="gallery" className="gallery-section py-5">
			<div className="container">
				{/* Title with 3D animation */}
				<h1
					className="text-center mb-5 fw-bold heading"
					style={{
						color: "#004aad",
					}}
					data-aos="flip-up">
					Gallery
				</h1>
				<hr />
				<div className="row g-4 justify-content-center">
					{images.map((img, index) => (
						<div
							key={index}
							className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
							data-aos="flip-left"
							data-aos-delay={index * 150}>
							<div
								className="card shadow-lg border-0"
								style={{
									borderRadius: "10px",
									transformStyle: "preserve-3d",
									transition: "0.4s",
								}}>
								<img
									src={img.src}
									alt={img.alt}
									className="card-img-top"
									style={{
										borderRadius: "10px",
										transform: "translateZ(20px)",
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* 3D hover CSS */}
			<style>{`
        .card:hover {
          transform: rotateY(10deg) rotateX(10deg) scale(1.05);
        }
      `}</style>
		</div>
	);
};

export default GalleryComponent;
