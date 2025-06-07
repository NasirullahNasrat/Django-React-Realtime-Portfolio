type DataType = {
    id: number
    title: string,
    img:string,
    description: string,
    date: string
}[]

export const blogData: DataType = [
    {
        id: 1,
        title: "Spotlight — Equinox Collection by Shane Griffin",
        img:"/images/blog/blog1.jpg",
        description: "Looking for inspiration to kick it off, I stumbled across the work of Shane Griffin, an artist and director based in New York...",
        date: "January 15, 2024"
    },
    {
        id: 2,
        title: "Random Explorations with Cinema 4D and Redshift",
        img:"/images/blog/blog2.jpg",
        description: "Nidia Dias is a 3D designer based in the Portugal with an incredible portfolio. From the professional work done with...",
        date: "February 22, 2024"
    },
    {
        id: 3,
        title: "Visually Identity and Branding for Mexican Restaurant",
        img:"/images/blog/blog3.jpg",
        description: "Anta Petrenco shared a beautiful visual identity, branding and packaging design project on their Behance profile...",
        date: "March 12, 2023"
    },
]