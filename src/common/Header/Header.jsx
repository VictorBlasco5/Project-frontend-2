import "./Header.css"
import { CLink } from "../CLink/CLink"
import { useNavigate } from "react-router-dom";

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
            <div className="headerDesign">

                {
                    reduxUser?.credentials?.token

                        ? (
                            <div className="positionNavBar">
                                <CLink path="/" title="Timeline" />
                                <CLink path="/profile" title={reduxUser?.credentials?.user?.name} />
                                {reduxUser?.credentials?.user?.roleName === "super_admin"
                                    ? (
                                        <div ><CLink path="/admin" title="Admin" /></div>
                                    ) : (
                                        <div></div>
                                    )}
                                <div className="logOutDesign"

                                    onClick={() => dispatch(logout({ credentials: "" })) && navigate("/login")}>
                                    Log out
                                </div>
                            </div>

                        ) : (
                            <div className="positionNavBar">
                                <CLink path="/login" title="Login" />
                                <CLink path="/register" title="Register" />
                            </div>
                        )
                }
            </div>
        </>
    )
}