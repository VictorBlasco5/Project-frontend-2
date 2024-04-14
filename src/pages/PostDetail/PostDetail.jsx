import "./PostDetail.css"
import { detailData } from "../../app/slices/postDetailSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { AddLike } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice";

export const PostDetail = () => {

    const reduxUser = useSelector(userData)
    const detailRdx = useSelector(detailData);
    const navigate = useNavigate();
    const token = reduxUser.credentials.token || ({});

    useEffect(() => {

        if (!detailRdx?.detail) {
            navigate("/post-detail");
        }
    }, [detailRdx]);

    const like = async (postId) => {
        try {
            const fetched = await AddLike(token, postId)

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
                    <button className="buttonLikeDetail" onClick={() => like(detailRdx?.detail?._id)}>
                        <img className="like" src="../../../img/like.png" alt="" />
                    </button>
                    <span className="likeCountDetail">{detailRdx?.detail?.likeCount}</span> {/* Mostrar el número total de "me gusta" */}
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
