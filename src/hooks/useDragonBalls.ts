import { useEffect, useState } from "react";
import { useHiddenDragonBalls } from "./useHiddenDragonBalls";

export function useDragonBalls() {
  const [foundDragonBalls, setFoundDragonBalls] = useState<string[]>([]);
  const hiddenDragonBalls = useHiddenDragonBalls();

  useEffect(() => {
    const storedFoundBalls = window.localStorage.getItem("anime-quizz.dragon-balls");
    if (storedFoundBalls) {
      setFoundDragonBalls(JSON.parse(storedFoundBalls));
    }
  }, []);

  function updateDragonBallCollection(dragonBallId: string) {
    if (!hiddenDragonBalls[dragonBallId]) {
      return;
    }
    const foundDragonBall = hiddenDragonBalls[dragonBallId];

    if (foundDragonBalls.includes(foundDragonBall)) {
      return;
    }

    const results = [...foundDragonBalls, foundDragonBall];
    setFoundDragonBalls(results);
    window.localStorage.setItem("anime-quizz.dragon-balls", JSON.stringify(results));
  }

  return { foundDragonBalls, updateDragonBallCollection };
}
