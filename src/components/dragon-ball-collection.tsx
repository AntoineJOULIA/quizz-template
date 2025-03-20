import { useDragonBalls } from "@/hooks/useDragonBalls";
import { cn, imagePrefix } from "@/lib/utils";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAnime, getAnimes } from "@/lib/db";

export function DragonBallCollection() {
  const { foundDragonBalls: found } = useDragonBalls();

  return (
    <div className="bg-green-100 rounded-lg xl:grid xl:grid-cols-[auto,minmax(auto,40ch),1fr] p-8 gap-x-6 gap-y-2 shadow-md">
      <Image
        className="mx-auto"
        src={imagePrefix() + "assets/images/dragon-ball_radar.png"}
        width={50}
        height={50}
        alt="Détecteur de dragon balls"
      />
      <p
        className={cn("text-2xl font-bold text-center xl:text-left xl:col-span-2", {
          "xl:col-span-1": found.length === 7,
        })}
      >
        Boules de cristal
      </p>
      {found.length === 7 ? (
        <>
          <Shenron />
          <div className="xl:col-start-2 flex flex-col gap-2">
            <p className="text-balance text-center xl:text-left">Tu as trouvé les 7 boules de cristal !</p>
            <p className="text-balance text-center xl:text-left">Tu peux maintenant faire appel au Dragon Sacré.</p>
            <p className="text-balance text-center xl:text-left">Clique sur celui-ci et il exaucera ton voeu !</p>
          </div>
        </>
      ) : (
        <>
          <div className="mt-8 xl:mt-0 xl:col-start-2 flex flex-col gap-2">
            <p className="text-balance text-center xl:text-left">
              Pars à la recherche des boules de cristal disséminées dans le jeu.
            </p>
            <p className="text-balance text-center xl:text-left">
              Trouve les 7 boules et le Dragon Sacré exaucera un voeu !
            </p>
          </div>
          <div className="mt-8 xl:mt-0 grid grid-cols-[repeat(3,50px)] gap-2 place-items-center place-content-center">
            {found.includes("1") ? (
              <Image
                className="col-start-2 row-span-2"
                src={imagePrefix() + "assets/images/dragon-ball_1-etoile.png"}
                width={50}
                height={50}
                alt="Dragon ball à 1 étoile"
              />
            ) : (
              <DragonBallEmptySlot className="col-start-2 row-span-2" />
            )}
            {found.includes("2") ? (
              <Image
                className="row-start-2 row-span-2"
                src={imagePrefix() + "assets/images/dragon-ball_2-etoiles.png"}
                width={50}
                height={50}
                alt="Dragon ball à 2 étoiles"
              />
            ) : (
              <DragonBallEmptySlot className="row-start-2 row-span-2" />
            )}
            {found.includes("3") ? (
              <Image
                className="col-start-3 row-start-2 row-span-2"
                src={imagePrefix() + "assets/images/dragon-ball_3-etoiles.png"}
                width={50}
                height={50}
                alt="Dragon ball à 3 étoiles"
              />
            ) : (
              <DragonBallEmptySlot className="col-start-3 row-start-2 row-span-2" />
            )}
            {found.includes("4") ? (
              <Image
                className="col-start-2 row-start-3 row-span-2"
                src={imagePrefix() + "assets/images/dragon-ball_4-etoiles.png"}
                width={50}
                height={50}
                alt="Dragon ball à 4 étoiles"
              />
            ) : (
              <DragonBallEmptySlot className="col-start-2 row-start-3 row-span-2" />
            )}
            {found.includes("5") ? (
              <Image
                className="col-start-1 row-start-4 row-span-2"
                src={imagePrefix() + "assets/images/dragon-ball_5-etoiles.png"}
                width={50}
                height={50}
                alt="Dragon ball à 5 étoiles"
              />
            ) : (
              <DragonBallEmptySlot className="col-start-1 row-start-4 row-span-2" />
            )}
            {found.includes("6") ? (
              <Image
                className="col-start-3 row-start-4 row-span-2"
                src={imagePrefix() + "assets/images/dragon-ball_6-etoiles.png"}
                width={50}
                height={50}
                alt="Dragon ball à 6 étoiles"
              />
            ) : (
              <DragonBallEmptySlot className="col-start-3 row-start-4 row-span-2" />
            )}
            {found.includes("7") ? (
              <Image
                className="col-start-2 row-start-5 row-span-2"
                src={imagePrefix() + "assets/images/dragon-ball_7-etoiles.png"}
                width={50}
                height={50}
                alt="Dragon ball à 7 étoiles"
              />
            ) : (
              <DragonBallEmptySlot className="col-start-2 row-start-5 row-span-2" />
            )}
          </div>
        </>
      )}
    </div>
  );
}

function DragonBallEmptySlot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "size-9 m-2 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 border-2 border-gray-300",
        className
      )}
    ></div>
  );
}

function Shenron() {
  const [animeIndex, setAnimeIndex] = useState<string>("0");
  const [isHintDisplayed, setIsHintDisplayed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const wishAlreadyGranted = window.localStorage.getItem("anime-quizz.granted-shenron-wish");
    if (wishAlreadyGranted) {
      setIsHintDisplayed(true);
      setAnimeIndex(wishAlreadyGranted);
    }
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setAnimeIndex(e.target.value);
  }

  function submit() {
    setErrorMsg("");
    if (!parseInt(animeIndex)) {
      setErrorMsg("Il faut me donner un nombre !");
      return;
    }
    if (parseInt(animeIndex) < 1 || parseInt(animeIndex) > getAnimes().length) {
      setErrorMsg("Ce nombre ne correspond à aucun dessin animé");
      return;
    }
    setIsHintDisplayed(true);
    const strWithoutLeadingZeros = Number(animeIndex).toString();
    setAnimeIndex(strWithoutLeadingZeros);
    window.localStorage.setItem("anime-quizz.granted-shenron-wish", strWithoutLeadingZeros);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="xl:row-span-2 place-content-center">
          <Image
            className="place-self-center cursor-pointer transition hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,0,1.0)]"
            src={imagePrefix() + "assets/images/dragon-ball_shenron.png"}
            width={150}
            height={200}
            alt="Shenron, le Dragon Sacré"
          />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Dragon sacré</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="block text-balance">Je peux exaucer un voeu :</span>
            <span className="block text-balance">
              indique-moi le numéro d&apos;un dessin animé que tu n&apos;as pas encore trouvé, et je te donnerai son
              titre.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {isHintDisplayed ? (
          <>
            <div className="flex flex-col items-center gap-2">
              <p>Le titre du dessin animé n°{animeIndex} est</p>
              <p className="font-bold text-2xl">{getAnime(animeIndex)?.title}</p>
            </div>
            <AlertDialogFooter className="grid grid-cols-2 gap-4 items-baseline">
              <AlertDialogCancel>Je reste ici</AlertDialogCancel>
              <AlertDialogAction onClick={() => router.push(animeIndex)}>
                Merci, j&apos;y vais !
                <ArrowRight className="size-4" />
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        ) : (
          <>
            <div className="grid grid-cols-[max-content_10ch] gap-4 place-items-center mx-auto">
              <Label htmlFor="index">Je veux connaître le titre du dessin animé</Label>
              <Input id="index" value={animeIndex} onChange={handleChange} />
            </div>
            {errorMsg.length > 0 && <p className="text-destructive text-sm">{errorMsg}</p>}
            <AlertDialogFooter className="grid grid-cols-2 gap-4 items-baseline">
              <AlertDialogCancel>Laisse-moi réfléchir</AlertDialogCancel>
              <Button onClick={submit}>Exauce mon voeu !</Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
