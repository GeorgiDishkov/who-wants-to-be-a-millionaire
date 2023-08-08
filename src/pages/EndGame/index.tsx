import { Box, Button, Typography, styled } from "@mui/material";
import ScoreBoard from "../../components/score";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PrimaryButton } from "../../components/buttons";
import { prizes } from "../../constants/prizes";

const PREFIX = "end-game";

const classes = {
  image: `${PREFIX}-image`,
};

const StyledJokersBox = styled(Box)(({}) => ({
  display: "flex",
  alignContent: "center",
  flexWrap: "wrap",
  flexDirection: "column",
  [`& .${classes.image}`]: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "-1",
  },
}));

const StyledWinTextBox = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const EndGame = () => {
  const answeredQuestions = useSelector(
    (state: RootState) => state.questions.answeredQuestions
  );
  const winOrLose = useSelector(
    (state: RootState) => state.questions.winOrLose
  );
  const winnedPrizePoint = prizes.find(
    (prize) => prize?.point === answeredQuestions.length
  );

  return (
    <>
      {winOrLose ? (
        <StyledWinTextBox>
          <Typography fontSize={40} fontWeight={600} style={{ color: "#fff" }}>
            End of the game!
          </Typography>
          <Typography fontSize={40} fontWeight={600} style={{ color: "#fff" }}>
            CONGRATULATIONS YOU WON
          </Typography>
          <Typography fontSize={40} fontWeight={600} style={{ color: "#fff" }}>
            With {answeredQuestions.length} answered questions
          </Typography>
          {winnedPrizePoint?.prize && (
            <Typography
              fontSize={40}
              fontWeight={600}
              style={{ color: "#fff" }}
            >
              Won big prize {winnedPrizePoint?.prize} !
            </Typography>
          )}
        </StyledWinTextBox>
      ) : (
        <StyledWinTextBox>
          <Typography fontSize={40} fontWeight={600} style={{ color: "#fff" }}>
            End of the game!
          </Typography>
          <Typography fontSize={25} fontWeight={600} style={{ color: "#fff" }}>
            Submitted wrong answer or timed out
          </Typography>
          <Typography fontSize={25} fontWeight={600} style={{ color: "#fff" }}>
            Answered questions: {answeredQuestions.length}
          </Typography>
          {winnedPrizePoint?.prize && (
            <Typography
              fontSize={25}
              fontWeight={600}
              style={{ color: "#fff" }}
            >
              Money taken: {winnedPrizePoint?.prize} !
            </Typography>
          )}
        </StyledWinTextBox>
      )}
      <StyledJokersBox>
        <Box>
          <img className={classes.image} src="./in-game.jpg" />
          <Box>
            <ScoreBoard
              currentPoints={answeredQuestions.length || 0}
              winOrLose={winOrLose}
            />
          </Box>
        </Box>
        <Box mt={6}>
          <PrimaryButton text="Play again" href="/" />
        </Box>
      </StyledJokersBox>
    </>
  );
};

export default EndGame;
