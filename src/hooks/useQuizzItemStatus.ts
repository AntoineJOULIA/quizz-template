import { Status } from "@/types";
import { useEffect, useState } from "react";

export function useQuizzItemStatus() {
  const [quizzItemStatus, setQuizzItemStatus] = useState<{ [key: string]: Status }>({});

  useEffect(() => {
    const storedStatus = window.localStorage.getItem("quizz.status");
    if (storedStatus) {
      setQuizzItemStatus(JSON.parse(storedStatus));
    }
  }, []);

  function updateStatus(questionId: string, status: Status) {
    const results = { ...quizzItemStatus, [questionId]: status };
    setQuizzItemStatus(() => results);
    window.localStorage.setItem("quizz.status", JSON.stringify(results));
  }
  return [quizzItemStatus, updateStatus] as const;
}
