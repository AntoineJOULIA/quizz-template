export type Anime = {
  id: string;
  index: string;
  title: string;
  hardHint: string;
  easyHint: string;
  acceptedAnswers: string[];
  videoUrl?: string;
};

export type Status = "new" | "correct" | "wrong";
