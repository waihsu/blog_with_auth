import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import Image from "next/image";
import playStore from "../../public/playStore.png";
import microsoft from "../../public/microsoft.png";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/router";

const Login = () => {
  const navigate = useRouter();
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState({ email: "", password: "" });
  const { login } = useLogin();

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: true,
      callbackUrl: "/",
    });
    // const data = await login(user);
    // // console.log(data);
    // setError(data.messg);
    // if (data.messg === "success") {
    //   navigate.push("/");
    // }
  };

  return (
    <Box>
      <Box
        sx={{
          mt: 4,
          maxWidth: 400,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mx: "auto",
          p: 6,
          border: 1,
          borderColor: "aquamarine",
        }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Instagram
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 6, gap: 4 }}>
          <TextField
            id="outlined-basic"
            value={user.email}
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            value={user.password}
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <Button onClick={onSubmit} variant="contained">
            Log in
          </Button>

          {error ? (
            <Typography
              sx={{
                textAlign: "center",
                color: "red",
                fontSize: 20,
                fontWeight: "bold",
                mt: 4,
              }}>
              {error}
            </Typography>
          ) : (
            ""
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, gap: 4 }}>
          <Divider sx={{ width: "40%" }} />
          <Typography>OR</Typography>
          <Divider sx={{ width: "40%" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: 1,
            borderColor: "black",
            gap: 2,
            p: 2,
            mt: 2,
          }}>
          <Button
            onClick={() =>
              signIn("github", { callbackUrl: "http://localhost:3000" })
            }
            sx={{ bgcolor: "black" }}
            variant="contained">
            <GitHubIcon />
            <Typography>Log in With Github</Typography>
          </Button>
          <Button
            onClick={() => {
              signIn("facebook", { callbackUrl: "http://localhost:3000" });
            }}
            variant="contained">
            <FacebookIcon />
            <Typography>Log in With Facebook</Typography>
          </Button>
        </Box>
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          Forgot password
        </Typography>
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
          Don't have an account? <Link href="/signup">Sign up</Link>
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

export default Login;
