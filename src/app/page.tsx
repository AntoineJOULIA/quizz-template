import { NewGameButton } from "@/components/new-game-button";
import Image from "next/image";
import { imagePrefix } from "@/lib/utils";
import { ResumeGameButton } from "@/components/resume-game-button";
import localFont from "next/font/local";

const happyMemories = localFont({ src: "../../public/assets/font/Happy Memories/Happy Memories.ttf" });

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-auto grow gap-4 md:gap-0">
      <Image
        className="p-4 md:hidden"
        src={imagePrefix() + "assets/homepage/homepage_illu-mobile.png"}
        width={500}
        height={343}
        alt="Grand Quizz des dessins animés de notre enfance"
      />
      <div className={`${happyMemories.className} text-2xl text-center md:hidden`}>
        <p className="text-4xl font-bold">Dessins animés</p>
        <p>de notre enfance</p>
      </div>
      <Image
        className="hidden md:block"
        src={imagePrefix() + "assets/homepage/homepage_illu.png"}
        width={1000}
        height={686}
        alt="Grand Quizz des dessins animés de notre enfance"
      />
      <div className="flex flex-col md:flex-row gap-4">
        <NewGameButton />
        <ResumeGameButton />
      </div>

      <Image
        className="absolute bottom-0 left-0 max-w-[50vw] -z-10 md:hidden"
        src={imagePrefix() + "assets/homepage/homepage_illu-mobile-left.png"}
        width={500}
        height={343}
        alt="Goldorak"
      />
      <Image
        className="absolute bottom-0 right-0 max-w-[40vw] -z-10 md:hidden"
        src={imagePrefix() + "assets/homepage/homepage_illu-mobile-right.png"}
        width={500}
        height={343}
        alt="Albator"
      />
    </div>
  );
}
