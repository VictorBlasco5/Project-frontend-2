import "./Profile.css"
import { useNavigate } from "react-router-dom"
import { updatedUser, userData } from "../../app/slices/userSlice"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { CInput } from "../../common/CInput/CInput";
import { AddLike, DeletePosts, GetMyPosts, GetProfile, UpdateProfile } from "../../services/apiCalls"
import { CButton } from "../../common/CButton/CButton"
import likes from "../../../img/like.png";

export const Profile = () => {

    const navigate = useNavigate()
    const [change, setChange] = useState("disabled")

    //conectar con redux lectura

    const reduxUser = useSelector(userData)
    const dispatch = useDispatch();
    const token = reduxUser.credentials.token || ({});
    const [posts, setPosts] = useState([])
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

        if (token) {
            ownPosts()
        }
    }, [token])

    const ownPosts = async () => {
        try {
            const fetched = await GetMyPosts(token)
            const postsWithLikes = fetched.map(post => ({
                ...post,
                likeCount: post.like.length // Calcula el número total de "me gusta" para cada post
            }));
            postsWithLikes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // ordeno los post de más nuevo a más antiguo
            setPosts(postsWithLikes)
        } catch (error) {
            console.log(error);
        }
    }

    const postsRemove = async (posts) => {
        try {
            const fetched = await DeletePosts(posts, token)
            const update = await ownPosts();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!reduxUser.credentials.token) {
            navigate("/")
        }
    }, [reduxUser])

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const fetched = await GetProfile(reduxUser.credentials.token)
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
            setUser((prevState) => ({
                ...prevState,
                name: fetched.data.name || prevState.name,
            }));
            dispatch(updatedUser({ credentials: { ...reduxUser.credentials, user: { ...reduxUser.credentials.user, name: user.name } } }));
            setChange("disabled")

        } catch (error) {
            console.log(error);
        }
    }

    const like = async (postId) => {
        try {
            const fetched = await AddLike(token, postId)
            ownPosts()
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <>
            <div className="profileDesign">
                <div className="dataProfile">
                    <button
                        className="buttonNewPost"
                        onClick={() => navigate("/post")}>New post</button>
                    <div className="space"></div>
                    <CInput
                        className={`cInputDesignProfile`}
                        type={"text"}
                        placeholder={""}
                        name={"name"}
                        value={user.name || ""}
                        disabled={change}
                        changeEmit={(e) => inputHandler(e)}
                    />
                    <CInput
                        className={`cInputDesignProfile`}
                        type={"email"}
                        placeholder={""}
                        name={"email"}
                        value={user.email || ""}
                        disabled={"disabled"}
                    />
                    <CInput
                        className={`cInputDesignProfile`}
                        type={"role"}
                        placeholder={""}
                        name={"role"}
                        value={user.role || ""}
                        disabled={"disabled"}
                    />
                    <CButton
                        className={"cButtonDesignProfile"}
                        title={change === "" ? "Confirm" : "Edit"}
                        functionEmit={change === "" ? updateData : () => setChange("")}
                    />
                </div>
                <div className="profileDesign">
                    {posts.length > 0 ? (
                        <div className="positionPostCard">
                            {posts.map(post => (
                                <div className="cardProfile" key={post._id}>
                                    <div className="numberLikes">
                                        <button className="buttonLikeProfile" onClick={() => like(post._id)}>
                                            <img className="like" src={likes} alt="like" />
                                        </button>
                                        <span className="likeCountProfile">{post.likeCount}</span> {/* Mostrar el número total de "me gusta" */}
                                    </div>
                                    <div>{formatDate(post.createdAt)}</div>
                                    <img className="imageProfile" src={post.image} alt="image" />
                                    <div>{post.description}</div>
                                    <button
                                        className="buttonDelete"
                                        onClick={() => postsRemove(post._id)}>
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>You dont have posts</div>
                    )}
                </div>
            </div>
        </>
    )
}