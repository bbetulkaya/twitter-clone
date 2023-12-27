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
  likedByMe,
  bigLayout = false,
}) => {
  return (
    <>
      <div className="flex w-full">
        <div>
          <Avatar src={author.image} />
        </div>
        <div className="pl-2 grow">
          <div>
            <span className="font-bold pr-1">{author.name}</span>
            {bigLayout && <br />}
            <span className="text-twitterLightGray">@{author.username}</span>
            {createdAt && !bigLayout && (
              <span className="pl-1 text-twitterLightGray">
                <ReactTimeAgo date={createdAt} timeStyle="twitter" />
              </span>
            )}
          </div>
          {!bigLayout && (
            <div>
              <Link href={`/${author.name}/status/${_id}`}>{text}</Link>
              <PostButtons
                id={_id}
                likesCount={likesCount}
                likedByMe={likedByMe}
              />
            </div>
          )}
        </div>
      </div>
      {bigLayout && (
        <div className="mt-2">
          <Link href={`/${author.name}/status/${_id}`}>{text}</Link>
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
          <PostButtons id={_id} likesCount={likesCount} likedByMe={likedByMe} />
        </div>
      )}
    </>
  );
};

export default PostContent;
