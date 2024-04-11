import { DeletePosts, DeleteUsers, GetPosts, GetUsers } from "../../services/apiCalls";
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

        if (token) {
            getAllPosts()
        }
        console.log(getAllPosts, "posts");
    }, [token])

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


    const postsRemove = async (posts) => {
        try {
            const fetched = await DeletePosts(posts, token)
            getAllPosts()

        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="admin">
            <div className="containTable">
                <button className="buttonTableAdmin" onClick={handleShowUsers}>Users</button>
                <button className="buttonTableAdmin" onClick={handleShowPosts}>Posts</button>
            </div>
            <div className="admin">
                {showUsers ? (
                    <div>
                        <div className="table">
                            {users.length > 0 ? (
                                users.map(user => (
                                    <div key={user._id} >
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="name">{user.name}</th>
                                                    <th className="email">{user.email}</th>
                                                    <th className="role">{user.role}</th>
                                                    <button
                                                        className="buttonDelete"
                                                        onClick={() => userRemove(user._id)}>
                                                        Delete
                                                    </button>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                ))
                            ) : (
                                <div>LOADING</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div >
                        <div className="table">
                            {posts.length > 0 ? (
                                <div >
                                    {posts.map(post => (
                                        <div key={post._id}>
                                            <table>
                                                <thead>
                                                    <tr className="row">
                                                        <div className="numberLikes">
                                                            <th className="buttonLike" >
                                                                <img className="like" src="../../../img/like.png" alt="" />
                                                            </th>
                                                            <th className="numberLikes">{post.likeCount}</th> {/* Mostrar el número total de "me gusta" */}
                                                        </div>
                                                        <div

                                                            onClick={() => handlePost(post)}>
                                                            <th className="description">{post.description.length > 50 ? post.description.substring(0, 50) + "..." : post.description}</th>
                                                            <th className="date">{formatDate(post.createdAt)}</th>
                                                            {/* <div>{post.name}</div> */}
                                                        </div>
                                                        <button className="buttonDelete" onClick={() => postsRemove(post._id)}>Delete</button>
                                                        
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>LOADING</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
