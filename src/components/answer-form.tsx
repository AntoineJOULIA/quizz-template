"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Anime } from "@/types";
import { checkAnswer, errorPrimaryMessage, errorSecondaryMessage, imagePrefix, videoUrlToEmbed } from "@/lib/utils";
import { useState } from "react";
import { useAnimeStatus } from "@/hooks/useAnimeStatus";
import { ChevronRight, Frown, SearchCheck, Trophy } from "lucide-react";
import { useDragonBalls } from "@/hooks/useDragonBalls";
import { useHiddenDragonBalls } from "@/hooks/useHiddenDragonBalls";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSanctuary } from "@/hooks/useSanctuary";
import { getAnimes } from "@/lib/db";

const formSchema = z.object({
  answer: z
    .string()
    .min(1, { message: "Aucun dessin animé n'a un titre aussi court !" })
    .max(50, { message: "Aucun dessin animé n'a un titre aussi long !" }),
});

export default function AnswerForm({ anime }: { anime: Anime }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDragonBallModal, setShowDragonBallModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [animeStatus, updateStatus] = useAnimeStatus();
  const { updateSanctuaryHouses } = useSanctuary();
  const { updateDragonBallCollection } = useDragonBalls();
  const hiddenDragonBalls = useHiddenDragonBalls();
  const router = useRouter();
  const totalCount = getAnimes().length;
  const correctCount = Object.values(animeStatus).filter((status) => status === "correct").length;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: { answer: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    const success = checkAnswer(anime, values.answer);
    if (success) {
      setIsSuccess(true);

      if (animeStatus[anime.id] === "correct") return;

      updateStatus(anime.id, "correct");

      updateSanctuaryHouses();

      updateDragonBallCollection(anime.index);
      if (hiddenDragonBalls[anime.index]) {
        setShowDragonBallModal(true);
      }

      // The current correct answer must be added to the previous count
      if (correctCount + 1 === totalCount) {
        setShowVictoryModal(true);
      }
    } else {
      setIsSuccess(false);
      updateStatus(anime.id, "wrong");
    }
  }

  const isFound = animeStatus[anime.id] === "correct" || isSuccess;

  if (isFound) {
    return (
      <div className="col-span-2 md:col-span-1 flex flex-col gap-6 md:gap-12">
        <div className="flex gap-4">
          <Trophy className="size-8 md:size-12 text-yellow-500" />
          <p className="text-3xl md:text-5xl font-bold">Bravo !</p>
        </div>
        <p className="text-4xl xl:text-7xl font-black">{anime.title}</p>
        {anime.videoUrl && (
          // https://www.w3schools.com/howto/howto_css_responsive_iframes.asp
          <div className="relative w-full pt-[56.25%]">
            <iframe
              src={videoUrlToEmbed(anime.videoUrl)}
              className="absolute inset-0 w-full h-full"
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <AlertDialog open={showDragonBallModal} onOpenChange={setShowDragonBallModal}>
          <AlertDialogContent className="flex flex-col">
            <AlertDialogHeader className="justify-self-center">
              <AlertDialogTitle className="text-center text-2xl">Bravo !</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Tu as trouvé la boule à {hiddenDragonBalls[anime.index]} étoile
                {hiddenDragonBalls[anime.index] === "1" ? "" : "s"} !
                <Image
                  className="justify-self-center mx-auto"
                  src={
                    imagePrefix() +
                    `assets/images/dragon-ball_${hiddenDragonBalls[anime.index]}-etoile${
                      hiddenDragonBalls[anime.index] === "1" ? "" : "s"
                    }.png`
                  }
                  alt="Radar"
                  width={200}
                  height={200}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="grid grid-cols-2 items-baseline gap-2">
              <AlertDialogCancel>Revenir au quizz</AlertDialogCancel>
              <AlertDialogAction onClick={() => router.push("/board")}>
                Voir ma collection
                <ChevronRight className="size-4" />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showVictoryModal} onOpenChange={setShowVictoryModal}>
          <AlertDialogContent className="flex flex-col">
            <AlertDialogHeader className="justify-self-center">
              <AlertDialogTitle className="text-center text-2xl">Félicitations !</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                <span className="block">Tu as reconnu tous les dessins animés !</span>
                <span className="block">Tu as pu sauver Athéna et le monde de notre enfance !</span>
                <Image
                  className="justify-self-center"
                  src={imagePrefix() + `assets/images/athena.png`}
                  alt="Athéna"
                  width={200}
                  height={200}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="grid grid-cols-1">
              <AlertDialogAction onClick={() => router.push("/board")}>
                Bilan
                <ChevronRight className="size-4" />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="col-span-2 md:col-span-1 flex flex-col gap-8 md:gap-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-8">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl font-bold">Quel est ce dessin animé ?</FormLabel>
                <FormControl>
                  <Input
                    className="md:text-xl xl:text-2xl p-6 xl:p-8"
                    placeholder="Ma réponse"
                    type="string"
                    autoComplete={process.env.NODE_ENV === "production" ? "off" : "on"}
                    {...field}
                    onChange={(event) => field.onChange(event.target.value)}
                    onFocus={() => setSubmitted(false)}
                  />
                </FormControl>
                <FormDescription>Il s&apos;agit du titre français</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="text-xl xl:text-2xl font-bold py-6 xl:py-8" type="submit">
            Vérifier
            <SearchCheck className="size-8 mr-2" />
          </Button>
        </form>
      </Form>

      {submitted && (
        <div className="grid grid-cols-[min-content_1fr] gap-x-4 gap-y-2 md:gap-4 content-start">
          <Frown className="size-10 text-red-500" />
          <p className="text-2xl md:text-4xl font-bold">{errorPrimaryMessage()}</p>
          <p className="md:text-2xl col-start-2">{errorSecondaryMessage()}</p>
          <p className="text-xl md:text-2xl col-start-2 font-bold">Essaye encore !</p>
        </div>
      )}
    </div>
  );
}
