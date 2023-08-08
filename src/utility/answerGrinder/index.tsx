const answerGrinder = (
  incorect_answeres: string[],
  correct_answere: string
) => {
  let answers = [...incorect_answeres];
  answers.push(correct_answere);
  return answers.sort((a, b) => Math.random() - 0.5);
};

export default answerGrinder;
