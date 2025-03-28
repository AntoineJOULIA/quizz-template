"use client";

import { QuizzItem } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn, imagePrefix } from "@/lib/utils";
import { Baby, Glasses, GraduationCap } from "lucide-react";

// Replace all characters (except the first one) by '_'
function toHiddenTitle(title: string) {
  return title.charAt(0) + title.slice(1).replace(/[\p{L}0-9]/gu, "_");
}

export function ImageToggle({ quizzItem }: { quizzItem: QuizzItem }) {
  const [hintType, setHintType] = useState<"easy" | "hard">("hard");
  const [isTitleHintDisplayed, setIsTitleHintDisplayed] = useState(false);

  return (
    <div className="col-span-2 md:col-span-1 md:col-start-2 grid gap-4 place-items-center">
      <Image
        className="aspect-4/3 object-cover w-full h-96 xl:h-[500px]"
        src={hintType === "easy" ? imagePrefix() + quizzItem.easyHint : imagePrefix() + quizzItem.hardHint}
        width={800}
        height={600}
        alt="hint image"
      />
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Button
          className={cn("text-xl px-8 py-6 grow", {
            "text-zinc-800 hover:text-zinc-800 outline-double outline-2 outline-zinc-500": hintType === "hard",
          })}
          size={"lg"}
          variant={"outline"}
          onClick={() => setHintType("hard")}
        >
          <GraduationCap className="mr-2" />
          Hard hint
        </Button>
        <Button
          className={cn("text-xl px-8 py-6 grow", {
            "text-zinc-800 outline-double outline-2 outline-zinc-500 hover:text-zinc-800": hintType === "easy",
          })}
          size={"lg"}
          variant={"outline"}
          onClick={() => setHintType("easy")}
        >
          <Baby className="mr-2" />
          Easy hint
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full items-center">
        <Button
          className="text-xl px-8 py-6 w-full md:w-auto"
          variant={"ghost"}
          onClick={() => setIsTitleHintDisplayed(!isTitleHintDisplayed)}
        >
          <Glasses className="mr-2" />
          Title hint
        </Button>
        {isTitleHintDisplayed && (
          <p className="text-lg md:text-2xl tracking-[0.2em]">{toHiddenTitle(quizzItem.title)}</p>
        )}
      </div>
    </div>
  );
}
