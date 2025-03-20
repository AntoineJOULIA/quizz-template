import { useEffect, useState } from "react";

export function useHiddenDragonBalls() {
  const [hiddenDragonBalls, setHiddenDragonBalls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedHiddenBalls = window.localStorage.getItem("anime-quizz.hidden-dragon-balls");
    if (storedHiddenBalls) {
      setHiddenDragonBalls(JSON.parse(storedHiddenBalls));
    }
  }, []);

  return hiddenDragonBalls;
}
