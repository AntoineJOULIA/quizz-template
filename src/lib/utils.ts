import { QuizzItem } from "@/types";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * See unicode characters at : https://symbl.cc/fr/unicode-table/#combining-diacritical-marks
 * @param str : chaîne de caractères à normaliser, contenant des caractères accentués
 * @returns chaines de caractères normalisée, sans accents, en minuscules et sans espaces inutiles
 */
function normalize(str: string) {
  const normalized = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Special characters (diacritics)
    .replace(/[\u0021-\u002F]/g, "") // Base punctuation, esp. comma
    .replace(/[\u2018-\u201F]/g, "") // General punctuation, esp. apostrophe
    .toLowerCase()
    .trim();
  return normalized;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function imagePrefix() {
  return process.env.NODE_ENV !== "production" ? "/" : "";
}

export function checkAnswer(quizzItem: QuizzItem, answer: string) {
  const success = quizzItem.acceptedAnswers.some((acceptedAnswer) => {
    return normalize(acceptedAnswer) === normalize(answer);
  });
  return success;
}

const ERROR_PRIMARY_MESSAGES = ["Mauvaise réponse", "Non, ce n'est pas ça", "Raté !", "Perdu !", "Faux !", "Et non !"];
const ERROR_SECONDARY_MESSAGES = [
  "Pas facile hein ?",
  "Tu peux mieux faire",
  "Presque ! (non, en fait je n'en sais rien)",
  "Dommage !",
  "Tu y es presque (ou pas ^^)",
  "Ce n'est pas grave",
  "T'es sérieux là ?",
  "LOL",
];
export function errorPrimaryMessage() {
  return ERROR_PRIMARY_MESSAGES[Math.floor(Math.random() * ERROR_PRIMARY_MESSAGES.length)];
}
export function errorSecondaryMessage() {
  return ERROR_SECONDARY_MESSAGES[Math.floor(Math.random() * ERROR_SECONDARY_MESSAGES.length)];
}

export function videoUrlToEmbed(videoUrl: string) {
  if (videoUrl.includes("youtube")) {
    return youtubeUrlToEmbed(videoUrl);
  } else if (videoUrl.includes("dailymotion")) {
    return dailymotionUrlToEmbed(videoUrl);
  }
}

function youtubeUrlToEmbed(youtubeUrl: string) {
  return youtubeUrl.replace("/watch?v=", "/embed/");
}

function dailymotionUrlToEmbed(dailymotionUrl: string) {
  return dailymotionUrl.replace("/video/", "/embed/video/");
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle<T>(array: T[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
