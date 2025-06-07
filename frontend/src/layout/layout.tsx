import { Outlet } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import ScrollToTop from '@components/sections/scrollToTop'
import { useEffect, useState } from 'react'
import Loading from '@components/ui/loading'

const Layout = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDark, setIsDark] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    if (currentTheme === 'dark') {
      setIsDark(true)
      document.querySelector("body")?.classList.add('dark-version')
    }
    else {
      document.querySelector("body")?.classList.remove('dark-version')
      setIsDark(false)
    }

    const handleScroll = () => {
      const windowPos = window.scrollY;
      if (windowPos >= 250) {
        setIsFixed(true);
        setShowScrollTop(true);
      } else {
        setIsFixed(false);
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    setTimeout(() => {
      setLoading(false)
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // theme dark and light mode change
  const handleThemeMode = (type: string) => {
    if (type === 'dark') {
      document.querySelector("body")?.classList.add('dark-version')
      localStorage.setItem('theme', "dark")
      setIsDark(true)
    } else {
      document.querySelector("body")?.classList.remove('dark-version')
      localStorage.setItem('theme', "light")
      setIsDark(false)
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Header isFixed={isFixed} />
      <Outlet />
      <Footer />
      <ScrollToTop showScrollTop={showScrollTop} />
      <div className='theme-mode'>
        <i className="fa fa-sun" style={{ display: isDark ? "block" : "none" }} onClick={() => handleThemeMode('light')}></i>
        <i className="fa fa-moon" style={{ display: isDark ? "none" : "block" }} onClick={() => handleThemeMode('dark')}></i>
      </div>
    </>
  )
}

export default Layout