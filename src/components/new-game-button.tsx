"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Tv } from "lucide-react";

export function NewGameButton() {
  const router = useRouter();

  function handleClick() {
    window.localStorage.removeItem("quizz.status");
    router.push("/1");
  }

  return (
    <Button size={"lg"} className="" onClick={handleClick}>
      <Tv className="mr-2" />
      New Game
    </Button>
  );
}
