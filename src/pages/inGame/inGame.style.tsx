import { Box, styled } from "@mui/material";

const PREFIX = "in-game";

export const classes = {
  image: `${PREFIX}-image`,
  questionWrapper: `${PREFIX}-questionWrapper`,
  questionDescription: `${PREFIX}-questionDescription`,
  asnwereWrapper: `${PREFIX}-asnwereWrapper`,
  answer: `${PREFIX}-answer`,
  groupedButtons: `${PREFIX}-groupedButtons`,
  wrongButton: `${PREFIX}-wrongButton`,
  rightButton: `${PREFIX}-rightButton`,
  topWrapper: `${PREFIX}-topWrapper`,
  strikeOut: `${PREFIX}-strikeOut`,
  joker: `${PREFIX}-joker`,
};

export const StyledJokersBox = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [`& .${classes.topWrapper}`]: {
    display: "flex",
    alignItems: "center",
  },
  [`& .${classes.strikeOut}`]: {
    opacity: 0.5,
    height: "1px",
    zIndex: "999",
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  flexWrap: "wrap",
  flexDirection: "column",
  marginTop: "3vh",
  width: "100vw",

  [`& .${classes.image}`]: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "-1",
  },
  [`& .${classes.questionWrapper}`]: {
    backgroundColor: "#7a477b",
    maxWidth: "100vw",
    borderRadius: theme.spacing(2),
  },
  [`& .${classes.questionDescription}`]: {
    color: "#fff",
    padding: theme.spacing(2),
    maxWidth: "80vw",
    textAlign: "center",
  },
  [`& .${classes.asnwereWrapper}`]: {
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.answer}`]: {
    margin: theme.spacing(1),
    minWidth: theme.spacing(18),
    width: "100%",
    height: "6vh",
    borderRadius: theme.spacing(2), // I use a theme because in large apps it's easier to control all colors and spacing with them provided by MUI
    backgroundColor: "#002795",
    textTransform: "capitalize",
    color: "#fff",
  },
  [`& .${classes.groupedButtons}`]: {
    display: "flex",
    justifyContent: "space-between",
  },
  [`& .${classes.wrongButton}`]: {
    backgroundColor: "#751325 !important",
  },
  [`& .${classes.rightButton}`]: {
    backgroundColor: "#00950b !important",
  },
  [`& .${classes.joker}`]: {
    border: "10px solid green",
  },
}));
