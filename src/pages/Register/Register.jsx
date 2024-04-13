import "./Register.css"
import { CInput } from "../../common/CInput/CInput"
import { useState } from "react"
import { RegisterUser } from "../../services/apiCalls";
import { validation } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

export const Register = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        passwordError: ""
    })

    const [msgError, setMsgError] = useState("")
    const [msgSuccessfully, setMsgSuccessfully] = useState("");

    const imputHandler = (e) => {
        setUser(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value)
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))
    }

    const registerMe = async () => {

        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("All fields must be completed");
                }
            }
            setMsgError("")
            const fetched = await RegisterUser(user);
            setMsgSuccessfully(fetched.message)
            setTimeout(() => {
                navigate("/")
            }, 500)

        } catch (error) {
            setMsgError(error.message);
            console.log(error)
        }
    };

    return (
        <>
            <div className="registerDesign">
                <CInput
                    className={`cInputDesign ${userError.nameError !== "" ? "inputDesignError" : ""}`}
                    placeholder={"Name"}
                    type={"text"}
                    name={"name"}
                    value={user.name || ""}
                    changeEmit={(e) => imputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.nameError}</div>
                <CInput
                    className={`cInputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                    placeholder={"Email"}
                    type={"email"}
                    name={"email"}
                    value={user.email || ""}
                    changeEmit={(e) => imputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.emailError}</div>
                <CInput
                    className={`cInputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""}`}
                    placeholder={"Password"}
                    type={"password"}
                    name={"password"}
                    value={user.password || ""}
                    changeEmit={(e) => imputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.passwordError}</div>
                <button className="buttonLogin" onClick={registerMe}>Register</button>
                <div className="error">{msgError} </ div>
                <div className="successfully">{msgSuccessfully} </ div>
            </div>
        </>
    )
}