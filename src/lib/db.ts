import { Question } from "@/types";
import rawDataFull from "../data/questions.json";
import rawDataSample from "../data/questions_sample.json";

const dataFull = rawDataFull as Question[];
const dataSample = rawDataSample as Question[];

export function getQuestions() {
  const data = process.env.NODE_ENV === "production" ? dataFull : dataSample;
  return data;
}

export function getQuestion(index: string) {
  const data = process.env.NODE_ENV === "production" ? dataFull : dataSample;
  return data.find((question) => question.index === index);
}
