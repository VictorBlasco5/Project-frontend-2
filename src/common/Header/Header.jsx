import "./Header.css"
import { CLink } from "../CLink/CLink"

//redux
import { useSelector, useDispatch } from "react-redux"
import { userData, logout } from "../../app/slices/userSlice"
import { useEffect } from "react"

export const Header = () => {

    //instancia conexion lectura
    const reduxUser = useSelector(userData)

    //intancia conexion escritura
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(reduxUser, "credenciales auth");
    }, [reduxUser])

    return (

        <>
            <div className="headerDesign">
                <CLink
                    path="/"
                    title="Home"
                />
                {
                    reduxUser?.credentials?.token

                        ? (
                            <div className="positionNavBar">
                                <CLink path="/profile" title={reduxUser?.credentials?.user?.name} />
                                <div className="logOutDesign"
                                    onClick={() => dispatch(logout({ credentials: "" }))}>
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