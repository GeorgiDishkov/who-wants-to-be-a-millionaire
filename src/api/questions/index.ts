import { questionProps } from "../../redux/questionsSlice/types";

const ROOT_URL = "https://opentdb.com/api.php";

const FormattingURL = ({
  count,
  category,
  difficulty,
  type,
}: questionProps) => {
  const rawURL = [ROOT_URL];
  let isPreffixSetted = false;
  if (count || category || difficulty || type) {
    rawURL.push(`?`);
    if (count) {
      rawURL.push(isPreffixSetted ? `&amount=${count}` : `amount=${count}`);
      isPreffixSetted = true;
    }
    if (category) {
      rawURL.push(
        isPreffixSetted ? `&category=${category}` : `category=${category}`
      );
      isPreffixSetted = true;
    }
    if (difficulty) {
      rawURL.push(
        isPreffixSetted
          ? `&difficulty=${difficulty}`
          : `difficulty=${difficulty}`
      );
      isPreffixSetted = true;
    }
    if (type) {
      rawURL.push(isPreffixSetted ? `&type=${type}` : `type=${type}`);
      isPreffixSetted = true;
    }
  }
  return rawURL.join("");
};

export const fetchQuestions = async ({
  count,
  category,
  difficulty,
  type,
}: questionProps) => {
  const URL = FormattingURL({ count, category, difficulty, type });
  try {
    const response = await fetch(URL, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error with status: ${response.status}`);
    }

    const result = response.json();

    if (result) {
      return result;
    }
  } catch (error) {
    console.error("Somethings gone wrong");
  }
};
