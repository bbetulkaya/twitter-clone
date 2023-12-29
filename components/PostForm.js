import { useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import axios from "axios";
import Avatar from "./Avatar";

const PostForm = ({
  onPost,
  compact,
  parent,
  placeholder = "What's happening?",
}) => {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState("");

  async function handlePostSubmit(e) {
    e.preventDefault();
    await axios.post(
      "/api/posts",
      { text, parent },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setText("");
    if (onPost) {
      onPost();
    }
  }

  if (status === "loading") {
    console.log("PostForm cannot render because there is no User!");
    return "";
  }

  return (
    <form className="mx-5" onSubmit={handlePostSubmit}>
      <div className={(compact ? "items-center " : "") + "flex"}>
        <div>
          <Avatar src={userInfo?.image} />
        </div>
        <div className="grow pl-4">
          <textarea
            className={
              (compact ? "h-10 mt-1 " : "h-20 ") +
              "w-full p-2 bg-transparent text-twitterWhite"
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
          />
          {!compact && (
            <div className="text-right border-t border-twitterBorder pt-2 pb-2">
              <button className="bg-twitterBlue text-white rounded-full px-4 py-1">
                Tweet
              </button>
            </div>
          )}
        </div>
        {compact && (
          <div className="pl-2">
            <button className="bg-twitterBlue text-white rounded-full px-4 py-1">
              Tweet
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default PostForm;
