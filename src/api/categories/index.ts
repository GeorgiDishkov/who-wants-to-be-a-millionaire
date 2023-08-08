import { questionProps } from "../../redux/questionsSlice/types";

const ROOT_URL = "https://opentdb.com/api_category.php";

export const fetcCategories = async () => {
  try {
    const response = await fetch(ROOT_URL, {
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
