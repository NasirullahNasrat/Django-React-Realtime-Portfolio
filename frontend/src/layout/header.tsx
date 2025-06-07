import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { menuList } from "@utils/fackData/menuList"

type Props = {
    isFixed: boolean
}
const Header = ({ isFixed }: Props) => {

    return (
        <header className={`main-header menu-absolute ${isFixed ? "fixed-header" : ""}`}>
            <div className="header-upper">
                <div className="container">
                    <div className="header-inner d-flex align-items-center">
                        <div className="logo-outer">
                            <div className="logo">
                                <Link to="/">
                                    <img src="/images/logos/logo.png" alt="Logo" title="Logo" />
                                </Link>
                            </div>
                        </div>

                        <div className="nav-outer">
                            {/* Main Menu */}
                            <nav className="main-menu navbar-expand-lg">
                                <div className="navbar-header">
                                    <div className="mobile-logo my-15">
                                        <Link to="/">
                                            <img src="/images/logos/logo.png" alt="Logo" title="Logo" />
                                        </Link>
                                    </div>
                                    {/* Toggle Button */}
                                    <button type="button" className="navbar-toggle me-4" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                </div>
                                <div className="navbar-collapse collapse">
                                    <ul className="navigation onepage clearfix">
                                        {
                                            menuList.map(({ id, label, path }) =>
                                                <li key={id}>
                                                    <ScrollLink className="nav-link-click" to={path} smooth={true}>{label}</ScrollLink>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header