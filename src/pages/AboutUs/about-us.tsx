import { useLocation } from "react-router-dom"
const AboutUs: React.FC = () => {
    const location = useLocation()
    const destructured = location.state
    const {
        obj
    }: any = destructured
    return (
        <>
            {console.log(obj)}
            <h3>
                About us
            </h3>
        </>
    )
}

export default AboutUs