import { Status } from "@/types";
import { useEffect, useState } from "react";

export function useQuestionStatus() {
  const [questionStatus, setQuestionStatus] = useState<{ [key: string]: Status }>({});

  useEffect(() => {
    const storedStatus = window.localStorage.getItem("quizz.status");
    if (storedStatus) {
      setQuestionStatus(JSON.parse(storedStatus));
    }
  }, []);

  function updateStatus(questionId: string, status: Status) {
    const results = { ...questionStatus, [questionId]: status };
    setQuestionStatus(() => results);
    window.localStorage.setItem("quizz.status", JSON.stringify(results));
  }
  return [questionStatus, updateStatus] as const;
}
