import "./Header.css"
import { CLink } from "../CLink/CLink"

export const Header = () => {

    return (

        <>
            <div className="headerDesign">
                <CLink
                    path="/"
                    title="Home"
                />
                <CLink
                    path="/login"
                    title="Login"
                />
                <CLink
                    path="/register"
                    title="Register"
                />
            </div>
        </>
    )
}