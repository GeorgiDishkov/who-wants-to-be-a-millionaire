export interface singleQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface questionsType {
  loading: boolean;
  questions: singleQuestion[] | null;
  error: string | null;
  selectedCategory: number | null;
  selectedDifficulty: string | null;
  answeredQuestions: singleQuestion[];
  winOrLose: boolean | null;
}

export interface questionProps {
  count?: number | null;
  category?: number | null;
  difficulty?: string | null;
  type?: string | null;
}
