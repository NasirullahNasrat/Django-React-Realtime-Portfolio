import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionTitle from "@components/ui/sectionTitle"
import SlideUp from "@utils/animations/slideUp"

type ExperienceType = {
    id: number;
    job_title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string;
    current: boolean;
    description: string;
    profile: number;
}

const Resume = () => {
    const [experiences, setExperiences] = useState<ExperienceType[]>([]);
    
    const fetchExperiences = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/profiles/1/experiences/');
            setExperiences(response.data);
        } catch (error) {
            console.error("Error fetching experience data:", error);
        }
    };
    
    useEffect(() => {
        fetchExperiences(); // Initial fetch
        
        const intervalId = setInterval(() => {
            fetchExperiences();
        }, 5000); // Fetch every 5 seconds
        
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <section id="resume" className="resume-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <SectionTitle className="mb-60 text-center">
                                    <SectionTitle.Name>My Resume</SectionTitle.Name>
                                    <SectionTitle.Title>Showcase Your <span>Talent</span> amplifing your impact</SectionTitle.Title>
                                </SectionTitle>
                            </div>
                        </div>
                        <div className="resume-items-wrap">
                            <div className="row justify-content-between">
                                {experiences.map((experience) => (
                                    <Card 
                                        key={experience.id} 
                                        companyName={experience.company} 
                                        title={experience.job_title} 
                                        years={`${experience.start_date} - ${experience.current ? 'Present' : experience.end_date}`} 
                                        id={experience.id} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Resume

type CardPropsType = {
    title: string,
    companyName: string,
    years: string,
    id: number
}

const Card = ({ title, companyName, years, id }: CardPropsType) => {
    return (
        <div className="col-xl-5 col-md-6">
            <SlideUp delay={id}>
                <div className="resume-item">
                    <div className="icon">
                        <i className="far fa-arrow-right" />
                    </div>
                    <div className="content">
                        <span className="years">{years}</span>
                        <h4>{title}</h4>
                        <span className="company">{companyName}</span>
                    </div>
                </div>
            </SlideUp>
        </div>
    )
}