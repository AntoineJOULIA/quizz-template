"use client";

import { Anime } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { capitalize, cn, imagePrefix } from "@/lib/utils";
import { Baby, ChevronRight, Glasses, GraduationCap } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useSanctuary } from "@/hooks/useSanctuary";

// Replace all characters (except the first one) by '_'
function toHiddenTitle(title: string) {
  return title.charAt(0) + title.slice(1).replace(/[\p{L}0-9]/gu, "_");
}

export function ImageToggle({ anime }: { anime: Anime }) {
  const [hintType, setHintType] = useState<"easy" | "hard">("hard");
  const [isTitleHintDisplayed, setIsTitleHintDisplayed] = useState(false);
  const [showSanctuaryModal, setShowSanctuaryModal] = useState(false);
  const [hasSanctuaryModalBeenShown, setHasSanctuaryModalBeenShown] = useState(false);
  const router = useRouter();
  const { entersHouse, hasEntered, currentHouse, getHouseParticle } = useSanctuary();

  if (currentHouse && entersHouse && !showSanctuaryModal && !hasSanctuaryModalBeenShown) {
    setShowSanctuaryModal(true);
    setHasSanctuaryModalBeenShown(true);
    hasEntered();
  }

  return (
    <div className="col-span-2 md:col-span-1 md:col-start-2 grid gap-4 place-items-center">
      <Image
        className="aspect-4/3 object-cover w-full h-96 xl:h-[500px] rounded-lg md:rounded-2xl xl:rounded-[35px]"
        src={hintType === "easy" ? imagePrefix() + anime.easyHint : imagePrefix() + anime.hardHint}
        width={800}
        height={600}
        alt="hint image"
      />
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Button
          className={cn("text-xl px-8 py-6 grow", {
            "text-blue-800 hover:text-blue-800 outline-double outline-2 outline-blue-500": hintType === "hard",
          })}
          size={"lg"}
          variant={"outline"}
          onClick={() => setHintType("hard")}
        >
          <GraduationCap className="mr-2" />
          Image difficile
        </Button>
        <Button
          className={cn("text-xl px-8 py-6 grow", {
            "text-blue-800 outline-double outline-2 outline-blue-500 hover:text-blue-800": hintType === "easy",
          })}
          size={"lg"}
          variant={"outline"}
          onClick={() => setHintType("easy")}
        >
          <Baby className="mr-2" />
          Image facile
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full items-center">
        <Button
          className="text-xl px-8 py-6 w-full md:w-auto"
          variant={"ghost"}
          onClick={() => setIsTitleHintDisplayed(!isTitleHintDisplayed)}
        >
          <Glasses className="mr-2" />
          Indice titre
        </Button>
        {isTitleHintDisplayed && <p className="text-lg md:text-2xl tracking-[0.2em]">{toHiddenTitle(anime.title)}</p>}
      </div>
      <AlertDialog open={showSanctuaryModal} onOpenChange={setShowSanctuaryModal}>
        <AlertDialogContent className="flex flex-col">
          <AlertDialogHeader className="justify-self-center">
            <AlertDialogTitle className="text-center md:text-2xl">Bravo !</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {currentHouse &&
                (currentHouse === "pope" ? (
                  <>
                    <span className="block">Tu as vaincu tous les chevaliers d&apos;or.</span>
                    <span className="block">Tu es maintenant face au Grand Pope !</span>
                    <span className="block mt-4">Sauve Athéna !</span>
                    <Image
                      className="justify-self-center mx-auto mt-8"
                      src={imagePrefix() + `assets/images/grand-pope.jpg`}
                      alt="Grand Pope"
                      width={200}
                      height={200}
                    />
                  </>
                ) : (
                  <>
                    <span className="block">
                      Tu as atteint la maison {getHouseParticle(currentHouse)} {capitalize(currentHouse)} !
                      <span className="block">Continue ton avancée dans le sanctuaire !</span>
                    </span>
                    <Image
                      className="justify-self-center mx-auto mt-8"
                      src={imagePrefix() + `assets/images/chevalier-or_${currentHouse}.jpg`}
                      alt={`Chevalier d'or ${getHouseParticle(currentHouse)} ${currentHouse}`}
                      width={200}
                      height={200}
                    />
                  </>
                ))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid grid-cols-2 gap-2 items-baseline">
            <AlertDialogCancel>Revenir au quizz</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push("/board")}>
              Voir ma progression
              <ChevronRight className="size-4" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
