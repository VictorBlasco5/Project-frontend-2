import { DeleteUsers, GetPosts, GetUsers } from "../../services/apiCalls";
import "./Admin.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"

export const Admin = () => {

    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});
    const [showUsers, setShowUsers] = useState(true);


    const handleShowUsers = () => {
        setShowUsers(true);
    };

    const handleShowPosts = () => {
        setShowUsers(false);
    };

    useEffect(() => {
        if (users.length === 0) {
            const recoverUsers = async () => {
                try {

                    const fetched = await GetUsers(token)
                    console.log(fetched);
                    setUsers(fetched.data)

                } catch (error) {
                    console.log(error);
                }
            }
            recoverUsers()
        }
    }, [users])


    const userRemove = async (userId) => {
        try {
            await DeleteUsers(userId, token)
            const updatedUsers = await GetUsers(token);
            setUsers(updatedUsers.data);

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {

        const getAllPosts = async () => {
            try {
                const fetched = await GetPosts(token)
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

        if (token) {
            getAllPosts()
        }
    }, [token, posts])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="admin">
            <button onClick={handleShowUsers}>Users</button>
            <button onClick={handleShowPosts}>Posts</button>
            <div>
                {showUsers ? (
                    <div className="cardPosition">
                        {users.length > 0 ? (
                            users.map(user => (
                                <div key={user._id} className="cardUser">
                                    <div>{user.name}</div>
                                    <div>{user.email}</div>
                                    <div>{user.role}</div>
                                    <button
                                        className="buttonDelete"
                                        onClick={() => userRemove(user._id)}>
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div>LOADING</div>
                        )}
                    </div>
                ) : (
                    <div>
                        
                        {posts.length > 0 ? (
                            <div className="positionPostCard">
                                {posts.map(post => (
                                    <div className="card" key={post._id}>
                                        <div className="numberLikes">
                                            <div className="buttonLike" >
                                                <img className="like" src="../../../img/like.png" alt="" />
                                            </div>
                                            <span>{post.likeCount}</span> {/* Mostrar el número total de "me gusta" */}
                                        </div>
                                        <div

                                            className="card"
                                            onClick={() => handlePost(post)}>
                                            <div>{post.description.length > 20 ? post.description.substring(0, 20) + "..." : post.description}</div>
                                            <div>{formatDate(post.createdAt)}</div>
                                            {/* <div>{post.name}</div> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>LOADING</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
