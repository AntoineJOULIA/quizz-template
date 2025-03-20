import { Anime } from "@/types";
import rawDataFull from "../data/dessins-animes.json";
import rawDataSample from "../data/dessins-animes_sample.json";
// import rawDataSample from "../data/dessins-animes.json";

const dataFull = rawDataFull as Anime[];
const dataSample = rawDataSample as Anime[];

export function getAnimes() {
  const data = process.env.NODE_ENV === "production" ? dataFull : dataSample;
  return data;
}

export function getAnime(index: string) {
  const data = process.env.NODE_ENV === "production" ? dataFull : dataSample;
  return data.find((anime) => anime.index === index);
}
