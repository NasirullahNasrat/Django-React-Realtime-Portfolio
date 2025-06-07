import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SlideUp from '@utils/animations/slideUp';
import CountUp from 'react-countup';
import { useInView } from "react-intersection-observer";
import SectionTitle from "@components/ui/sectionTitle"

const About = () => {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true
    });
    
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    
    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/profiles/');
            setProfile(response.data[0]); // Assuming there's at least one profile
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };
    
    const fetchSkills = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/skills/');
            setSkills(response.data);
        } catch (error) {
            console.error("Error fetching skills data:", error);
        }
    };
    
    useEffect(() => {
        fetchProfile(); // Initial fetch
        fetchSkills(); // Initial skills fetch
        
        const intervalId = setInterval(() => {
            fetchProfile();
            fetchSkills();
        }, 5000); // Fetch every 5 seconds
        
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <section id="about" className="about-area">
            <div className="container">
                <div className="row gap-100 align-items-center">
                    {/* START ABOUT IMAGE DESIGN AREA */}
                    <div className="col-lg-5">
                        <SlideUp delay={3}>
                            <div className="about-image-part">
                            {profile && (
                                <img src={profile.profile_picture} alt="About Me" />
                                )}
                                <div className="about-btn btn-one wow fadeInRight delay-0-4s">
                                    <h6>Available for Work</h6>
                                    <div className="circle pulse color-pulse" />
                                </div>
                                <div className="dot-shape">
                                    <img src="/images/shape/about-dot.png" alt="Shape" />
                                </div>
                            </div>
                        </SlideUp>
                    </div>
                    {/* / END ABOUT IMAGE DESIGN AREA */}
                    {/* START ABOUT TEXT DESIGN AREA */}
                    <div className="col-lg-7">
                        <div className="about-content-part rel z-2 rmb-55">
                        {profile && (
                            <SectionTitle className="mb-35">
                                <SectionTitle.Name>About Me</SectionTitle.Name>
                                <SectionTitle.Title> {profile.short_bio}</SectionTitle.Title>
                                <SectionTitle.Description>{profile.bio}</SectionTitle.Description>
                            </SectionTitle>
                        )}
                            <SlideUp delay={2}>
                                <ul className="list-style-one two-column">
                                    {skills.map((skill) => (
                                        <li key={skill.id}>{skill.name}</li>
                                    ))}
                                </ul>
                            </SlideUp>
                        </div>
                    </div>
                    {/* / END ABOUT TEXT DESIGN AREA */}
                </div>
            </div>
        </section>
    )
}

export default About