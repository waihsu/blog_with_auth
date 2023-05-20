import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const PageNotFound = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 4000);
  return (
    <Box>
      <Typography>Page Not Found!!</Typography>
    </Box>
  );
};

export default PageNotFound;
