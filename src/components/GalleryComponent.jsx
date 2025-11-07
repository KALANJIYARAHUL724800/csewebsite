import React from 'react'

const GalleryComponent = () => {
  const images = [
    { src: '/gallery/Class-1.jpg', alt: 'Class 1' },
    { src: '/gallery/Entrance.jpg', alt: 'Entrance ' },
    { src: '/gallery/entrance2.jpg', alt: 'entrance 2' },
    { src: '/gallery/Counselling-1.jpg', alt: 'Counselling 1' },
    { src: '/gallery/Counselling-2.jpg', alt: 'Counselling 2' },
    { src: '/gallery/Class-2.jpg', alt: 'Class 2' },
    { src: '/gallery/cls3.jpg', alt: 'cls3 4' },
    { src: '/gallery/Lab.png', alt: 'Lab' },
  ];
  return (
    <div id="gallery" className="gallery-section py-5">
      <div className="container">
        <h1 className="text-center mb-5 fw-bold gallery-title" style={{color: '#004aad'}}>Gallery</h1>

        <div className="row g-4 justify-content-center">
          {images.map((img, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
              <div className="card gallery-card shadow-sm border-0">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="gallery-img card-img-top"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GalleryComponent