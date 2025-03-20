import { Status } from "@/types";
import { useEffect, useState } from "react";

export function useAnimeStatus() {
  const [animeStatus, setAnimeStatus] = useState<{ [key: string]: Status }>({});

  useEffect(() => {
    const storedStatus = window.localStorage.getItem("anime-quizz.status");
    if (storedStatus) {
      setAnimeStatus(JSON.parse(storedStatus));
    }
  }, []);

  function updateStatus(animeId: string, status: Status) {
    const results = { ...animeStatus, [animeId]: status };
    setAnimeStatus(() => results);
    window.localStorage.setItem("anime-quizz.status", JSON.stringify(results));
  }
  return [animeStatus, updateStatus] as const;
}
