import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionTitle from "@components/ui/sectionTitle"
import SlideUp from "@utils/animations/slideUp"

type SkillType = {
    id: number;
    name: string;
    category: string;
    proficiency: number;
    order: number;
}

const Skills = () => {
    const [skills, setSkills] = useState<SkillType[]>([]);
    
    const fetchSkills = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/skills/');
            // Sort skills by order field before setting state
            const sortedSkills = response.data.sort((a: SkillType, b: SkillType) => a.order - b.order);
            setSkills(sortedSkills);
        } catch (error) {
            console.error("Error fetching skills data:", error);
        }
    };
    
    useEffect(() => {
        fetchSkills(); // Initial fetch
        
        const intervalId = setInterval(() => {
            fetchSkills();
        }, 5000); // Fetch every 5 seconds
        
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <section id="skills" className="skill-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8">
                        <SectionTitle className="text-center mb-60">
                            <SectionTitle.Name>Pro Skills</SectionTitle.Name>
                            <SectionTitle.Title>Let's Explore Popular <span>Skills & Experience</span></SectionTitle.Title>
                        </SectionTitle>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="skill-items-wrap">
                            <div className="row">
                                {skills.map((skill) => (
                                    <Card 
                                        key={skill.id} 
                                        title={skill.name} 
                                        progress={`${skill.proficiency}%`} 
                                        img={skill.img} // Example path
                                        id={skill.id} 
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

export default Skills

type CardPropsType = {
    title: string,
    progress: string,
    img: string,
    id: number
}

const Card = ({ img, title, progress, id }: CardPropsType) => {
    return (
        <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
            <SlideUp delay={id}>
                <div className="skill-item">
                    <img src={img} alt={title} />
                    <h5>{title}</h5>
                    <span className="percent">{progress}</span>
                </div>
            </SlideUp>
        </div>
    )
}