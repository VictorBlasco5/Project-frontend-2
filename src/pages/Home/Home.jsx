import "./Home.css"
import { useEffect, useState } from "react";
import { AddLike, GetPosts } from "../../services/apiCalls";
import { useSelector, useDispatch } from "react-redux"
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { updateDetail } from "../../app/slices/postDetailSlice";


export const Home = () => {

    //conectar con redux lectura

    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});

    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handlePost = async (post) => {
        try {
            dispatch(updateDetail({ detail: post }))
            navigate("/post-detail")

        } catch (error) {

        }
    };

    useEffect(() => {

        const getAllPosts = async () => {
            try {
                const fetched = await GetPosts(token)
                const postsWithLikes = fetched.map(post => ({
                    ...post,
                    likeCount: post.like.length // Calcula el número total de "me gusta" para cada post
                }));
                setPosts(postsWithLikes)
            } catch (error) {
                console.log(error);
            }
        }

        if (token) {
            getAllPosts()
        }
    }, [token])

    const like = async (postId) => {
        try {
            const fetched = await AddLike(token, postId)
            console.log(fetched);

            if (fetched && fetched.like) {
                const updatedPostIndex = posts.findIndex((post) => post._id === fetched._id);
                if (updatedPostIndex !== -1) {
                    const updatedPost = {
                        ...fetched,
                        likeCount: fetched.like.length,
                    };

                    const updatedPosts = [...posts];
                    updatedPosts[updatedPostIndex] = updatedPost;
                    setPosts(updatedPosts);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <>
            <div className="homeDesign">
                {posts.length > 0 ? (
                    <div className="positionPostCard">
                        {posts.map(post => (
                            <div className="card" key={post._id}>
                                <div className="numberLikes">
                                    <button className="buttonLike" onClick={() => like(post._id)}>
                                        <img className="like" src="../../../img/like.png" alt="" />
                                    </button>
                                    <span>{post.likeCount}</span> {/* Mostrar el número total de "me gusta" */}
                                </div>
                                <button
                                     
                                    className="card"
                                    onClick={() => handlePost(post)}>
                                    <div>{post.description.length > 20 ? post.description.substring(0,20) + "..." : post.description}</div>
                                    <div>{formatDate(post.createdAt)}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>You dont have posts</div>
                )}
            </div>
        </>
    )
}