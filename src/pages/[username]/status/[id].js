import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PostContent from "../../../../components/PostContent";
import Layout from "../../../../components/Layout";
import Link from "next/link";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/posts?id=" + id).then((response) => {
      setPost(response.data);
    });
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
    </Layout>
  );
}
