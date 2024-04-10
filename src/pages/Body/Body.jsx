import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { Post } from "../Post/Post"
import { PostDetail } from "../PostDetail/PostDetail"


export const Body = () => {

    return (

    <Routes>
        <Route path="*" element={<Navigate to={"/"} replace/>} />
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/post" element={<Post />}/>
        <Route path="/post-detail" element={<PostDetail />}/>
    </Routes>
    )
}