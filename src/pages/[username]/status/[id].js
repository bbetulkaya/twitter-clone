import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PostContent from "../../../../components/PostContent";
import Layout from "../../../../components/Layout";
import Link from "next/link";
import useUserInfo from "../../../../hooks/useUserInfo";
import PostForm from "../../../../components/PostForm";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [replies, setReplies] = useState([]);
  const [repliesLikedByMe, setRepliesLikeByMe] = useState([]);
  const { userInfo } = useUserInfo();

  function fetchData() {
    axios.get("/api/posts?id=" + id).then((response) => {
      setPost(response.data.post);
    });
    axios.get("/api/posts?parent=" + id).then((response) => {
      setReplies(response.data.posts);
      setRepliesLikeByMe(response.data.idsLikedByMe);
    });
  }
  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      <div className="px-5 py-2">
        <Link href={"/"}>
          <div className="flex mb-5 cursor-pointer items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-5 h-4 mr-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <div className="text-lg font-bold">Tweet</div>
          </div>
        </Link>
        {post && <PostContent {...post} bigLayout />}
      </div>
      {!!userInfo && (
        <div className="border-t border-twitterBorder py-5">
          <PostForm
            onPost={fetchData}
            compact
            parent={id}
            placeholder={"Tweet your reply"}
          />
        </div>
      )}
      <div>
        {replies.length > 0 &&
          replies.map((reply, index) => (
            <div key={index} className="p-5 border-t border-twitterBorder">
              <PostContent
                {...reply}
                likedByMe={repliesLikedByMe.includes(reply._id)}
              />
            </div>
          ))}
      </div>
    </Layout>
  );
}
