import { Box, Typography } from "@mui/material";

const Setting = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography variant="h3">This Feature unavailable now </Typography>
      <Typography variant="h5" sx={{ color: "red" }}>
        Comming Soon...
      </Typography>
    </Box>
  );
};

export default Setting;
