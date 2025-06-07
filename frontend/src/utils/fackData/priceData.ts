type DataType = {
    id: number,
    title: string,
    description: string,
    price: number,
    features: {
        id: number
        feature: string,
        available: boolean
    }[]
}[]
export const priceData: DataType = [
    {
        id: 1,
        title: "Basic",
        description: "Not have any design? <br/> Leave its for me",
        price: 15,
        features: [
            {
                id: 1,
                feature: "Need your wireframe",
                available: true
            },
            {
                id: 2,
                feature: "Design with Figma, Framer",
                available: true
            },
            {
                id: 3,
                feature: "Product Design",
                available: true
            },
            {
                id: 4,
                feature: "Digital Marketing",
                available: false
            },
            {
                id: 5,
                feature: "Custom Support",
                available: false
            },
        ]
    },
    {
        id: 2,
        title: "Standard",
        description: "Have design ready to build? <br/> or small budget",
        price: 59,
        features: [
            {
                id: 1,
                feature: "Website Design",
                available: true
            },
            {
                id: 2,
                feature: "Mobile Apps Design",
                available: true
            },
            {
                id: 3,
                feature: "Product Design",
                available: true
            },
            {
                id: 4,
                feature: "Digital Marketing",
                available: true
            },
            {
                id: 5,
                feature: "Custom Support",
                available: false
            },
        ]

    },
    {
        id: 3,
        title: "Premium",
        description: "Leave everything one me <br/> including hosting",
        price: 15,
        features: [
            {
                id: 1,
                feature: "Website Design",
                available: true
            },
            {
                id: 2,
                feature: "Mobile Apps Design",
                available: true
            },
            {
                id: 3,
                feature: "Product Design",
                available: true
            },
            {
                id: 4,
                feature: "Pro Digital Marketing",
                available: true
            },
            {
                id: 5,
                feature: "Vip Custom Support",
                available: true
            },
        ]
    },
]