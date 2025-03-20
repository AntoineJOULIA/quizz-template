"use client";

import { useEffect, useState } from "react";
import { useAnimeStatus } from "./useAnimeStatus";
import { getAnimes } from "@/lib/db";
import { SANCTUARY_HOUSES_THRESHOLDS } from "@/lib/constants";

export type House =
  | "belier"
  | "taureau"
  | "gemeaux"
  | "cancer"
  | "lion"
  | "vierge"
  | "balance"
  | "scorpion"
  | "sagittaire"
  | "capricorne"
  | "verseau"
  | "poissons"
  | "pope";

export function useSanctuary() {
  const [currentHouse, setCurrentHouse] = useState<House | null>(null);
  const [animeStatus] = useAnimeStatus();
  const [traversedHouses, setTraversedHouses] = useState<House[] | null>(null);
  const [entersHouse, setEntersHouse] = useState(false);
  const totalCount = getAnimes().length;
  // Add 1 to account for the "delay" between read and update of animeStatus
  const correctCount = 1 + Object.values(animeStatus).filter((status) => status === "correct").length;
  const currentScore = correctCount / totalCount;

  useEffect(() => {
    const storedSanctuaryData = window.localStorage.getItem("anime-quizz.sanctuary");
    if (storedSanctuaryData) {
      const sanctuaryData = JSON.parse(storedSanctuaryData);
      setCurrentHouse(sanctuaryData.currentHouse);
      setTraversedHouses(sanctuaryData.traversedHouses);
      setEntersHouse(sanctuaryData.entersHouse);
    }
  }, []);

  function reset() {
    window.localStorage.setItem(
      "anime-quizz.sanctuary",
      JSON.stringify({ currentHouse: "", traversedHouses: [""], entersHouse: false })
    );
  }

  function updateSanctuaryHouses() {
    if (correctCount >= totalCount - SANCTUARY_HOUSES_THRESHOLDS.pope) {
      const hasEntered = enters("pope");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (correctCount >= totalCount - SANCTUARY_HOUSES_THRESHOLDS.poissons) {
      const hasEntered = enters("poissons");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (currentScore >= SANCTUARY_HOUSES_THRESHOLDS.verseau) {
      const hasEntered = enters("verseau");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (currentScore >= SANCTUARY_HOUSES_THRESHOLDS.capricorne) {
      const hasEntered = enters("capricorne");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (currentScore >= SANCTUARY_HOUSES_THRESHOLDS.sagittaire) {
      const hasEntered = enters("sagittaire");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (currentScore >= SANCTUARY_HOUSES_THRESHOLDS.scorpion) {
      const hasEntered = enters("scorpion");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (currentScore >= SANCTUARY_HOUSES_THRESHOLDS.balance) {
      const hasEntered = enters("balance");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (currentScore >= SANCTUARY_HOUSES_THRESHOLDS.vierge) {
      const hasEntered = enters("vierge");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (currentScore >= SANCTUARY_HOUSES_THRESHOLDS.lion) {
      const hasEntered = enters("lion");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (currentScore >= SANCTUARY_HOUSES_THRESHOLDS.cancer) {
      const hasEntered = enters("cancer");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (currentScore >= SANCTUARY_HOUSES_THRESHOLDS.gemeaux) {
      const hasEntered = enters("gemeaux");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (correctCount >= SANCTUARY_HOUSES_THRESHOLDS.taureau) {
      const hasEntered = enters("taureau");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
    if (correctCount >= SANCTUARY_HOUSES_THRESHOLDS.belier) {
      const hasEntered = enters("belier");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
      );
      return;
    }
  }

  function enters(house: House) {
    if (traversedHouses === null) return false;
    if (!traversedHouses.includes(house)) {
      setEntersHouse(true);
      setCurrentHouse(() => house);
      const traversed = [...traversedHouses, house];
      setTraversedHouses(traversed);
      window.localStorage.setItem(
        "anime-quizz.sanctuary",
        JSON.stringify({ currentHouse: house, traversedHouses: traversed, entersHouse: true })
      );
      return true;
    }
    return false;
  }

  function hasEntered() {
    setEntersHouse(false);
    window.localStorage.setItem(
      "anime-quizz.sanctuary",
      JSON.stringify({ currentHouse, traversedHouses, entersHouse: false })
    );
  }

  function getHouseParticle(house: House) {
    switch (house) {
      case "belier":
        return "du";
      case "taureau":
        return "du";
      case "gemeaux":
        return "des";
      case "cancer":
        return "du";
      case "lion":
        return "du";
      case "vierge":
        return "de la";
      case "balance":
        return "de la";
      case "scorpion":
        return "du";
      case "sagittaire":
        return "du";
      case "capricorne":
        return "du";
      case "verseau":
        return "du";
      case "poissons":
        return "des";
    }
  }

  return { reset, entersHouse, hasEntered, currentHouse, getHouseParticle, updateSanctuaryHouses };
}
