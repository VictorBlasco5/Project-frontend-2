import "./Post.css"
import { CreatePost } from "../../services/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { CInput } from "../../common/CInput/CInput";
import { userData } from "../../app/slices/userSlice"

export const Post = () => {

    const reduxUser = useSelector(userData)
    const navigate = useNavigate()
    const token = reduxUser.credentials.token || ({});
    const [post, setPost] = useState({
        description:""
    })
    const imputHandler = (e) => {
        setPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const newAppointment = async () => {
        try {

            const fetched = await CreatePost(token, post)
            navigate("/profile")
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="postDesign">
            <CInput
                className={"cInputDesignPost "}
                type="text"
                name={"description"}
                value={post.description || ""}
                placeholder={"Escribe aquí..."}
                disabled={""}
                changeEmit={imputHandler}
            />
            <button
                onClick={() => newAppointment()}
            >Create post</button>
        </div>
    )
}