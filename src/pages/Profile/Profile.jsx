import "./Profile.css"
import { useNavigate } from "react-router-dom"
import { userData } from "../../app/slices/userSlice"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { CInput } from "../../common/CInput/CInput";
import { GetProfile } from "../../services/apiCalls"

export const Profile = () => {

    const navigate = useNavigate()

    //conectar con redux lectura

    const reduxUser = useSelector(userData)

    const [loadedData, setLoadedData] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
    })

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (!reduxUser.credentials.token) {
            navigate("/")
        }
    }, [reduxUser])

    useEffect(() => {

        const getUserProfile = async () => {
            try {

                const fetched = await GetProfile(reduxUser.credentials.token)
                console.log(fetched, "goasdas");

                setLoadedData(true)

                setUser({
                    name: fetched.data[0].name,
                    email: fetched.data[0].email,
                })

            } catch (error) {
                console.log(error)
            }
        }

        if (!loadedData) {
            getUserProfile()
        }

    }, [user])

    return (
        <>
            <div className="profileDesign">
                <CInput
                    className={`cInputDesign`}
                    type={"text"}
                    placeholder={""}
                    name={"name"}
                    value={user.name || ""}
                    disabled={"disabled"}
                    onChangeFunction={(e) => inputHandler(e)}
                // onBlurFunction={(e) => checkError(e)}
                />
                <CInput
                    className={`cInputDesign`}
                    type={"email"}
                    placeholder={""}
                    name={"email"}
                    value={user.email || ""}
                    disabled={"disabled"}
                    onChangeFunction={(e) => inputHandler(e)}
                // onBlurFunction={(e) => checkError(e)}
                />
            </div>
        </>
    )
}