import { NewGameButton } from "@/components/new-game-button";
import { ResumeGameButton } from "@/components/resume-game-button";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Example of local font
const freshman = localFont({ src: "../../public/assets/font/freshman/Freshman.ttf" });
// Example of Google font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-auto grow gap-4 md:gap-0">
      <div className="text-2xl text-center">
        {/* Local font */}
        <p className={`${freshman.className} text-4xl font-bold`}>Quizz title</p>
        {/* Google font */}
        <p className={inter.className}>Subtitle</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <NewGameButton />
        <ResumeGameButton />
      </div>
    </div>
  );
}
