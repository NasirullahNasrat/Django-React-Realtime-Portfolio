import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogSidebar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/blogpostcategory/');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="col-md-4 col-sm-4">
            <div className="single-blog-sidebar-area">
                <div className="single-side-bar">
                    <h2>Search</h2>
                    <input type="text" className="form-control" placeholder="Search" />
                    <button>Search</button>
                </div>
               
                <div className="single-side-bar">
                    <h2>Category lists</h2>
                    <ul>
                        {categories.map(category => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                </div>
              
            </div>
        </div>
    );
};

export default BlogSidebar;