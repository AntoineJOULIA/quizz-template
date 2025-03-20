import { NewGameButton } from "@/components/new-game-button";
import { ResumeGameButton } from "@/components/resume-game-button";

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-auto grow gap-4 md:gap-0">
      <div className="text-2xl text-center md:hidden">
        <p className="text-4xl font-bold">Quizz title</p>
        <p>Subtitle</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <NewGameButton />
        <ResumeGameButton />
      </div>
    </div>
  );
}
