import "./Post.css"
import { CreatePost } from "../../services/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { CTextarea } from "../../common/CTextarea/CTextarea";
import { CInput } from "../../common/CInput/CInput";
import { validation } from "../../utils/functions";

export const Post = () => {

    const reduxUser = useSelector(userData)
    const navigate = useNavigate()
    const token = reduxUser.credentials.token || ({});
    const [post, setPost] = useState({
        description: ""
    })

    const [msgError, setMsgError] = useState("");
    const [msgSuccessfully, setMsgSuccessfully] = useState("");

    const [postError, setPostError] = useState({
        imageError: "",
        descriptionError: ""
    })

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value);

        setPostError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    const imputHandler = (e) => {
        setPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const newPost = async () => {
        try {
            const fetched = await CreatePost(token, post)
            // console.log(fetched,"hola");
            if (fetched && fetched.success) {
                
                setMsgSuccessfully("Post created")
                setTimeout(() => {
                    navigate("/profile")
                }, 1000)
            } 

        } catch (error) {
            setMsgError("que pasaaa");
            console.log(error);
        }
    }


    return (
        <div className="postDesign">
            <CInput
                className={`cInputNewPost ${postError.imageError !== "" ? "inputDesignError" : ""}`}
                type="text"
                name={"image"}
                placeholder={"Enter url"}
                value={post.image || ""}
                disabled={""}
                changeEmit={imputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{postError.imageError}</div>
            <CTextarea
                className={`cTextareaDesignPost ${postError.descriptionError !== "" ? "inputDesignError" : ""}`}
                type="text"
                name={"description"}
                value={post.description || ""}
                placeholder={"Write here..."}
                disabled={""}
                changeEmit={imputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{postError.descriptionError}</div>
            <button
                className="buttonCreatePost"
                onClick={() => newPost()}
            >Create post</button>
            <div className="successfully">{msgSuccessfully} </ div>
            <div className="error">{msgError} </ div>
        </div>
    )
}