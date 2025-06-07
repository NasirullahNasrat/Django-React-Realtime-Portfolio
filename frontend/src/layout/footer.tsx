const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-bottom pt-50 pb-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="copyright-text">
                                <p>
                                    Copyright @{new Date().getFullYear()}, <a href="#">Nasirullah Nasrat</a> All
                                    Rights Reserved.
                                </p>
                            </div>
                            <ul className="footer-bottom-nav">
                                <li><a href="https://af.linkedin.com/in/nasirullah-nasrat-b48a4b19a">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer