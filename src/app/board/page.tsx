import { AnswerBoard } from "@/components/answers-board";
import { getQuizzItems } from "@/lib/db";

export default function BoardPage() {
  const quizzItems = getQuizzItems();

  return <AnswerBoard quizzItems={quizzItems} />;
}
