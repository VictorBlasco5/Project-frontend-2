import "./PostDetail.css"
import { detailData } from "../../app/slices/postDetailSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"


export const PostDetail =  () => {

    const detailRdx =  useSelector(detailData);
    const navigate = useNavigate();

    useEffect(() => {
        
        if (!detailRdx?.detail) {
            navigate("/post-detail");
        }
    }, [detailRdx]);


    return (
        <div className="postDetailDesign">
            {detailRdx?.detail && detailRdx?.detail?.description}
        </div>
    )
}
