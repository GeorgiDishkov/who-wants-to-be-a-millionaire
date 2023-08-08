import { Box, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { fetchQuestions } from "../../api/questions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { asyncQuestions } from "../../redux/questionsSlice/reducer";

const PREFIX = "in-game";

const classes = {
  image: `${PREFIX}-image`,
  questionWrapper: `${PREFIX}-questionWrapper`,
  questionDescription: `${PREFIX}-questionDescription`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  flexWrap: "wrap",
  flexDirection: "column",
  marginTop: "15vh",

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
    backgroundColor: "#060606c7",
    minWidth: "30vw",
    minHeight: "30vh",
    borderRadius: theme.spacing(7),
  },
  [`& .${classes.questionDescription}`]: {
    color: "#fff",
    padding: "35px",
  },
}));

const InGame = () => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useDispatch();
  const category = useSelector(
    (state: RootState) => state.questions.selectedCategory
  );
  const difficulty = useSelector(
    (state: RootState) => state.questions.selectedDifficulty
  );
  const questions = useSelector(
    (state: RootState) => state.questions.questions
  );

  useEffect(() => {
    (async () => {
      await dispatch(asyncQuestions({ count: 15, difficulty, category }));
    })();
  }, []);

  console.log("category ==> ", category);
  console.log("difficulty ==> ", difficulty);
  console.log("questions ==> ", questions);

  return (
    <StyledBox>
      <img className={classes.image} src="./in-game.jpg" />
      <Box className={classes.questionWrapper}>
        <Typography className={classes.questionDescription}>
          In game MADAFAKA
        </Typography>
      </Box>
    </StyledBox>
  );
};

export default InGame;
