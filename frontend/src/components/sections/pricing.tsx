import SlideUp from "@utils/animations/slideUp"
import { priceData } from "@utils/fackData/priceData"

const Pricing = () => {
    return (
        <section className="pricing-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                            <span className="sub-title mb-15">My Pricing</span>
                            <h2>Amazing <span>Pricing</span> For your Projects</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {
                        priceData.map(({ description, features, id, price, title }) =>
                            <Card key={id} title={title} description={description} price={price} features={features} id={id} />
                        )
                    }
                </div>
            </div>
        </section>

    )
}

export default Pricing

type CardPropsType = {
    title: string,
    description: string,
    price: number,
    id: number,
    features: {
        id: number
        feature: string,
        available: boolean
    }[]
}
const Card = ({ title, price, description, features, id }: CardPropsType) => {
    return (
        <div className="col-lg-4 col-md-6">
            <SlideUp delay={id}>
                <div className="pricing-item wow fadeInUp delay-0-2s">
                    <div className="pricing-header">
                        <h4 className="title">{title}</h4>
                        <p className="save-percent" dangerouslySetInnerHTML={{ __html: description }} />
                        <span className="price">{price}</span>
                    </div>
                    <div className="pricing-details">
                        <ul>
                            {
                                features.map(({ available, feature, id }) => <li key={id} className={`${available ? "" : "unable"}`}>{feature}</li>)
                            }
                        </ul>
                        <a href="#" className="theme-btn">Order Now <i className="far fa-angle-right" /></a>
                    </div>
                </div>
            </SlideUp>
        </div>
    )
}