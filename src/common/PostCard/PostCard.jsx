import "./PostCard.css"

export const PostCard = ({like, description, datePost}) => {

    return (
        <div className="postCardDesign">
            <div className="like">{like}</div>
            <div className="card">{description}</div>
            <div >{datePost}</div>
        </div>
    )
}
