import { Box, Typography, styled } from "@mui/material";
import { prizes } from "../../constants/prizes";

const PREFIX = "score-board";

const classes = {
  savePoint: `${PREFIX}-savePoint`,
  winnedPrize: `${PREFIX}-winnedPrize`,
  wrapper: `${PREFIX}-wrapper`,
  textWrapper: `${PREFIX}-textWrapper`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  minWidth: "15vw",
  borderRadius: theme.spacing(2),
  color: "#ffdc55",
  textAlign: "center",
  [`& .${classes.savePoint}`]: {
    color: "#fff",
  },
  [`& .${classes.winnedPrize}`]: {
    backgroundColor: "#cccf2c6b",
    borderRadius: theme.spacing(1),
  },
  [`& .${classes.wrapper}`]: {
    backgroundColor: "#120e0ea6",
    borderRadius: theme.spacing(1),
  },
}));

interface scoreBoardProps {
  currentPoints: number;
  winOrLose?: boolean | null;
}

const ScoreBoard = ({ currentPoints, winOrLose }: scoreBoardProps) => {
  return (
    <>
      <StyledBox>
        <Box className={classes.wrapper}>
          <Typography
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
            fontSize={35}
            color="#fff"
          >
            Scoreboard
          </Typography>
          {prizes.map((prize) => {
            return (
              <Typography
                key={prize.point}
                className={`${prize.point % 5 === 0 ? classes.savePoint : ""} ${
                  currentPoints === prize.point ? classes.winnedPrize : ""
                }`}
              >
                {prize.point}: {prize.prize}
              </Typography>
            );
          })}
        </Box>
      </StyledBox>
    </>
  );
};

export default ScoreBoard;
