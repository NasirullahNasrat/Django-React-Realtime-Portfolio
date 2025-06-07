import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionTitle from "@components/ui/sectionTitle"
import SlideUp from "@utils/animations/slideUp"

type ServiceType = {
    id: number;
    title: string;
    description: string;
    icon: string;
}

const Services = () => {
    const [services, setServices] = useState<ServiceType[]>([]);
    
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/services/');
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services data:", error);
        }
    };
    
    useEffect(() => {
        fetchServices(); // Initial fetch
        
        const intervalId = setInterval(() => {
            fetchServices();
        }, 5000); // Fetch every 5 seconds
        
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <section id="services" className="services-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8">
                        <SectionTitle className="text-center mb-60">
                            <SectionTitle.Name>Services</SectionTitle.Name>
                            <SectionTitle.Title> My <span>Special Service</span> For your Website Development</SectionTitle.Title>
                        </SectionTitle>
                    </div>
                </div>
                <div className="row">
                    {services.map((service) => (
                        <Card 
                            key={service.id} 
                            title={service.title} 
                            description={service.description} 
                            icon={`fas fa-${service.icon}`} // Added 'fas fa-' prefix for Font Awesome
                            id={service.id} 
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services

type CardPropsType = {
    title: string,
    icon: string,
    description: string,
    id: number
}

const Card = ({ title, icon, description, id }: CardPropsType) => {
    return (
        <div className="col-lg-4 col-md-6">
            <SlideUp delay={id}>
                <div className="service-item">
                    <div className="content">
                        <i className={icon} />
                        <h4>{title}</h4>
                        <p>{description}</p>
                    </div>
                </div>
            </SlideUp>
        </div>
    )
}