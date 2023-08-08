import { singleQuestion } from "../../redux/questionsSlice/types";

const questionDrawer = (
  questions: singleQuestion[],
  answeredQuestions: singleQuestion[]
) => {
  const existQuestions = questions.filter((question: singleQuestion) => {
    return !answeredQuestions.some((aQuestion: singleQuestion) => {
      return question.question === aQuestion.question;
    });
  });
  return existQuestions?.[0];
};

export default questionDrawer;
