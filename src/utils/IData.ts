export interface IResult {
  isCorrect: boolean;
  question: string | undefined;
}

export interface IQuestions {
  questions: IQuestion[];
}

interface IQuestion {
  question?: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}
