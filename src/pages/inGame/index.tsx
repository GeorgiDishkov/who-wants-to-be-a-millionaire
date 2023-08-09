import { Box, Button, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  asyncQuestions,
  clearAnsweredQuestions,
  setAnsweredQuestions,
  setWinOrLose,
} from "../../redux/questionsSlice/reducer";
import { singleQuestion } from "../../redux/questionsSlice/types";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "../../components/score";
import { classes, StyledBox, StyledJokersBox } from "./inGame.style";
import questionDrawer from "../../utility/questionDrawer";
import answerGrinder from "../../utility/answerGrinder";

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
  const answeredQuestions = useSelector(
    (state: RootState) => state.questions.answeredQuestions
  );
  const [drawedQuestion, setDrawedQuestion] = useState<singleQuestion | null>(
    null
  );
  const [isAnswerGiven, setIsAnswerGiven] = useState<boolean>(false);
  const [jumbledAnswers, setJumbledAnswers] = useState<string[]>();
  const [isFiftyFiftyUsed, setIsFiftyFiftyUsed] = useState(false);
  const [isCallAFriendUsed, setIsCallAFriendUsed] = useState(false);
  const [isHelpFromAudience, setIsHelpFromAudience] = useState(false);
  const [lockFiftyFiftyJocker, setLockFiftyFiftyJocker] = useState(false);
  const [callAFriendJoker, setCallAFriendJoker] = useState<string | null>(null);
  const [helpFromAudienceJoker, setHelpFromAudienceJoker] = useState<
    string | null
  >(null);
  const [rightButton, setRightButton] = useState<string | null>(null);
  const [wrongButton, setWrongButton] = useState<string | null>(null);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);
  const navigate = useNavigate();

  const handleAnswere = (answer: string, button: string) => {
    if (answer === drawedQuestion?.correct_answer) {
      dispatch(setAnsweredQuestions(drawedQuestion));
      if (answeredQuestions.length == 15) {
        // winner congrat
        dispatch(setWinOrLose(true));
        setIsGameEnd(true);
      }
      setRightButton(button);
      setTime(60);
      setWrongButton(null);
      setIsAnswerGiven(true);
    }
    if (answer !== drawedQuestion?.correct_answer) {
      dispatch(setWinOrLose(false));
      const takeRightAnswerePossition = jumbledAnswers?.indexOf(
        drawedQuestion?.correct_answer as string
      );
      setRightButton(`button${takeRightAnswerePossition}`);
      setWrongButton(button);
      setIsAnswerGiven(true);
      setIsGameEnd(true);
    }
  };

  const callAFriendJokerFn = () => {
    const rightAnswerId = jumbledAnswers?.indexOf(
      drawedQuestion?.correct_answer as string
    );
    setCallAFriendJoker(`button${rightAnswerId}`);
    setIsCallAFriendUsed(true);
  };

  const helpFromAudienceFn = () => {
    const rightAnswerId = jumbledAnswers?.indexOf(
      drawedQuestion?.correct_answer as string
    );
    setHelpFromAudienceJoker(`button${rightAnswerId}`);
    setIsHelpFromAudience(true);
  };

  const fiftyFiftyJoker = () => {
    if (jumbledAnswers && jumbledAnswers?.length > 2) {
      const newAnswers = [];
      newAnswers.push(
        jumbledAnswers?.find(
          (answer) => answer === drawedQuestion?.correct_answer
        )
      );
      const randomizedAnswer = () => {
        const answer = jumbledAnswers?.[Math.floor(Math.random() * 3)];

        if (answer === drawedQuestion?.correct_answer) {
          randomizedAnswer();
        }
        console.log("randomized Answer", answer);
        return answer;
      };
      newAnswers.push(randomizedAnswer());
      setIsFiftyFiftyUsed(true);
      console.log("new Answers =>", newAnswers);
      setJumbledAnswers(newAnswers as string[]);
    }
  };

  useEffect(() => {
    if (jumbledAnswers && jumbledAnswers?.length == 2) {
      setLockFiftyFiftyJocker(true);
    }
    if (jumbledAnswers && jumbledAnswers?.length > 2) {
      setLockFiftyFiftyJocker(false);
    }
  }, []);

  useEffect(() => {
    if (time > 0) {
      const timer = () => {
        setTime((prevSecond) => prevSecond - 1);
      };

      const currentTimer = setTimeout(timer, 1000);

      return () => {
        clearTimeout(currentTimer);
      };
    }
    if (time == 0) {
      setIsAnswerGiven(true);
      setIsGameEnd(true);
    }
  }, [time]);

  useEffect(() => {
    // I do this to show the user the answer they gave before reloading the new question
    const delayedProcces = () => {
      if (isGameEnd) {
        navigate("/end-game");
      }
      setRightButton(null);
      setWrongButton(null);
      setIsAnswerGiven(false);
      setDrawedQuestion(null);
      if (questions && !drawedQuestion) {
        setDrawedQuestion(questionDrawer(questions, answeredQuestions));
      }
      if (drawedQuestion) {
        setJumbledAnswers(
          answerGrinder(
            drawedQuestion.incorrect_answers,
            drawedQuestion.correct_answer
          )
        );
      }
    };
    setCallAFriendJoker(null);
    setHelpFromAudienceJoker(null);

    const time = setTimeout(delayedProcces, 1500);
  }, [isAnswerGiven]);

  useEffect(() => {
    (async () => {
      await dispatch(asyncQuestions({ count: 15, difficulty, category }));
      await dispatch(clearAnsweredQuestions());
    })();
  }, []);

  useEffect(() => {
    if (questions && !drawedQuestion) {
      setDrawedQuestion(questionDrawer(questions, answeredQuestions));
    }
    if (drawedQuestion) {
      setJumbledAnswers(
        answerGrinder(
          drawedQuestion.incorrect_answers,
          drawedQuestion.correct_answer
        )
      );
    }
  }, [drawedQuestion, questions]);

  return (
    <>
      <StyledJokersBox>
        <Box className={classes.topWrapper}>
          <Box>
            <Button
              disabled={isFiftyFiftyUsed || lockFiftyFiftyJocker}
              onClick={() => fiftyFiftyJoker()}
              className={isFiftyFiftyUsed ? classes.strikeOut : ""}
            >
              <img src="./50x50.png" width={"100px"} height={"70px"} />
            </Button>
          </Box>
          <Box>
            <Button
              disabled={isCallAFriendUsed}
              onClick={() => callAFriendJokerFn()}
              className={isCallAFriendUsed ? classes.strikeOut : ""}
            >
              <img src="./phone.png" width={"100px"} height={"70px"} />
            </Button>
          </Box>
          <Box>
            <Button
              disabled={isHelpFromAudience}
              onClick={() => helpFromAudienceFn()}
              className={isHelpFromAudience ? classes.strikeOut : ""}
            >
              <img src="./people.png" width={"100px"} height={"70px"} />
            </Button>
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography fontSize={20} fontWeight={300} color="#fff">
              Time:{" "}
            </Typography>
            <Typography fontSize={40} fontWeight={600} color="#c8cd00">
              {time}
            </Typography>
          </Box>
        </Box>
        <Box>
          <ScoreBoard currentPoints={answeredQuestions.length} />
        </Box>
      </StyledJokersBox>
      <StyledBox>
        {drawedQuestion && (
          <Box>
            <img className={classes.image} src="./in-game.jpg" />
            <Box>
              <Box className={classes.questionWrapper}>
                <Typography
                  fontSize={28}
                  fontWeight={600}
                  className={classes.questionDescription}
                >
                  {drawedQuestion?.question || ""}
                </Typography>
              </Box>
              {jumbledAnswers && (
                <Box className={classes.asnwereWrapper}>
                  <Box className={classes.groupedButtons}>
                    <Button
                      disabled={isAnswerGiven}
                      onClick={() =>
                        handleAnswere(jumbledAnswers?.[0], "button0")
                      }
                      className={`${classes.answer} ${
                        rightButton === "button0" ? classes.rightButton : ""
                      } ${wrongButton === "button0" ? classes.wrongButton : ""}
                       ${
                         callAFriendJoker === "button0" ? classes.joker : ""
                       }  ${
                         helpFromAudienceJoker === "button0"
                           ? classes.joker
                           : ""
                       }`}
                    >
                      <Typography fontSize={19} fontWeight={600}>
                        {jumbledAnswers?.[0]}
                      </Typography>
                    </Button>
                    <Button
                      disabled={isAnswerGiven}
                      onClick={() =>
                        handleAnswere(jumbledAnswers?.[1], "button1")
                      }
                      className={`${classes.answer} ${
                        rightButton === "button1" ? classes.rightButton : ""
                      } ${wrongButton === "button1" ? classes.wrongButton : ""} 
                       ${
                         callAFriendJoker === "button1" ? classes.joker : ""
                       }  ${
                         helpFromAudienceJoker === "button1"
                           ? classes.joker
                           : ""
                       }`}
                    >
                      <Typography fontSize={19} fontWeight={600}>
                        {jumbledAnswers?.[1]}
                      </Typography>
                    </Button>
                  </Box>
                  {jumbledAnswers?.length > 2 && (
                    <Box className={classes.groupedButtons}>
                      <Button
                        disabled={isAnswerGiven}
                        onClick={() =>
                          handleAnswere(jumbledAnswers?.[2], "button2")
                        }
                        className={`${classes.answer} ${
                          rightButton === "button2" ? classes.rightButton : ""
                        } ${
                          wrongButton === "button2" ? classes.wrongButton : ""
                        } 
                       ${callAFriendJoker === "button2" ? classes.joker : ""}
                        ${
                          helpFromAudienceJoker === "button2"
                            ? classes.joker
                            : ""
                        }`}
                      >
                        <Typography fontSize={19} fontWeight={600}>
                          {jumbledAnswers?.[2]}
                        </Typography>
                      </Button>
                      <Button
                        disabled={isAnswerGiven}
                        onClick={() =>
                          handleAnswere(jumbledAnswers?.[3], "button3")
                        }
                        className={`${classes.answer} ${
                          rightButton === "button3" ? classes.rightButton : ""
                        } ${
                          wrongButton === "button3" ? classes.wrongButton : ""
                        } 
                       ${
                         callAFriendJoker === "button3" ? classes.joker : ""
                       }  ${
                         helpFromAudienceJoker === "button3"
                           ? classes.joker
                           : ""
                       }`}
                      >
                        <Typography fontSize={19} fontWeight={600}>
                          {jumbledAnswers?.[3]}
                        </Typography>
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </StyledBox>
    </>
  );
};

export default InGame;
