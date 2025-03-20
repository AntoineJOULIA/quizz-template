"use client";

import { useAnimeStatus } from "@/hooks/useAnimeStatus";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { getAnimes } from "@/lib/db";
import { useEffect, useState } from "react";

export function ResumeGameButton() {
  const [alreadyStarted, setAlreadyStarted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const started = window.localStorage.getItem("anime-quizz.status") !== null;
    setAlreadyStarted(started);
  }, []);

  const [animeStatus] = useAnimeStatus();
  const allAnimes = getAnimes();

  function getFirstUnresolvedIndex() {
    const firstUnresolvedAnime = allAnimes.find((anime) => animeStatus[anime.id] !== "correct");
    const firstUnresolvedIndex = firstUnresolvedAnime?.index ?? 1;
    return firstUnresolvedIndex.toString();
  }

  return (
    <Button
      variant={"outline"}
      size={"lg"}
      onClick={() => router.push(getFirstUnresolvedIndex())}
      disabled={!alreadyStarted}
    >
      <svg className="size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 11">
        <g fill="currentColor">
          <path d="M3 .5A2.506 2.506 0 0 0 .5 3v4C.5 8.376 1.624 9.5 3 9.5h16c1.376 0 2.5-1.124 2.5-2.5V3c0-1.376-1.124-2.5-2.5-2.5Zm0 1h16c.84 0 1.5.66 1.5 1.5v4c0 .84-.66 1.5-1.5 1.5H3c-.84 0-1.5-.66-1.5-1.5V3c0-.84.66-1.5 1.5-1.5Z" />
          <path d="M5 3c-.545 0-1 .455-1 1 0 .545.455 1 1 1h8c.545 0 1-.455 1-1 0-.545-.455-1-1-1H5zm13 0a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1zm0 2a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1zM4 9c-.554 0-1 .446-1 1s.446 1 1 1h2c.554 0 1-.446 1-1s-.446-1-1-1H4zm13 0c-.554 0-1 .446-1 1s.446 1 1 1h2c.554 0 1-.446 1-1s-.446-1-1-1h-2z" />
        </g>
      </svg>
      Continuer
    </Button>
  );
}
