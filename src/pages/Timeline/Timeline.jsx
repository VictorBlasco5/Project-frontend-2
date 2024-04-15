import "./Timeline.css"
import { useEffect, useState } from "react";
import { AddLike, GetPosts } from "../../services/apiCalls";
import { useSelector, useDispatch } from "react-redux"
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { updateDetail } from "../../app/slices/postDetailSlice";
import likes from "../../../img/like.png";

export const Timeline = () => {

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

        if (token) {
            getAllPosts()

        }
    }, [token])

    const getAllPosts = async () => {
        try {
            const fetched = await GetPosts(token)
            const postsWithLikes = fetched.map(post => ({
                ...post,
                likeCount: post.like.length // Calculo el número total de "me gusta" para cada post
            }));
            postsWithLikes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // ordeno los post de más nuevo a más antiguo
            setPosts(postsWithLikes)
        } catch (error) {
            console.log(error);
        }
    }

    const like = async (postId) => {
        try {
            const fetched = await AddLike(token, postId)
            getAllPosts()
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
                                        <img className="like" src={likes} alt="like" />
                                    </button>
                                    <span className="likeCount">{post.likeCount}</span> {/* Mostrar el número total de "me gusta" */}
                                </div>
                                <button
                                    className="card"
                                    onClick={() => handlePost(post)}>
                                    <div className="row">
                                        <div>{post?.userId?.name}</div>
                                        <div className="space1"></div>
                                        <div>{formatDate(post.createdAt)}</div>
                                    </div>
                                    <img className="image" src={post.image} alt="image" />
                                    <div>{post.description.length > 35 ? post.description.substring(0, 35) + "..." : post.description}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}