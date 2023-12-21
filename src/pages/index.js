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

  return <div>Homepage logged in {userInfo.username}</div>;
}
