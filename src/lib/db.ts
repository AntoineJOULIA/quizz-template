import { QuizzItem } from "@/types";
import rawDataFull from "../data/quizz-items.json";
import rawDataSample from "../data/quizz-items_sample.json";

const dataFull = rawDataFull as QuizzItem[];
const dataSample = rawDataSample as QuizzItem[];

export function getQuizzItems() {
  const data = process.env.NODE_ENV === "production" ? dataFull : dataSample;
  return data;
}

export function getQuizzItem(index: string) {
  const data = process.env.NODE_ENV === "production" ? dataFull : dataSample;
  return data.find((quizzItem) => quizzItem.index === index);
}
