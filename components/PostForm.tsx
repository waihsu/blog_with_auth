import { useDropzone } from "react-dropzone";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LoadingButton from "@mui/lab/LoadingButton";

// interface Base64 {
//   base64: string;
//   setBase64: (value: string) => void;
//   profileImage: string;
// }

const PostFrom = ({
  onSubmit,
  sending,
  setSending,
  text,
  setText,
  base64,
  setBase64,
  profileImage,
}: {
  sending: boolean;
  setSending: (value: any) => void;
  onSubmit: () => void;
  text: string;
  setText: (value: string) => void;
  base64: string;
  setBase64: (value: string) => void;
  profileImage: string;
}) => {
  const dropPost = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      setBase64(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: dropPost,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
    },
  });

  return (
    <Box
      sx={{
        mt: 10,
        maxWidth: 350,
        display: "flex",
        mx: "auto",
        flexDirection: "column",
        alignItems: "center",
        border: 1,
        py: 2,
      }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 1,
          gap: 2,
        }}>
        <Box>
          <Avatar src={profileImage} />
        </Box>

        <div
          onBlur={(e) => setText(e.target.innerHTML)}
          style={{ width: "65%", outline: "none" }}
          contentEditable
          suppressContentEditableWarning></div>
      </Box>
      {base64 ? (
        <Box
          sx={{
            position: "relative",
            mb: 2,
            display: "flex",
            mx: "auto",
            bgcolor: "red",
          }}>
          <Box
            onClick={() => setBase64("")}
            sx={{ position: "absolute", top: 4, right: 4 }}>
            <CloseOutlinedIcon sx={{ bgcolor: "red", color: "white" }} />
          </Box>
          <img src={base64} style={{ width: "100%", height: "80%" }} />
        </Box>
      ) : null}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          bgcolor: "ghostwhite",
        }}>
        <Box {...getRootProps()}>
          <input {...getInputProps()} />
          <InsertPhotoIcon />
        </Box>
        <LoadingButton
          onClick={onSubmit}
          variant="contained"
          size="small"
          loading={sending}>
          Post
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default PostFrom;
