import { AnswerBoard } from "@/components/answers-board";
import { getAnimes } from "@/lib/db";

export default function BoardPage() {
  const animes = getAnimes();

  return <AnswerBoard animes={animes} />;
}
