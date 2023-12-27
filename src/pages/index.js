import { useEffect, useState } from "react";
import PostForm from "../../components/PostForm";
import UsernameForm from "../../components/UsernameForm";
import useUserInfo from "../../hooks/useUserInfo";
import axios from "axios";
import PostContent from "../../components/PostContent";
import Layout from "../../components/Layout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { userInfo, setUserInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);
  const router = useRouter();

  function fetchHomePosts() {
    axios.get("/api/posts").then((response) => {
      setPosts(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
      console.log(response.data);
    });
  }

  async function logout() {
    setUserInfo(null);
    await signOut();
  }
  useEffect(() => {
    fetchHomePosts();
  }, []);

  if (userInfoStatus === "loading") {
    return "loading info user";
  }

  if (userInfo && !userInfo?.username) {
    return <UsernameForm />;
  }

  if (!userInfo) {
    router.push("/login");
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
      {userInfo && (
        <div className="p-5 text-center border-t border-twitterBorder">
          <button
            onClick={logout}
            className="bg-twitterWhite text-black px-5 py-2 rounded-full"
          >
            Logout
          </button>
        </div>
      )}
    </Layout>
  );
}
