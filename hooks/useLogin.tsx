import { useSession } from "next-auth/react";

export const useLogin = () => {
  const { data: session } = useSession();
  const getUser = async (email: string) => {
    const resp = await fetch(`/api/user?email=${email}`);
    const data = await resp.json();
    return data;
  };

  const createUser = async () => {
    const email = session?.user?.email;
    const name = session?.user?.name;
    const profileImage = session?.user?.image;
    const resp = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        profileImage,
      }),
    });
    // const data = await resp.json();
  };

  return { getUser, createUser };
};
