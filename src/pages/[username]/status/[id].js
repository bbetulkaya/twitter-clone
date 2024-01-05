import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PostContent from "../../../../components/PostContent";
import Layout from "../../../../components/Layout";
import Link from "next/link";
import useUserInfo from "../../../../hooks/useUserInfo";
import PostForm from "../../../../components/PostForm";
import TopNavLink from "../../../../components/TopNavLink";

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
        <TopNavLink />
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
