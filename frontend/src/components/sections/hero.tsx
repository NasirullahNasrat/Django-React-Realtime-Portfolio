import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SlideUp from '@utils/animations/slideUp';
import CountUp from 'react-countup';
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/profiles/');
      setProfile(response.data[0]); // Assuming there's at least one profile
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfile(); // Initial fetch

    const intervalId = setInterval(fetchProfile, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <section id="home" className="main-hero-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12 col-sm-12">
            <SlideUp className="hero-content rmb-25 text-center">
              {profile ? (
                <>
                  <h2>Hi! 👋 My name is {profile.full_name}</h2>
                  <h1>{profile.title}</h1>
                  <p>{profile.bio}</p>
                  <div className="hero-btns">
                    <a href={profile.website} className="theme-btn">Hire Me <i className="far fa-angle-right" /></a>
                  </div>
                </>
              ) : (
                <p>Loading profile...</p> // Optional loading state
              )}
            </SlideUp>

            <SlideUp delay={2}>
              <div ref={ref} className="hero-counter-area d-flex justify-content-around wow fadeInUp delay-0-4s">
                <div className="counter-item counter-text-wrap">
                  <span className="count-text plus">{profile && inView && <CountUp end={profile.experience} />}</span>
                  <span className="counter-title">Years Of Experience</span>
                </div>
                <div className="counter-item counter-text-wrap">
                  <span className="count-text">{profile && inView && <CountUp end={profile.complete_projects} />}</span>
                  <span className="counter-title">Complete Projects</span>
                </div>
                <div className="counter-item counter-text-wrap">
                  <span className="count-text percent">{profile && inView && <CountUp end={profile.client_satisfaction} />}</span>
                  <span className="counter-title">Client Satisfaction</span>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;