import { Button, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const PREFIX = "buttons";

const classes = {
  image: `${PREFIX}-image`,
};

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "20px",
  minWidth: "30vh",
  width: "25vw",
  height: "6vh",
  borderRadius: theme.spacing(2), // I use a theme because in large apps it's easier to control all colors and spacing with them provided by MUI
  border: "2px solid black",
  backgroundColor: "#060606c7",
  "&:hover": {
    backgroundColor: "#060606",
  },
}));

interface primariButtonProps {
  text?: string;
  href?: string;
}

export const PrimaryButton = ({ text, href = "" }: primariButtonProps) => {
  return (
    <StyledButton>
      <Link to={href} style={{ textDecoration: "none" }}>
        <Typography color="white">{text}</Typography>
      </Link>
    </StyledButton>
  );
};
