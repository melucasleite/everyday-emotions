"use server";

interface Answer {
  questionId: number;
  value: string;
}

export const callback = async (answers: Answer[]) => {
  console.log(answers);
};
