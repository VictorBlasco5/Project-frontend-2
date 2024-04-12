import "./Post.css"
import { CreatePost } from "../../services/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { CTextarea } from "../../common/CTextarea/CTextarea";
import { CInput } from "../../common/CInput/CInput";

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

    const newPost = async () => {
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
            className={"cInputNewPost"}
            type="text"
            name={"image"}
            placeholder={"Introduce url"}
            value={post.image || ""}
            disabled={""}
            changeEmit={imputHandler}
            />
            
            <CTextarea
                className={"cTextareaDesignPost"}
                type="text"
                name={"description"}
                value={post.description || ""}
                placeholder={"Escribe aquí..."}
                disabled={""}
                changeEmit={imputHandler}
            />
            <button
                className="buttonCreatePost"
                onClick={() => newPost()}
            >Create post</button>
        </div>
    )
}