import SlideUp from "@utils/animations/slideUp"
import { clientLogoData } from "@utils/fackData/clientLogoData"

const Clients = () => {
    return (
        <div className="client-logo-area overflow-hidden">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <SlideUp delay={2}>
                            <div className="section-title text-center pt-5 mb-65">
                                <h6>
                                    I’ve worked with <span>300+ Global Clients</span> All over the world.
                                </h6>
                            </div>
                        </SlideUp>
                    </div>
                </div>
                <div className="client-logo-wrap">
                    {
                        clientLogoData.map(({ id, img }) => {
                            return (
                                <SlideUp key={id} delay={id} className="client-logo-item">
                                    <a href="#">
                                        <img src={img} alt="brand Logo" />
                                    </a>
                                </SlideUp>
                            )
                        })
                    }

                </div>
            </div>
        </div>

    )
}

export default Clients