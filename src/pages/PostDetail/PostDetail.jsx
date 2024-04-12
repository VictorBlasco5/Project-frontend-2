import "./PostDetail.css"
import { detailData } from "../../app/slices/postDetailSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { AddLike } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice";


export const PostDetail = () => {

    const reduxUser = useSelector(userData)
    const detailRdx = useSelector(detailData);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const token = reduxUser.credentials.token || ({});

    useEffect(() => {

        if (!detailRdx?.detail) {
            navigate("/post-detail");
        }
    }, [detailRdx]);


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
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="postDetailDesign">
            <div className="cardDetail">

                < div className="numberLikes" >
                    <button className="buttonLike" onClick={() => like(detailRdx?.detail?._id)}>
                        <img className="like" src="../../../img/like.png" alt="" />
                    </button>
                    <span>{detailRdx?.detail?.likeCount}</span> {/* Mostrar el número total de "me gusta" */}
                </div>
                <div className="row">
                    <div> {detailRdx?.detail?.userId?.name} </div>
                    <div className="space2"></div>
                    <div> {formatDate(detailRdx?.detail?.createdAt)}</div>
                </div>
                <img className="image" src={detailRdx?.detail?.image} alt="image" />
                <div> {detailRdx?.detail?.description}</div>
            </div>
        </div >
    )
}
