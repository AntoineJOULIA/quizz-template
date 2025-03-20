"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Tv } from "lucide-react";
import { getAnimes } from "@/lib/db";
import { useSanctuary } from "@/hooks/useSanctuary";

export function NewGameButton() {
  const router = useRouter();
  const { reset } = useSanctuary();

  function handleClick() {
    reset();
    hideDragonBalls();
    window.localStorage.removeItem("anime-quizz.status");
    window.localStorage.removeItem("anime-quizz.dragon-balls");
    window.localStorage.removeItem("anime-quizz.granted-shenron-wish");
    router.push("/1");
  }

  return (
    <Button size={"lg"} className="" onClick={handleClick}>
      <Tv className="mr-2" />
      Nouvelle partie
    </Button>
  );
}

function hideDragonBalls() {
  const hidingAnimeIndexes: string[] = [];
  const totalAnimeCount = getAnimes().length;
  const totalArray = Array.from({ length: totalAnimeCount }, (_, i) => i + 1);
  // Select 7 random indexes from the total array
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * totalArray.length);
    const extractedIndex = totalArray.splice(randomIndex, 1);
    hidingAnimeIndexes.push(extractedIndex[0].toString());
  }
  let hiddenBalls: { [key: string]: string } = {};
  // const hiddenBalls = hidingAnimeIndexes.map((animeIndex, idx) => ({
  //   [animeIndex]: (idx + 1).toString(),
  // }));
  for (let i = 0; i < hidingAnimeIndexes.length; i++) {
    hiddenBalls = { ...hiddenBalls, [hidingAnimeIndexes[i]]: (i + 1).toString() };
  }
  window.localStorage.setItem("anime-quizz.hidden-dragon-balls", JSON.stringify(hiddenBalls));
}
