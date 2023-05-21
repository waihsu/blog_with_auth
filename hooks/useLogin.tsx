import { useSession } from "next-auth/react";

interface User {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { data: session } = useSession();

  const login = async (user: User) => {
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await resp.json();
    return data;
  };

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

  return { getUser, createUser, login };
};
