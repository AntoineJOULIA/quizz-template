/* Trick to make dynamic tailwind classes work */
// text-zinc-500
// text-red-500
// text-rose-500
// text-orange-500
// text-green-500
// text-blue-500
// text-yellow-500
// text-violet-500

import AnswerForm from "@/components/answer-form";
import { ImageToggle } from "@/components/image-toggle";
import { COLORS } from "@/lib/constants";
import { getQuizzItem, getQuizzItems } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const quizzItems = getQuizzItems();

  return quizzItems.map((item) => ({
    index: item.index,
  }));
}

function randomTextColor() {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  const randomColor = COLORS[randomIndex];
  return `text-${randomColor}-500`;
}

export default async function QuizzPage({ params }: { params: Promise<{ index: string }> }) {
  const { index } = await params;

  const quizzItem = getQuizzItem(index);
  if (!quizzItem) {
    notFound();
  }

  const prevId = parseInt(index) - 1;
  const nextId = parseInt(index) + 1;

  return (
    <div className="p-2 grid grid-cols-2 md:grid-cols-[90px_3fr_2fr_90px] gap-4 md:gap-x-10 xl:gap-x-20 md:gap-y-4">
      <p className={`md:col-start-2 md:col-span-3 text-4xl md:text-6xl font-black ${randomTextColor()}`}>
        {quizzItem.index.toString().padStart(3, "0")}
      </p>
      <ImageToggle quizzItem={quizzItem} />
      <AnswerForm quizzItem={quizzItem} />

      {prevId > 0 ? (
        <Link
          href={`/${prevId}`}
          className="md:col-start-1 md:row-start-2 self-stretch flex justify-center items-center border border-accent md:border-none hover:bg-accent rounded-lg p-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {prevId.toString().padStart(3, "0")}
        </Link>
      ) : (
        <div className="md:col-start-1 md:row-start-2"></div>
      )}
      {nextId <= getQuizzItems().length ? (
        <Link
          href={`/${nextId}`}
          className="start-4 self-stretch flex justify-center items-center border border-accent md:border-none hover:bg-accent rounded-lg p-4"
        >
          {nextId.toString().padStart(3, "0")}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}
