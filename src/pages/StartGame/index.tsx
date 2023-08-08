import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
} from "@mui/material";
import startGameImg from "./in-game.jpg";
import { PrimaryButton } from "../../components/buttons";
import { useEffect, useState } from "react";
import ArrowDropDownCircleSharpIcon from "@mui/icons-material/ArrowDropDownCircleSharp";
import { RootState, useAppDispatch } from "../../redux/store";
import categoriesRequest, {
  asyncCategories,
} from "../../redux/categoriesSlice/redux";
import { useSelector } from "react-redux";
import { setCategory, setDifficulty } from "../../redux/questionsSlice/reducer";

const PREFIX = "start-game";

const classes = {
  image: `${PREFIX}-image`,
  selectorWrapper: `${PREFIX}-selectorWrapper`,
  selectHeader: `${PREFIX}-selectHeader`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  flexWrap: "wrap",
  flexDirection: "column",
  marginTop: "50vh",

  [`& .${classes.image}`]: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "-1",
  },
  [`& .${classes.selectorWrapper}`]: {
    backgroundColor: "#060606c7",
    color: "#fff",
    borderRadius: theme.spacing(2),
  },
  [`& .${classes.selectHeader}`]: {
    color: "#fff",
    display: "flex",
    justifyContent: "center",
  },
}));

const StartGame = () => {
  const dispatch = useAppDispatch();
  const fetchedCategories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const category = useSelector(
    (state: RootState) => state.questions.selectedCategory
  );
  const difficulty = useSelector(
    (state: RootState) => state.questions.selectedDifficulty
  );

  useEffect(() => {
    (async () => {
      await dispatch(asyncCategories());
    })();
  }, []);

  const onCategoryChange = (event: SelectChangeEvent) => {
    dispatch(setCategory(Number(event.target.value)));
  };

  const onDifficultyChange = (event: SelectChangeEvent) => {
    dispatch(setDifficulty(event.target.value));
  };

  return (
    <StyledBox>
      <img className={classes.image} src="./in-game.jpg" />
      <Box mb={14}>
        <PrimaryButton text="StartGame" href="/in-game" />
      </Box>
      <Box>
        <FormControl sx={{ mb: 2, minWidth: "100%" }}>
          <Typography
            fontSize={18}
            fontWeight={600}
            className={classes.selectHeader}
          >
            Category:
          </Typography>
          <Select
            className={classes.selectorWrapper}
            labelId="select-category"
            value={category?.toString() || undefined}
            onChange={onCategoryChange}
          >
            {fetchedCategories &&
              fetchedCategories.map((category) => {
                return <MenuItem value={category.id}>{category.name}</MenuItem>;
              })}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControl sx={{ mb: 2, minWidth: "100%" }}>
          <Typography
            fontSize={18}
            fontWeight={600}
            className={classes.selectHeader}
          >
            Difficulty:
          </Typography>
          <Select
            className={classes.selectorWrapper}
            labelId="select-category"
            value={difficulty || undefined}
            onChange={onDifficultyChange}
          >
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </StyledBox>
  );
};

export default StartGame;
