import { DeleteUsers, GetUsers } from "../../services/apiCalls";
import "./Admin.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"

export const Admin = () => {

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
                    <div>Posts Content</div>
                )}
            </div>
        </div>
    );
}
