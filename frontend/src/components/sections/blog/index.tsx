import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionTitle from "@components/ui/sectionTitle";
import SlideUp from "@utils/animations/slideUp";
import { Link } from "react-router-dom";

const Blog = () => {
    const [blogData, setBlogData] = useState([]);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/blogposts/');
            setBlogData(response.data);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };

    useEffect(() => {
        fetchBlogData();
        const intervalId = setInterval(fetchBlogData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section id="blog" className="blog-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <SectionTitle className="text-center mb-60">
                            <SectionTitle.Name>My Blog</SectionTitle.Name>
                            <SectionTitle.Title>Latest <span>Blogs</span> In my Mind</SectionTitle.Title>
                        </SectionTitle>
                    </div>
                </div>
                <div className="row">
                    {
                        blogData.map(({ id, title, excerpt, created_at, featured_image, slug }) => (
                            <Card
                                key={id}
                                slug={slug}  // Use slug instead of id
                                title={title}
                                description={excerpt}
                                date={new Date(created_at).toLocaleDateString()}
                                img={featured_image}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

const Card = ({ title, description, date, img, slug }) => {
    return (
        <div className="col-lg-4 col-md-6">
            <SlideUp delay={slug}>
                <div className="blog-item">
                    <div className="image">
                        <Link to={`/blog/${slug}`}>  {/* Link to use slug */}
                            <img src={img} alt="Blog" />
                        </Link>
                    </div>
                    <div className="content">
                        <h5>
                            <Link to={`/blog/${slug}`}>{title}</Link>  {/* Link to use slug */}
                        </h5>
                        <p>{description}</p>
                        <hr />
                        <div className="blog-meta mt-15">
                            <Link className="date" to={`/blog/${slug}`}>
                                <i className="far fa-calendar-alt" /> {date}
                            </Link>
                        </div>
                    </div>
                </div>
            </SlideUp>
        </div>
    );
};

export default Blog;