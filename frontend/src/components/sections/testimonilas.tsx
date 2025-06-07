import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionTitle from "@components/ui/sectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation } from "swiper/modules";

type TestimonialType = {
    id: number;
    picture: string;
    name: string;
    description: string;
    job: string;
}

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/testimonial/');
            setTestimonials(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
        
        // Optional: Set up polling to refresh testimonials periodically
        const intervalId = setInterval(fetchTestimonials, 30000); // Refresh every 30 seconds
        
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    if (loading) return <div>Loading testimonials...</div>;
    if (error) return <div>Error loading testimonials: {error}</div>;

    return (
        <section className="testimonials-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <SectionTitle className="text-center mb-60">
                            <SectionTitle.Name>Testimonials</SectionTitle.Name>
                            <SectionTitle.Title>What <span>Amazing</span> people say about me</SectionTitle.Title>
                        </SectionTitle>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="testimonials-wrap">
                            <Swiper
                                navigation={{
                                    nextEl: ".testimonial-next",
                                    prevEl: ".testimonial-prev"
                                }}
                                loop
                                autoplay={{
                                    delay: 1500,
                                }}
                                speed={4000}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2
                                    }
                                }}
                                modules={[Navigation, Autoplay]}
                            >
                                {testimonials.map((testimonial) => (
                                    <SwiperSlide key={testimonial.id}>
                                        <Card 
                                            img={testimonial.picture} 
                                            name={testimonial.name} 
                                            position={testimonial.job} 
                                            review={testimonial.description} 
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="slider-arrows wow fadeInUp delay-0-6s text-center pt-40">
                            <button className="testimonial-prev">
                                <i className="fal fa-arrow-left" />
                            </button>
                            <button className="testimonial-next">
                                <i className="fal fa-arrow-right" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

type CardPropsType = {
    img: string;
    name: string;
    review: string;
    position: string;
}

const Card = ({ img, review, name, position }: CardPropsType) => {
    return (
        <div className="testimonial-item wow fadeInUp delay-0-3s">
            <div className="author">
            <img 
                    src={img} 
                    alt="Author" 
                    style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '2px solid #fff',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }} 
                />
            </div>
            <div className="text">{review}</div>
            <div className="testi-des">
                <h5>{name}</h5>
                <span>{position}</span>
            </div>
        </div>
    );
};

export default Testimonials;