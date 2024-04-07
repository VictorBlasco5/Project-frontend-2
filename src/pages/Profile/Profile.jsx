import "./Profile.css"
import { useNavigate } from "react-router-dom"
import { userData } from "../../app/slices/userSlice"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { CInput } from "../../common/CInput/CInput";
import { AddLike, GetMyPosts, GetProfile, UpdateProfile } from "../../services/apiCalls"
import { CButton } from "../../common/CButton/CButton"
import { PostCard } from "../../common/PostCard/PostCard"

export const Profile = () => {

    const navigate = useNavigate()
    const [change, setChange] = useState("disabled")

    //conectar con redux lectura

    const reduxUser = useSelector(userData)
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
        const ownPosts = async () => {
            try {
                const fetched = await GetMyPosts(token)
                console.log(fetched, "fetched data");

                setPosts(fetched)
            } catch (error) {
                console.log(error);
            }
        }

        if (token) {
            ownPosts()
        }
    }, [token])



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
            console.log(fetched, "holi");

            setChange("disabled")

        } catch (error) {
            console.log(error);
        }
    }

    const like = async (postId) => {
        try {
            const fetched = await AddLike(reduxUser.credentials.token, postId)
            console.log(fetched, "like");

            const updatedPosts = posts.map(post => {
                if (post._id === postId) {
                    return { ...post, like: post.like + 1 };
                }
                return post;
            });
            setPosts(updatedPosts)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="profileDesign">
                <div className="dataProfile">
                <CInput
                    className={`cInputDesignProfile`}
                    type={"text"}
                    placeholder={""}
                    name={"name"}
                    value={user.name || ""}
                    disabled={change}
                    onChangeFunction={(e) => inputHandler(e)}
                // onBlurFunction={(e) => checkError(e)}
                />
                <CInput
                    className={`cInputDesignProfile`}
                    type={"email"}
                    placeholder={""}
                    name={"email"}
                    value={user.email || ""}
                    disabled={"disabled"}
                    onChangeFunction={(e) => inputHandler(e)}
                // onBlurFunction={(e) => checkError(e)}
                />
                <CInput
                    className={`cInputDesignProfile`}
                    type={"role"}
                    placeholder={""}
                    name={"role"}
                    value={user.role || ""}
                    disabled={"disabled"}
                    onChangeFunction={(e) => inputHandler(e)}
                // onBlurFunction={(e) => checkError(e)}
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
                        {
                            posts.map(
                                post => {
                                    return (
                                        <div className="card">

                                            {/* {post._id} */}
                                            <div>{post.description}</div>
                                            <div>{post.createdAt}</div>
                                            <div>{[post.like]}</div>
                                            <button onClick={()=>like(post._id)}>like</button>
                                        </div>
                                        
                                    )
                                }
                            )
                        }
                    </div>
                ) : (
                    <div>You dont have posts</div>
                )}
                </div>
            </div>







        </>
    )
}