import "./Header.css"
import { CLink } from "../CLink/CLink"
import { useNavigate } from "react-router-dom";
import capibara from "../../../img/cap.png";

//redux
import { useSelector, useDispatch } from "react-redux"
import { userData, logout } from "../../app/slices/userSlice"
import { useEffect } from "react"

export const Header = () => {

    //instancia conexion lectura
    const reduxUser = useSelector(userData)

    //intancia conexion escritura
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {

    }, [reduxUser])

    return (

        <>
            <div className="navBar">
                <div className="capNavBar">
                    <div className="capyConn"><img className="icon" src={capibara} alt="capibara" />CapyConn  </div>
                </div>
                <div className="headerDesignRight">
                    <div>
                        {
                            reduxUser?.credentials?.token
                                ? (
                                    <div className="positionNavBarRight">
                                        <CLink path="/timeline" title="Timeline" />
                                        <CLink path="/profile" title={reduxUser?.credentials?.user?.name} />
                                        {reduxUser?.credentials?.user?.roleName === "super_admin"
                                            ? (
                                                <div ><CLink path="/admin" title="Admin" /></div>
                                            ) : (
                                                <div></div>
                                            )}
                                        <div className="clinkDesign"
                                            onClick={() => dispatch(logout({ credentials: "" })) && navigate("/")}>
                                            Log out
                                        </div>
                                    </div>
                                ) : (
                                    <div className="positionNavBar">
                                        <CLink path="/" title="Login" />
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}