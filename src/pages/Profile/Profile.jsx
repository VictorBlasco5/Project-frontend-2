import "./Profile.css"
import { useNavigate } from "react-router-dom"
import { userData } from "../../app/slices/userSlice"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { CInput } from "../../common/CInput/CInput";
import { GetProfile, UpdateProfile } from "../../services/apiCalls"
import { CButton } from "../../common/CButton/CButton"

export const Profile = () => {

    const navigate = useNavigate()
    const [change, setChange] = useState("disabled")

    //conectar con redux lectura

    const reduxUser = useSelector(userData)

    const [loadedData, setLoadedData] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
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
                console.log(fetched);

                setLoadedData(true)

                setUser({
                    name: fetched.data[0].name,
                    email: fetched.data[0].email,
                    role: fetched.data[0].role,
                })

            } catch (error) {
                console.log(error)
            }
        }

        if (!loadedData) {
            getUserProfile()
        }

    }, [user])

    const updateData = async () => {
        try {
            const fetched = await UpdateProfile(reduxUser.credentials.token, user)
            console.log(fetched,"holi");

            setChange("disabled")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="profileDesign">
                <CInput
                    className={`cInputDesign`}
                    type={"text"}
                    placeholder={""}
                    name={"name"}
                    value={user.name || ""}
                    disabled={change}
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
                <CInput
                    className={`cInputDesign`}
                    type={"role"}
                    placeholder={""}
                    name={"role"}
                    value={user.role || ""}
                    disabled={"disabled"}
                    onChangeFunction={(e) => inputHandler(e)}
                // onBlurFunction={(e) => checkError(e)}
                />

                <CButton
                    className={"cButtonDesign"}
                    title={change === "" ? "Confirm" : "Edit"}
                    functionEmit={change === "" ? updateData : () => setChange("")}
                />
            </div>
        </>
    )
}