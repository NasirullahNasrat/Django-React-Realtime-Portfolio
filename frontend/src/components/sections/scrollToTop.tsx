import { useEffect, useRef, useState } from "react";

type Props = {
    showScrollTop: boolean
}
const ScrollToTop = ({ showScrollTop }: Props) => {
    const progressPathRef = useRef<any>(null);
    const [pathLength, setPathLength] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const offset = 150;
    // const duration = 550;

    useEffect(() => {
        const progressPath = progressPathRef.current;
        if (progressPath) {
            const length = progressPath.getTotalLength();
            setPathLength(length);

            // Initial path styles
            progressPath.style.transition = "none";
            progressPath.style.strokeDasharray = `${length} ${length}`;
            progressPath.style.strokeDashoffset = length;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = "stroke-dashoffset 10ms linear";
        }

        const updateProgress = () => {
            if (progressPath) {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight;
                const windowHeight = window.innerHeight;
                const progress = pathLength - (scrollTop * pathLength) / (docHeight - windowHeight);
                progressPath.style.strokeDashoffset = progress;
            }
        };

        const handleScroll = () => {
            updateProgress();
            setIsActive(window.scrollY > offset);
        };

        window.addEventListener("scroll", handleScroll);

        // Initial progress update
        updateProgress();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathLength, offset]);


    return (
        <div
            className={`progress-wrap cursor-pointer ${showScrollTop ? "active-progress" : ""}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <svg className={`progress-circle svg-content ${isActive ? "active-progress" : ""}`} width="100%" height="100%" viewBox="-1 -1 102 102">
                <path ref={progressPathRef} d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
            </svg>
        </div>

    )
}

export default ScrollToTop