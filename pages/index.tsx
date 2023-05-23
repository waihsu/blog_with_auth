import NewFeeds from "@/components/NewFeeds";
import PostFrom from "@/components/PostForm";
import { useGetNewFeed } from "@/hooks/useGetNewFeed";

import { useLogin } from "@/hooks/useLogin";
import { Box, Typography } from "@mui/material";
import { Post, User } from "@prisma/client";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession({ required: true });

  //hook
  const { getUser, createUser } = useLogin();
  const { getNewFeeds } = useGetNewFeed();

  const [key, setKey] = useState<number>(0);
  const email = session?.user?.email;
  const [base64, setBase64] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [sending, setSending] = useState(false);

  //newFeed
  const [newFeed, setNewFeed] = useState<Array<Post>>([]);
  const [feedUserData, setFeedUserData] = useState<Array<User>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const post = async () => {
    setSending(true);
    const resp = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/josn",
      },
      body: JSON.stringify({
        body: text,
        userEmail: email,
        image: base64,
      }),
    });
    const data = await resp.json();

    if (data.messg === "done") {
      setSending(false);
      setKey(key + 1);
    }
  };

  const getFeed = async () => {
    const resp = await fetch("/api/newfeed");
    if (resp.status === 200) {
      const data = await resp.json();
      setLoading(false);
      // console.log(data);
      setNewFeed(data.posts);
      setFeedUserData(data.userData);
    }
  };

  useEffect(() => {
    const loginUserData = async () => {
      if (status !== "loading" && session) {
        await getFeed();
        const data = await getUser(session?.user?.email as string);
        // console.log(data);
        if (data.messg === "user not found") {
          const createdUser = await createUser();
          // console.log("createdUser: ", createdUser);
        }
      }
    };
    loginUserData();
  }, [status, session]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <Box sx={{ maxWidth: 600, minHeight: "100vh", mx: "auto", border: 1 }}>
      <Box>
        <PostFrom
          key={key}
          text={text}
          setText={setText}
          sending={sending}
          setSending={setSending}
          onSubmit={post}
          base64={base64}
          setBase64={setBase64}
          profileImage={session?.user?.image as string}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          newFeed.map((post, i) => (
            <NewFeeds
              key={post.id}
              userData={feedUserData[i]}
              post={newFeed[i]}
              userEmail={session.user?.email as string}
            />
          ))
        )}
      </Box>
    </Box>
  );
}
