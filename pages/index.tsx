import PostFrom from "@/components/PostForm";

import { useLogin } from "@/hooks/useLogin";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  const [base64, setBase64] = useState<string>("");
  const { getUser, createUser } = useLogin();

  useEffect(() => {
    const userData = async () => {
      if (status !== "loading" && session) {
        const data = await getUser(session?.user?.email as string);
        // console.log(data);
        if (data.messg === "user not found") {
          const createdUser = await createUser();
          // console.log("createdUser: ", createdUser);
        }
      }
    };
    userData();
  }, [status, session]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <Box sx={{ maxWidth: 600, minHeight: "100vh", mx: "auto", border: 1 }}>
      <PostFrom
        base64={base64}
        setBase64={setBase64}
        profileImage={session?.user?.image as string}
      />
    </Box>
  );
}
