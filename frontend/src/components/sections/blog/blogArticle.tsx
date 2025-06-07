import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogSidebar from "./blogSidebar";
import Comments from "./comments";

const BlogArticle = () => {
    const { slug } = useParams();  // Changed to use slug
    const [blogPost, setBlogPost] = useState(null);

    const fetchBlogPost = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/blogposts/${slug}/`);  // Fetch using slug
            setBlogPost(response.data);
        } catch (error) {
            console.error("Error fetching blog post:", error);
        }
    };

    useEffect(() => {
        fetchBlogPost();
    }, [slug]);

    if (!blogPost) return <div>Loading...</div>;

    return (
        <section className="blog-category section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-8">
                        <div className="single-blog-post-details wow fadeInDown" data-wow-delay="0.2s">
                            <img src={blogPost.featured_image} className="img-responsive" alt='img' />
                            <h2>{blogPost.title}</h2>
                            <div className="post-date">
                                <span><i className="fa fa-calendar" /> {new Date(blogPost.created_at).toLocaleDateString()}</span>
                                <span><i className="fa fa-tag" /> {blogPost.tags.map(tag => tag.name).join(', ')}</span>
                            </div>
                            <p>{blogPost.content}</p>
                            <h2>Tags</h2>
                            <div className="tag">
                                {blogPost.tags.map(tag => (
                                    <a key={tag.id} href="#">{tag.name}</a>
                                ))}
                            </div>
                            <div className="next-previews-button-design">
                                <a className="pull-left" href="#">Previous post</a>
                                <a className="pull-right" href="#">Next post</a>
                            </div>
                        </div>
                        {/* <Comments /> */}
                    </div>
                    <BlogSidebar />
                </div>
            </div>
        </section>
    );
};

export default BlogArticle;