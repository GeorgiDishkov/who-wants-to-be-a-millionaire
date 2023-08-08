export interface category {
  id: number;
  name: string;
}

export interface categoriesType {
  isLoading: boolean;
  categories: category[] | null;
  error: string;
}
