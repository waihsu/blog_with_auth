import { Avatar, Box, Button } from "@mui/material";
import { Post, User } from "@prisma/client";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";

const NewFeeds = ({
  userData,
  post,
  userEmail,
}: {
  userData: User;
  post: Post;
  userEmail: string;
}) => {
  const profileImage = userData?.profileImage as string;

  const [likedEmails, setLikedEmails] = useState<Array<string>>(
    post.likedUserEmails
  );
  const [bookmarkedEmails, setBookmarkedEmails] = useState<Array<string>>(
    post.bookmarkedUserEmails
  );

  const isLiked = () => {
    return likedEmails.includes(userEmail);
  };

  const isBookMark = () => {
    return bookmarkedEmails.includes(userEmail);
  };

  const bookMarked = async () => {
    let newbookmarkedUserEmails = [];
    if (post.bookmarkedUserEmails.includes(userEmail)) {
      newbookmarkedUserEmails = post.bookmarkedUserEmails.filter(
        (email) => (email = userEmail)
      );
    } else {
      newbookmarkedUserEmails = [...post.bookmarkedUserEmails, userEmail];
    }
    setBookmarkedEmails(newbookmarkedUserEmails);
    const resp = await fetch("/api/bookMark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: post.id,
        bookmarkedUserEmails: newbookmarkedUserEmails,
      }),
    });
    const data = await resp.json();
    if (resp.ok) {
      setBookmarkedEmails(data.post.bookmarkedUserEmails);
    }
  };

  const liked = async () => {
    let newLikedUserEmails = [];
    if (post.likedUserEmails.includes(userEmail)) {
      newLikedUserEmails = post.likedUserEmails.filter(
        (email) => email !== userEmail
      );
      //   console.log(newLikedUserEmails);
    } else {
      newLikedUserEmails = [...post.likedUserEmails, userEmail];
      //   console.log(newLikedUserEmails);
    }
    setLikedEmails(newLikedUserEmails);
    const resp = await fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: post.id,
        likedUserEmails: newLikedUserEmails,
      }),
    });
    const data = await resp.json();
    if (resp.ok) {
      setLikedEmails(data.post.likedUserEmails);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        my: 2,
        px: 3,
      }}>
      <Box sx={{ border: 1 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            mb: 3,
            gap: 2,
          }}>
          <Box sx={{ ml: 2, mt: 2 }}>
            <Avatar src={profileImage} />
          </Box>

          <p>{userData?.name}</p>
        </Box>
        <Box>
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
          {post?.image !== "" ? (
            <img
              src={post?.image as string}
              alt="newfeed"
              style={{ width: "100%", height: "100%" }}
            />
          ) : null}
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button onClick={liked}>
              {isLiked() ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
              {likedEmails.length}
            </Button>
            <Button>
              <ChatBubbleOutlineRoundedIcon />
              {post.commentIds.length}
            </Button>

            <Button onClick={bookMarked}>
              {isBookMark() ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
              {bookmarkedEmails.length}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewFeeds;
