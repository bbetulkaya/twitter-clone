import PostForm from "../../components/PostForm";
import UsernameForm from "../../components/UsernameForm";
import useUserInfo from "../../hooks/useUserInfo";

export default function Home() {
  const { userInfo, status: userInfoStatus } = useUserInfo();

  if (userInfoStatus === "loading") {
    return "loading info user";
  }

  if (!userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <div className="max-w-lg mx-auto border-r border-l border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm />
    </div>
  );
}
