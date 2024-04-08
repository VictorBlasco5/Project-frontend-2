import "./Home.css"
import { useEffect, useState } from "react";
import { AddLike, GetPosts } from "../../services/apiCalls";
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice";

export const Home = () => {

    //conectar con redux lectura

    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const fetched = await GetPosts(token)
                console.log(fetched, "fetched data");

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
                                <div>{post.createdAt}</div>
                                <div>{post.description}</div>
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