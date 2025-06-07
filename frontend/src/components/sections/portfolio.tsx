import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@components/ui/sectionTitle"
import { useEffect, useState } from "react";
import SlideUp from "@utils/animations/slideUp";
import axios from "axios";

type TechnologyType = {
    id: number;
    name: string;
    category: string;
    proficiency: number;
    order: number;
    img: string;
}

type ProjectType = {
    id: number;
    technologies: TechnologyType[];
    title: string;
    description: string;
    image: string;
    project_url: string;
    github_url: string;
    date_completed: string | null;
    featured: boolean;
}

const animations = [
    { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
    { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 50, opacity: 0 } },
    { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 } },
];

const Portfolio = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [filterData, setFilterData] = useState<ProjectType[]>([]);
    const [activeTab, setActiveTab] = useState('show all');
    const [animation, setAnimation] = useState(animations[0]);
    const [categories, setCategories] = useState<string[]>(['show all']);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/projects/');
            setProjects(response.data);
            
            // Extract unique categories from technologies
            const allCategories = new Set<string>();
            response.data.forEach((project: ProjectType) => {
                project.technologies.forEach(tech => {
                    if (tech.category) {
                        allCategories.add(tech.category.toLowerCase());
                    }
                });
            });
            
            setCategories(['show all', ...Array.from(allCategories)]);
            setFilterData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoading(false);
        }
    };

    const handleTabSelect = (category: string) => {
        setActiveTab(category);
        setAnimation(animations[Math.floor(Math.random() * animations.length)]);

        if (category === "show all") {
            setFilterData(projects);
        } else {
            const filtered = projects.filter(project => 
                project.technologies.some(tech => 
                    tech.category.toLowerCase() === category
                )
            );
            setFilterData(filtered);
        }
    };

    useEffect(() => {
        fetchProjects();
        
        const intervalId = setInterval(() => {
            fetchProjects();
        }, 5000);
        
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <div className="container text-center py-5">Loading projects...</div>;
    }

    return (
        <section id="portfolio" className="projects-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <SectionTitle className="text-center mb-60">
                            <SectionTitle.Name>Latest Works</SectionTitle.Name>
                            <SectionTitle.Title>View My Latest <span>Works</span></SectionTitle.Title>
                        </SectionTitle>
                    </div>
                </div>
                <ul className="project-filter filter-btns-one justify-content-center pb-35 wow fadeInUp delay-0-2s">
                    {categories.map((category, index) => (
                        <li 
                            key={index} 
                            onClick={() => handleTabSelect(category)} 
                            className={`${activeTab === category ? "current" : ""} text-capitalize`}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
                <div className="row project-masonry-active">
                    <AnimatePresence mode="wait">
                        {filterData.map((project) => (
                            <motion.div
                                key={project.id}
                                {...animation}
                                transition={{ duration: 0.4 }}
                                className="col-lg-4 col-md-6 item"
                            >
                                <Card 
                                    title={project.title} 
                                    img={project.image} 
                                    category={project.technologies[0]?.category || 'Uncategorized'} 
                                    id={project.id} 
                                    projectUrl={project.project_url}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

type CardPropsType = {
    title: string;
    img: string;
    category: string;
    id: number;
    projectUrl: string;
}

const Card = ({ img, title, category, id, projectUrl }: CardPropsType) => {
    return (
        <SlideUp delay={id}>
            <div className="project-item style-two wow fadeInUp delay-0-2s">
                <div className="project-image">
                    <img src={img} alt={title} />
                    <a href={projectUrl || "#"} className="details-btn">
                        <i className="far fa-arrow-right" />
                    </a>
                </div>
                <div className="project-content">
                    <span className="sub-title">{category}</span>
                    <h3><a href={projectUrl || "#"}>{title}</a></h3>
                </div>
            </div>
        </SlideUp>
    )
}

export default Portfolio;