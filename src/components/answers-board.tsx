"use client";

import { useQuizzItemStatus } from "@/hooks/useQuizzItemStatus";
import { QuizzItem, Status } from "@/types";
import { ChevronLeft, CircleX, Minus, Trophy } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function AnswerBoard({ quizzItems }: { quizzItems: QuizzItem[] }) {
  const [quizzItemStatus] = useQuizzItemStatus();
  const totalCount = quizzItems.length;
  const router = useRouter();

  return (
    <main className="relative p-3">
      <Button
        className="sticky top-4 left-4 rounded-full"
        size={"sm"}
        variant={"default"}
        onClick={() => router.back()}
      >
        <ChevronLeft className="size-4" />
        Back
      </Button>
      <Achievements statusList={quizzItemStatus} totalCount={totalCount} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 mt-8">
        {quizzItems.map((quizzItem) => (
          <BoardItem key={quizzItem.id} quizzItem={quizzItem} status={quizzItemStatus[quizzItem.id]} />
        ))}
      </div>
    </main>
  );
}

function Achievements({
  statusList,
  totalCount,
}: {
  statusList: {
    [key: string]: Status;
  };
  totalCount: number;
}) {
  const correctCount = Object.values(statusList).filter((status) => status === "correct").length;
  return (
    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-8">
      <Score correctCount={correctCount} totalCount={totalCount} />
    </div>
  );
}

function Score({ correctCount, totalCount }: { correctCount: number; totalCount: number }) {
  return (
    <div className="flex flex-col gap-2 items-center md:col-span-2">
      <p className="text-xl md:hidden">Score</p>
      <p className="hidden md:block text-xl">Found</p>
      <p className="text-xl">
        {" "}
        <span className="text-6xl font-black">{correctCount}</span> / {totalCount}
      </p>
    </div>
  );
}

function BoardItem({ quizzItem, status }: { quizzItem: QuizzItem; status: Status }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={`/${quizzItem.index}`}
            className={cn("flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-100", {
              "bg-yellow-50 border-yellow-500 hover:bg-yellow-100": status === "correct",
              "bg-red-50 border-red-500 hover:bg-red-100": status === "wrong",
            })}
          >
            <p>{quizzItem.index.padStart(3, "0")}</p>
            {status === "correct" ? (
              <Trophy className="size-6 text-yellow-500" />
            ) : status === "wrong" ? (
              <CircleX className="size-6 text-red-500" />
            ) : (
              <Minus className="w-6" />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent>{status === "correct" ? quizzItem.title : "Not found"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
