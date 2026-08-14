import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showBlogById } from "../index";

const BlogDetailsComponent = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    // Always scroll to top when blog page opens
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });

    setLoading(true);
    setError("");

    showBlogById(id)
      .then((response) => {

        setBlog(response.data);
      })
      .catch((err) => {

        console.error("Blog details error:", err);

        setBlog(null);
        setError("Blog not found.");
      })
      .finally(() => {

        setLoading(false);
      });

  }, [id]);


  // Loading
  if (loading) {

    return (
      <section className="py-5">

        <div className="container text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="text-muted mt-3 mb-0">
            Loading blog...
          </p>

        </div>

      </section>
    );
  }


  // Blog Not Found
  if (error || !blog) {

    return (
      <section className="py-5">

        <div className="container">

          <div className="text-center py-5">

            <div
              className="mb-3 text-danger"
              style={{ fontSize: "45px" }}
            >
              <i className="bi bi-journal-x"></i>
            </div>

            <h3 className="fw-bold">
              Blog Not Found
            </h3>

            <p className="text-muted mb-4">
              The blog you are looking for is not available.
            </p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline-primary rounded-pill px-4"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Go Back
            </button>

          </div>

        </div>

      </section>
    );
  }


  return (

    <section className="py-4 py-md-5 bg-light">

      <div className="container">

        {/* Back Button */}
        <div className="mb-4">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline-primary rounded-pill px-4"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>

        </div>


        <div className="row justify-content-center">

          <div className="col-12 col-lg-9">

            <article className="bg-white rounded-4 shadow-sm overflow-hidden">

              {/* Blog Image */}
              <div className="blog-detail-image-wrapper">

                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-detail-image"
                />

              </div>


              {/* Blog Content */}
              <div className="p-4 p-md-5">

                {/* Category + Date */}
                <div className="d-flex flex-wrap align-items-center gap-2 gap-md-3 mb-3">

                  <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                    {blog.category}
                  </span>

                  <span className="text-muted small">
                    <i className="bi bi-calendar3 me-1"></i>
                    {blog.date}
                  </span>

                </div>


                {/* Title */}
                <h1
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "clamp(28px, 4vw, 42px)",
                    lineHeight: "1.2"
                  }}
                >
                  {blog.title}
                </h1>


                {/* Description */}
                <p
                  className="text-muted mb-4"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.8"
                  }}
                >
                  {blog.description}
                </p>


                <hr className="my-4" />


                {/* Full Content */}
                <div
                  className="text-dark"
                  style={{
                    fontSize: "17px",
                    lineHeight: "1.9",
                    whiteSpace: "pre-line"
                  }}
                >
                  {blog.content}
                </div>

              </div>

            </article>

          </div>

        </div>

      </div>


      {/* Responsive Image CSS */}
      <style>
        {`
          .blog-detail-image-wrapper {
            width: 100%;
            height: 360px;
            overflow: hidden;
          }

          .blog-detail-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          @media (max-width: 767.98px) {
            .blog-detail-image-wrapper {
              height: 210px;
            }
          }

          @media (max-width: 575.98px) {
            .blog-detail-image-wrapper {
              height: 180px;
            }
          }
        `}
      </style>

    </section>
  );
};

export default BlogDetailsComponent;