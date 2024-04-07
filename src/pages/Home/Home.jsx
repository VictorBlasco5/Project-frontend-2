import "./Home.css"
import { useEffect, useState } from "react";
import { GetPosts } from "../../services/apiCalls";
import { PostCard } from "../../common/PostCard/PostCard";
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

                setPosts(fetched)
            } catch (error) {
                console.log(error);
            }
        }

        if (token) {
            getAllPosts()
        }
    }, [token])

    return (

        <>

            <div className="homeDesign">
                {posts.length > 0 ? (
                    <div className="positionPostCard">
                        {
                            posts.map(
                                post => {
                                    return (

                                        <PostCard
                                            key={post._id}
                                            description={post.description}
                                            datePost={post.createdAt}
                                            like={[post.like]}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                ) : (
                    <div>You dont have posts</div>
                )}
            </div>
        </>
    )
}