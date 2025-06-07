import SectionTitle from "@components/ui/sectionTitle"
import SlideUp from "@utils/animations/slideUp"
import { useState, useEffect } from "react"

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [captchaText, setCaptchaText] = useState('');
    const [userCaptchaInput, setUserCaptchaInput] = useState('');
    const [captchaError, setCaptchaError] = useState(false);

    const generateCaptcha = () => {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setCaptchaText(result);
      return result;
    };

    useEffect(() => {
      generateCaptcha();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // CAPTCHA validation
      if (userCaptchaInput.toLowerCase() !== captchaText.toLowerCase()) {
        setCaptchaError(true);
        generateCaptcha();
        setUserCaptchaInput('');
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus(null);
      setCaptchaError(false);

      try {
          const response = await fetch('http://localhost:8000/api/contactme/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
          });

          if (response.ok) {
              setSubmitStatus('success');
              setFormData({
                  name: '',
                  email: '',
                  phone_number: '',
                  subject: '',
                  message: ''
              });
              setUserCaptchaInput('');
              generateCaptcha();
          } else {
              setSubmitStatus('error');
          }
      } catch (error) {
          setSubmitStatus('error');
          console.error('Error submitting form:', error);
      } finally {
          setIsSubmitting(false);
      }
    };

    return (
        <section id="contact" className="contact-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="contact-content-part pt-5 rpt-0 rmb-25 wow fadeInUp delay-0-2s">
                            <SectionTitle className="mb-40">
                                <SectionTitle.Name>Contact me</SectionTitle.Name>
                                <SectionTitle.Title>Let's Talk About your <span>Next Projects</span></SectionTitle.Title>
                                <SectionTitle.Description>I'm excited to hear about your vision and how we can bring it to life together. Whether you need a custom web application, API integration, or innovative UI/UX design, I'm here to help turn your ideas into reality. Let's collaborate and create something amazing!</SectionTitle.Description>
                            </SectionTitle>
                            
                            <SlideUp delay={2} className="single-contact wow fadeInUp">
                                <div className="contact-icon">
                                    <i className="fa fa-map" />
                                </div>
                                <h2>our office:</h2>
                                <p>United State</p>
                            </SlideUp>
                           
                            <SlideUp delay={3} className="single-contact">
                                <div className="contact-icon">
                                    <i className="fa fa-phone" />
                                </div>
                                <h2>contact number:</h2>
                                <p>+93 745222742 </p>
                            </SlideUp>
                            
                            <SlideUp delay={4} className="single-contact">
                                <div className="contact-icon">
                                    <i className="fa fa-envelope" />
                                </div>
                                <h2>Email us: </h2>
                                <p>nasirullahnasrat93@gmail.com</p>
                            </SlideUp>
                            
                        </div>
                    </div>
                    {/* START CONTACT FORM DESIGN AREA */}
                    <div className="col-lg-8">
                        <SlideUp delay={2} className="contact-form contact-form-area overflow-hidden">
                            <form id="contactForm" className="contactForm" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">Your Name</label>
                                            <input 
                                                type="text" 
                                                id="name" 
                                                name="name" 
                                                className="form-control" 
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Diego Liam" 
                                                required 
                                                data-error="Please enter your Name" 
                                            />
                                            <label htmlFor="name" className="for-icon"><i className="far fa-user" /></label>
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email" 
                                                className="form-control" 
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="hello@websitename.com" 
                                                required 
                                                data-error="Please enter your Email" 
                                            />
                                            <label htmlFor="email" className="for-icon"><i className="far fa-envelope" /></label>
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="phone_number">Phone Number</label>
                                            <input 
                                                type="text" 
                                                id="phone_number" 
                                                name="phone_number" 
                                                className="form-control" 
                                                value={formData.phone_number}
                                                onChange={handleChange}
                                                placeholder="+1234567890" 
                                                required 
                                                data-error="Please enter your Phone Number" 
                                            />
                                            <label htmlFor="phone_number" className="for-icon"><i className="far fa-phone" /></label>
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="subject">Subject</label>
                                            <input 
                                                type="text" 
                                                id="subject" 
                                                name="subject" 
                                                className="form-control" 
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Subject" 
                                                required 
                                                data-error="Please enter your Subject" 
                                            />
                                            <label htmlFor="subject" className="for-icon"><i className="far fa-text" /></label>
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="message">Message</label>
                                            <textarea 
                                                name="message" 
                                                id="message" 
                                                className="form-control" 
                                                rows={4} 
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Write Your message" 
                                                required 
                                                data-error="Please Write your Message" 
                                            />
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="captcha">CAPTCHA Verification</label>
                                            <div className="captcha-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div 
                                                    className="captcha-display" 
                                                    style={{
                                                        padding: '8px 15px',
                                                        background: '#f0f0f0',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px',
                                                        fontWeight: 'bold',
                                                        letterSpacing: '3px',
                                                        userSelect: 'none'
                                                    }}
                                                >
                                                    {captchaText}
                                                </div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => generateCaptcha()}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: '#666'
                                                    }}
                                                    title="Refresh CAPTCHA"
                                                >
                                                    <i className="fas fa-sync-alt" />
                                                </button>
                                                <input
                                                    type="text"
                                                    id="captcha"
                                                    name="captcha"
                                                    className="form-control"
                                                    value={userCaptchaInput}
                                                    onChange={(e) => {
                                                        setUserCaptchaInput(e.target.value);
                                                        setCaptchaError(false);
                                                    }}
                                                    placeholder="Enter the CAPTCHA above"
                                                    required
                                                    style={{ flex: 1 }}
                                                />
                                            </div>
                                            {captchaError && (
                                                <div className="text-danger" style={{ fontSize: '0.875em', marginTop: '5px' }}>
                                                    CAPTCHA verification failed. Please try again.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-0">
                                            <button 
                                                type="submit" 
                                                className="theme-btn"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Me Message'} <i className="far fa-angle-right" />
                                            </button>
                                            {submitStatus === 'success' && (
                                                <div className="mt-3 text-success">
                                                    Message sent successfully!
                                                </div>
                                            )}
                                            {submitStatus === 'error' && (
                                                <div className="mt-3 text-danger">
                                                    Error sending message. Please try again.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </SlideUp>
                    </div>
                    {/* / END CONTACT FORM DESIGN AREA */}
                </div>
            </div>
        </section>
    )
}

export default Contact