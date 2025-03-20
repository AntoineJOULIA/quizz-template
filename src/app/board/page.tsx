import { AnswerBoard } from "@/components/answers-board";
import { getQuestions } from "@/lib/db";

export default function BoardPage() {
  const questions = getQuestions();

  return <AnswerBoard questions={questions} />;
}
