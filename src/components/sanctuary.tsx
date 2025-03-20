import { SANCTUARY_HOUSES_THRESHOLDS } from "@/lib/constants";
import { cn, imagePrefix } from "@/lib/utils";
import Image from "next/image";

export function Sanctuary({ correctCount, totalCount }: { correctCount: number; totalCount: number }) {
  const currentScore = correctCount / totalCount;
  return (
    <div className="bg-sky-100 rounded-lg xl:grid xl:grid-cols-[auto,minmax(auto,40ch),1fr] p-8 gap-x-6 gap-y-2 shadow-md">
      <Image
        className="mx-auto"
        src={imagePrefix() + "assets/images/horloge-sanctuaire.png"}
        width={50}
        height={50}
        alt="Horloge du Sanctuaire"
      />
      <p className="text-2xl font-bold text-center xl:text-left xl:col-span-2">Sanctuaire</p>
      <div className="mt-8 xl:mt-0 xl:col-start-2 flex flex-col gap-2">
        <p className="text-balance text-center xl:text-left">
          Traverse les 12 maisons du sanctuaire pour atteindre le Grand Pope.
        </p>
        <p className="text-balance text-center xl:text-left">Chaque bonne réponse te rapproche de ton objectif !</p>
        {correctCount === totalCount ? (
          <div className="">
            <p className="self-center text-2xl font-bold text-center">Bravo, tu as sauvé</p>
            <p className="self-center text-2xl font-bold text-center">Athéna !</p>
          </div>
        ) : correctCount >= totalCount - SANCTUARY_HOUSES_THRESHOLDS.pope ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">Tu affrontes</p>
            <p className="self-center text-2xl font-bold">le Grand Pope !</p>
          </>
        ) : correctCount >= totalCount - SANCTUARY_HOUSES_THRESHOLDS.poissons ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison des
            </p>
            <p className="self-center text-2xl font-bold">Poissons</p>
          </>
        ) : currentScore >= SANCTUARY_HOUSES_THRESHOLDS.verseau ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison du
            </p>
            <p className="self-center text-2xl font-bold">Verseau</p>
          </>
        ) : currentScore >= SANCTUARY_HOUSES_THRESHOLDS.capricorne ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison du
            </p>
            <p className="self-center text-2xl font-bold">Capricorne</p>
          </>
        ) : currentScore >= SANCTUARY_HOUSES_THRESHOLDS.sagittaire ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison du
            </p>
            <p className="self-center text-2xl font-bold">Sagittaire</p>
          </>
        ) : currentScore >= SANCTUARY_HOUSES_THRESHOLDS.scorpion ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison du
            </p>
            <p className="self-center text-2xl font-bold">Scorpion</p>
          </>
        ) : currentScore >= SANCTUARY_HOUSES_THRESHOLDS.balance ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison de la
            </p>
            <p className="self-center text-2xl font-bold">Balance</p>
          </>
        ) : currentScore >= SANCTUARY_HOUSES_THRESHOLDS.vierge ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison de la
            </p>
            <p className="self-center text-2xl font-bold">Vierge</p>
          </>
        ) : currentScore >= SANCTUARY_HOUSES_THRESHOLDS.lion ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison du
            </p>
            <p className="self-center text-2xl font-bold">Lion</p>
          </>
        ) : currentScore >= SANCTUARY_HOUSES_THRESHOLDS.cancer ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison du
            </p>
            <p className="self-center text-2xl font-bold">Cancer</p>
          </>
        ) : currentScore >= SANCTUARY_HOUSES_THRESHOLDS.gemeaux ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison des
            </p>
            <p className="self-center text-2xl font-bold">Gémeaux</p>
          </>
        ) : correctCount >= SANCTUARY_HOUSES_THRESHOLDS.taureau ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison du
            </p>
            <p className="self-center text-2xl font-bold">Taureau</p>
          </>
        ) : correctCount >= SANCTUARY_HOUSES_THRESHOLDS.belier ? (
          <>
            <p className="text-xl text-balance text-center xl:self-center xl:mt-6">
              Tu es actuellement dans la maison du
            </p>
            <p className="self-center text-2xl font-bold">Bélier</p>
          </>
        ) : (
          <>
            <p className="text-xl self-center xl:mt-6">Tu es actuellement à</p>
            <p className="self-center text-2xl font-bold">l&apos;entrée du sanctuaire</p>
          </>
        )}
      </div>
      {correctCount === totalCount ? (
        <div className="mt-4 xl:mt-0">
          <Image
            className="place-self-center"
            src={imagePrefix() + "assets/images/athena.png"}
            width={200}
            height={200}
            alt="Athéna"
          />
        </div>
      ) : correctCount === totalCount - 1 ? (
        <div className="mt-4 xl:mt-0">
          <Image
            className="place-self-center"
            src={imagePrefix() + "assets/images/grand-pope.jpg"}
            width={150}
            height={180}
            alt="Grand Pope"
          />
        </div>
      ) : (
        <div className="mt-4 xl:mt-0 grid grid-cols-[repeat(4,50px)] gap-2 place-content-center">
          <Image
            className={cn({ "opacity-50": correctCount < SANCTUARY_HOUSES_THRESHOLDS.belier })}
            src={imagePrefix() + "assets/images/chevalier-or_belier.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Bélier"
          />
          <Image
            className={cn({ "opacity-50": correctCount < SANCTUARY_HOUSES_THRESHOLDS.taureau })}
            src={imagePrefix() + "assets/images/chevalier-or_taureau.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Taureau"
          />
          <Image
            className={cn({ "opacity-50": currentScore < SANCTUARY_HOUSES_THRESHOLDS.gemeaux })}
            src={imagePrefix() + "assets/images/chevalier-or_gemeaux.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or des Gémeaux"
          />
          <Image
            className={cn({ "opacity-50": currentScore < SANCTUARY_HOUSES_THRESHOLDS.cancer })}
            src={imagePrefix() + "assets/images/chevalier-or_cancer.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Cancer"
          />
          <Image
            className={cn({ "opacity-50": currentScore < SANCTUARY_HOUSES_THRESHOLDS.lion })}
            src={imagePrefix() + "assets/images/chevalier-or_lion.jpg"}
            width={50}
            height={60}
            alt="Chevlier d'or du Lion"
          />
          <Image
            className={cn({ "opacity-50": currentScore < SANCTUARY_HOUSES_THRESHOLDS.vierge })}
            src={imagePrefix() + "assets/images/chevalier-or_vierge.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or de la Vierge"
          />
          <Image
            className={cn({ "opacity-50": currentScore < SANCTUARY_HOUSES_THRESHOLDS.balance })}
            src={imagePrefix() + "assets/images/chevalier-or_balance.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or de la Balance"
          />
          <Image
            className={cn({ "opacity-50": currentScore < SANCTUARY_HOUSES_THRESHOLDS.scorpion })}
            src={imagePrefix() + "assets/images/chevalier-or_scorpion.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Scorpion"
          />
          <Image
            className={cn({ "opacity-50": currentScore < SANCTUARY_HOUSES_THRESHOLDS.sagittaire })}
            src={imagePrefix() + "assets/images/chevalier-or_sagittaire.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Sagittaire"
          />
          <Image
            className={cn({ "opacity-50": currentScore < SANCTUARY_HOUSES_THRESHOLDS.capricorne })}
            src={imagePrefix() + "assets/images/chevalier-or_capricorne.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Capricorne"
          />
          <Image
            className={cn({ "opacity-50": currentScore < SANCTUARY_HOUSES_THRESHOLDS.verseau })}
            src={imagePrefix() + "assets/images/chevalier-or_verseau.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Verseau"
          />
          <Image
            className={cn({ "opacity-50": correctCount < totalCount - SANCTUARY_HOUSES_THRESHOLDS.poissons })}
            src={imagePrefix() + "assets/images/chevalier-or_poissons.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or des Poissons"
          />
        </div>
      )}
    </div>
  );
}
