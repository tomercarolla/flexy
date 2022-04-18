export interface QuestionInterface {
  id?: number;
  question?: string;
  learningType?: string;
  answer?: number;
}

export interface ResultsInterface {
  date: string;
  visual: number;
  movement: number;
  auditory: number;
}
