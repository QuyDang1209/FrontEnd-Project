import React from "react";
import { CustomButton } from "./../custom-component/CustomButton";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Input from "@mui/material/Input";
import { Label, SearchRounded } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Footer() {
  return (
    <Container
      sx={{
        "@media (min-width: 1536px)": {
          maxWidth: "1400px",
        },
      }}
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          "& a,p": { color: "black !important", fontSize: "12px !important" },
          "@media (max-width: 1200px)": {
            flexWrap: "wrap",
            "& > *": { width: "100%", justifyContent: "center" }, // 1 card per row
          },
          "@media (max-width: 600px)": {
            "& a,p": { fontSize: "14px" }, // 1 card per row
          },
        }}
      >
        <Box display={"flex"}>
          <Link href="#" underline="none">
            &reg;2024 Airbnb
          </Link>
          <Typography variant="body2" mx={1} sx={{ display: "inline" }}>
            •
          </Typography>
          <Link href="#" underline="none">
            Pricy
          </Link>
          <Typography variant="body2" mx={1} sx={{ display: "inline" }}>
            •
          </Typography>
          <Link href="#" underline="none">
            Terms
          </Link>
          <Typography variant="body2" mx={1} sx={{ display: "inline" }}>
            •
          </Typography>
          <Link href="#" underline="none">
            Sitemaps
          </Link>
          <Typography variant="body2" mx={1} sx={{ display: "inline" }}>
            •
          </Typography>
          <Link href="#" underline="none">
            Company details
          </Link>
          <Typography variant="body2" mx={1} sx={{ display: "inline" }}>
            •
          </Typography>
          <Link href="#" underline="none">
            Destinations
          </Link>
        </Box>
        <Box display={"flex"} alignItems={"center"}  sx={{ "& *": { mr: "14px" } }}>
          <Link
            href="#"
            underline="none"
            color="inherit"
            display="flex"
            alignItems="center"
          >
            <LanguageIcon />
            <Link href="#" underline="none">
            English(IN)
          </Link>
          </Link>
          <Link href="#" underline="none">
            INR
          </Link>
          <Link href="#" underline="none">
            Support and Resources
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
