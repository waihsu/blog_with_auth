import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import Image from "next/image";
import playStore from "../../public/playStore.png";
import microsoft from "../../public/microsoft.png";
import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSignUp } from "@/hooks/useSignup";
import FacebookIcon from "@mui/icons-material/Facebook";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signUpUser } = useSignUp();

  const [messg, setMessg] = useState<string>("");
  const signup = async () => {
    const data = await signUpUser(user);
    setMessg(data.messg);
  };

  return (
    <Box>
      <Box
        sx={{
          maxWidth: 400,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mx: "auto",
          p: 6,
          border: 1,
          borderColor: "aquamarine",
        }}>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
          TESU COMMUNITY
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Sign up to see photos and videos from your friends.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            mt: 4,
          }}>
          <Button
            onClick={() =>
              signIn("github", {
                callbackUrl: "https://blog-with-auth-eta.vercel.app/",
              })
            }
            sx={{ bgcolor: "black" }}
            variant="contained">
            <GitHubIcon />
            <Typography>Log in With Github</Typography>
          </Button>
          <Button
            onClick={() => {
              signIn("facebook", {
                callbackUrl: "https://blog-with-auth-eta.vercel.app/",
              });
            }}
            variant="contained">
            <FacebookIcon />
            <Typography>Log in With Facebook</Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, gap: 4 }}>
          <Divider sx={{ width: "40%" }} />
          <Typography>OR</Typography>
          <Divider sx={{ width: "40%" }} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", mt: 6, gap: 4 }}>
          <TextField
            id="outlined-basic"
            label="Mobile Number or Email"
            variant="outlined"
            onChange={(evt) => {
              setUser({ ...user, email: evt.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(evt) => {
              setUser({ ...user, name: evt.target.value });
            }}
          />
          {/* <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(evt) => {
              setUser({ ...user, username: evt.target.value });
            }}
          /> */}
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(evt) => {
              setUser({ ...user, password: evt.target.value });
            }}
          />
          <Button onClick={signup} variant="contained">
            Sign up
          </Button>
          <Box>
            {messg ? (
              <Typography
                sx={{
                  textAlign: "center",
                  color: "red",
                  fontSize: 20,
                  fontWeight: "bold",
                  mt: 4,
                }}>
                {messg}
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 400,
          textAlign: "center",
          mx: "auto",
          mt: 4,
          px: 6,
          py: 3,
          border: 1,
          borderColor: "aquamarine",
        }}>
        <Typography>
          Have an account? <Link href="/login">Log in</Link>
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center", my: 2 }}>Get the app.</Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", mx: "auto", gap: 2 }}>
        <Image src={playStore} width={150} height={50} alt="playstore" />
        <Image src={microsoft} width={150} height={50} alt="microsoft" />
      </Box>
    </Box>
  );
};

export default Signup;
