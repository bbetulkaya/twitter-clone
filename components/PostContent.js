import ReactTimeAgo from "react-time-ago";
import Avatar from "./Avatar";
import Link from "next/link";
import PostButtons from "./PostButtons";

const PostContent = ({
  text,
  author,
  createdAt,
  _id,
  likesCount,
  commentsCount,
  likedByMe,
  bigLayout = false,
}) => {
  return (
    <>
      <div className="flex w-full">
        <div>
          {!!author.image && (
            <Link href={"/" + author?.username}>
              <div className="cursor-pointer">
                <Avatar src={author.image} />
              </div>
            </Link>
          )}
        </div>
        <div className="pl-2 grow">
          <div>
            <Link href={"/" + author?.username}>
              <span className="font-bold pr-1">{author.name}</span>
            </Link>
            {bigLayout && <br />}
            <Link href={"/" + author?.username}>
              <span className="text-twitterLightGray">@{author.username}</span>
            </Link>
            {createdAt && !bigLayout && (
              <span className="pl-1 text-twitterLightGray">
                <ReactTimeAgo date={createdAt} timeStyle="twitter" />
              </span>
            )}
          </div>
          {!bigLayout && (
            <div>
              <Link href={`/${author.name}/status/${_id}`}>
                <div className="w-full cursor-pointer">{text}</div>
              </Link>
              <PostButtons
                id={_id}
                likesCount={likesCount}
                commentsCount={commentsCount}
                likedByMe={likedByMe}
              />
            </div>
          )}
        </div>
      </div>
      {bigLayout && (
        <div className="mt-2">
          <Link href={`/${author.name}/status/${_id}`}>
            <div className="w-full cursor-pointer">{text}</div>
          </Link>
          {createdAt && (
            <div className="text-twitterLightGray text-sm">
              {new Date(createdAt)
                .toISOString()
                .replace("T", " ")
                .slice(0, 16)
                .split(" ")
                .reverse()
                .join(" ")}
            </div>
          )}
          <PostButtons
            id={_id}
            likesCount={likesCount}
            commentsCount={commentsCount}
            likedByMe={likedByMe}
          />
        </div>
      )}
    </>
  );
};

export default PostContent;
