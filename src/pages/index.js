import { useEffect, useState } from "react";
import PostForm from "../../components/PostForm";
import UsernameForm from "../../components/UsernameForm";
import useUserInfo from "../../hooks/useUserInfo";
import axios from "axios";
import PostContent from "../../components/PostContent";
import Layout from "../../components/Layout";

export default function Home() {
  const { userInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);

  function fetchHomePosts() {
    axios.get("/api/posts").then((response) => {
      setPosts(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
    });
  }
  
  useEffect(() => {
    fetchHomePosts();
  }, []);

  if (userInfoStatus === "loading") {
    return "loading info user";
  }

  if (!userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <Layout>
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm
        onPost={() => {
          fetchHomePosts();
        }}
      />
      <div className="border-t border-twitterBorder">
        {posts.length > 0 &&
          posts.map((post, index) => (
            <div className="border-t border-twitterBorder p-5" key={index}>
              <PostContent
                {...post}
                likedByMe={idsLikedByMe.includes(post._id)}
              />
            </div>
          ))}
      </div>
      <div className="p-5 text-center border-t border-twitterBorder">
        <button className="bg-twitterWhite text-black px-5 py-2 rounded-full">
          Logout
        </button>
      </div>
    </Layout>
  );
}
