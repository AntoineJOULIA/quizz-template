"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuizzItem } from "@/types";
import { checkAnswer, errorPrimaryMessage, errorSecondaryMessage, videoUrlToEmbed } from "@/lib/utils";
import { useState } from "react";
import { useQuizzItemStatus } from "@/hooks/useQuizzItemStatus";
import { Frown, SearchCheck, Trophy } from "lucide-react";

const formSchema = z.object({
  answer: z
    .string()
    .min(1, { message: "Should be at least 1 character long" })
    .max(50, { message: "Should be less than 50 characters" }),
});

export default function AnswerForm({ quizzItem }: { quizzItem: QuizzItem }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quissItemStatus, updateStatus] = useQuizzItemStatus();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: { answer: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    const success = checkAnswer(quizzItem, values.answer);
    if (success) {
      setIsSuccess(true);

      if (quissItemStatus[quizzItem.id] === "correct") return;

      updateStatus(quizzItem.id, "correct");
    } else {
      setIsSuccess(false);
      updateStatus(quizzItem.id, "wrong");
    }
  }

  const isFound = quissItemStatus[quizzItem.id] === "correct" || isSuccess;

  if (isFound) {
    return (
      <div className="col-span-2 md:col-span-1 flex flex-col gap-6 md:gap-12">
        <div className="flex gap-4">
          <Trophy className="size-8 md:size-12 text-yellow-500" />
          <p className="text-3xl md:text-5xl font-bold">Congratulations!</p>
        </div>
        <p className="text-4xl xl:text-7xl font-black">{quizzItem.title}</p>
        {quizzItem.videoUrl && (
          // https://www.w3schools.com/howto/howto_css_responsive_iframes.asp
          <div className="relative w-full pt-[56.25%]">
            <iframe
              src={videoUrlToEmbed(quizzItem.videoUrl)}
              className="absolute inset-0 w-full h-full"
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
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
                <FormLabel className="text-2xl font-bold">What is this?</FormLabel>
                <FormControl>
                  <Input
                    className="md:text-xl xl:text-2xl p-6 xl:p-8"
                    placeholder="My answer"
                    type="string"
                    autoComplete={process.env.NODE_ENV === "production" ? "off" : "on"}
                    {...field}
                    onChange={(event) => field.onChange(event.target.value)}
                    onFocus={() => setSubmitted(false)}
                  />
                </FormControl>
                <FormDescription>Any specific information</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="text-xl xl:text-2xl font-bold py-6 xl:py-8" type="submit">
            <SearchCheck className="size-8 mr-2" />
            Check
          </Button>
        </form>
      </Form>

      {submitted && (
        <div className="grid grid-cols-[min-content_1fr] gap-x-4 gap-y-2 md:gap-4 content-start">
          <Frown className="size-10 text-red-500" />
          <p className="text-2xl md:text-4xl font-bold">{errorPrimaryMessage()}</p>
          <p className="md:text-2xl col-start-2">{errorSecondaryMessage()}</p>
          <p className="text-xl md:text-2xl col-start-2 font-bold">Try again!</p>
        </div>
      )}
    </div>
  );
}
