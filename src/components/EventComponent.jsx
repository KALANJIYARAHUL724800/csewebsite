import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { showAllEvents } from "../index";

const EventComponent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
        });

        const fetchData = async () => {
            try {
                const res = await showAllEvents();

                if (res?.data?.length > 0) {
                    let content = res.data[0].content;

                    // content JSON string-ah varum
                    if (typeof content === "string") {
                        content = JSON.parse(content);
                    }

                    setData(content);
                }
            } catch (error) {
                console.error("Error loading events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Loading
    if (loading) {
        return (
            <section className="events-section">
                <div className="events-container">
                    <div className="events-header">
                        <span className="events-badge">EVENTS</span>
                        <h2>Our Events</h2>
                        <p>Explore our latest activities and memorable moments.</p>
                    </div>

                    <div className="events-grid">
                        {[1, 2, 3].map((item) => (
                            <div className="event-card skeleton-card" key={item}>
                                <div className="skeleton-image"></div>

                                <div className="event-content">
                                    <div className="skeleton-title"></div>
                                    <div className="skeleton-text"></div>
                                    <div className="skeleton-text small"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const images = Array.isArray(data?.images) ? data.images : [];

    return (
        <section className="events-section">
            <div className="events-container">
    <h1 className="text-center mb-5 heading" style={{ color: "#004aad" }}>
        EVENTS
      </h1>
      <hr />
                {/* Header */}
                <div className="events-header" data-aos="fade-up">

                    <h2>
                        {data?.title || "CSE Computer Education Events"}
                    </h2>

                    {data?.description && (
                        <p>{data.description}</p>
                    )}

                    <div className="header-line"></div>
                </div>
{/* Events */}
{images.length > 0 ? (
    <div className="events-grid">

        {images.map((image, index) => (
            <article
                className="event-card"
                key={image?.url || index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
            >

                {/* ================= IMAGE ================= */}
                <div className="event-image-wrapper">

                    <img
                        src={image?.url}
                        alt={
                            image?.name ||
                            `CSE Computer Education Event ${index + 1}`
                        }
                        className="event-image"
                        loading="lazy"

                        /* Portrait / Landscape Detection */
                        onLoad={(e) => {
                            const img = e.currentTarget;

                            if (img.naturalHeight > img.naturalWidth) {
                                img.classList.add("portrait-image");
                            } else {
                                img.classList.add("landscape-image");
                            }
                        }}

                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />

                    {/* Image Overlay */}
                    <div className="image-overlay">
                        <span>
                            Event {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>

                </div>


                {/* ================= CONTENT ================= */}
                <div className="event-card-content">

                    {/* Event Number */}
                    <div className="event-number">
                        {String(index + 1).padStart(2, "0")}
                    </div>


                    {/* Event Details */}
                    <div>

                        <h3>
                            {image?.name
                                ?.replace(/\.[^/.]+$/, "")
                                ?.replace(/[-_]/g, " ")
                                ?.replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                ) ||
                                `Event ${index + 1}`}
                        </h3>

                        <p>
                            {data?.description ||
                                "Discover memorable moments and activities at CSE Computer Education."}
                        </p>

                    </div>

                </div>

            </article>
        ))}

    </div>
) : (
    /* ================= NO EVENTS ================= */
    <div className="no-events">

        <div className="no-events-icon">
            📷
        </div>

        <h3>
            No Events Available
        </h3>

        <p>
            Events will be displayed here once they are added.
        </p>

    </div>
)}

            </div>
        </section>
    );
};

export default EventComponent;