import { useLogin } from "@/hooks/useLogin";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const { getUser, createUser } = useLogin();

  // const getUser = async (email: string) => {
  //   const resp = await fetch(`/api/user?email=${email}`);
  //   const data = await resp.json();
  //   return data;
  // };

  // const createUser = async () => {
  //   const email = session?.user?.email;
  //   const name = session?.user?.name;
  //   const profileImage = session?.user?.image;
  //   const resp = await fetch("/api/user", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       name,
  //       profileImage,
  //     }),
  //   });
  //   // const data = await resp.json();
  // };

  useEffect(() => {
    const userData = async () => {
      if (status !== "loading" && session) {
        const data = await getUser(session?.user?.email as string);
        console.log(data);
        if (data.messg === "user not found") {
          const createdUser = await createUser();
          console.log("createdUser: ", createdUser);
        }
      }
    };
    userData();
  }, [status, session]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
