import SlideUp from "@utils/animations/slideUp"
import { ReactNode } from "react"

interface Props {
    children: ReactNode,
    className?: string
}
const SectionTitle = ({ children, className }: Props) => {
    return (
        <SlideUp delay={2}>
            <div className={`section-title ${className}`}>
                {children}
            </div>
        </SlideUp>
    )
}

SectionTitle.Name = Name
SectionTitle.Title = Title
SectionTitle.Description = Description
export default SectionTitle

function Name({ children, className }: Props) {
    return <span className={`sub-title mb-15 ${className}`}>{children}</span>
}

function Title({ children }: Props) {
    return <h2>{children}</h2>
}

function Description({ children }: Props) {
    return <p>{children}</p>
}