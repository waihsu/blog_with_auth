import { useDropzone } from "react-dropzone";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

// interface Base64 {
//   base64: string;
//   setBase64: (value: string) => void;
//   profileImage: string;
// }

const PostFrom = ({
  base64,
  setBase64,
  profileImage,
}: {
  base64: string;
  setBase64: (value: string) => void;
  profileImage: string;
}) => {
  const [text, setText] = useState<string>("");

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
        maxWidth: 350,
        display: "flex",
        mx: "auto",
        flexDirection: "column",
        alignItems: "center",
        border: 1,
      }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
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
          <Box sx={{ position: "absolute", top: 4, right: 4 }}>
            <CloseIcon />
          </Box>
          <img src={base64} style={{ width: "100%", height: "100%" }} />
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
        <Button variant="outlined">Submit</Button>
      </Box>
    </Box>
  );
};

export default PostFrom;
