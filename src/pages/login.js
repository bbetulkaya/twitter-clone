import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage({ providers }) {
  const { data, status } = useSession();
  const router = useRouter();
  
  if (status === "loading") {
    return "";
  }
  if (data) {
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            onClick={async () => {
              await signIn(provider.id);
            }}
            className="bg-twitterWhite px-4 py-3 text-black rounded-full flex items-center"
          >
            <img src="/google.png" className="h-6 pr-2" />
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
