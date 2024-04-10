import { Routes, Route, Navigate } from "react-router-dom"
import { Timeline } from "../Timeline/Timeline"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { Post } from "../Post/Post"
import { PostDetail } from "../PostDetail/PostDetail"
import { Admin } from "../Admin/Admin"


export const Body = () => {

    return (

    <Routes>
        {/* <Route path="*" element={<Navigate to={"/"} replace/>} /> */}
        <Route path="/" element={<Timeline />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/post" element={<Post />}/>
        <Route path="/post-detail" element={<PostDetail />}/>
        <Route path="/admin" element={<Admin />}/>
    </Routes>
    )
}