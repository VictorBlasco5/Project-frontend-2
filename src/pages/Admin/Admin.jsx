import { DeleteUsers, GetUsers } from "../../services/apiCalls";
import "./Admin.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"

export const Admin = () => {

    const [users, setUsers] = useState([])
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});


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
            {users.length > 0 ? (
                <div className="cardPosition">
                    {
                        users.map(
                            user => {
                                return (
                                    <>
                                        <div className="cardUser">
                                            <div>{user.name}</div>
                                            <div>{user.email}</div>
                                            <div>{user.role}</div>
                                            <button
                                                className="buttonDelete"
                                                onClick={() => userRemove(user._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )
                            }
                        )
                    }
                </div>
            ) : (
                <div>LOADING</div>
            )}
        </div>
    )
}
