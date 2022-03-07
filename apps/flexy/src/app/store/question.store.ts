import { Store, StoreConfig } from '@datorama/akita';
import {Injectable} from "@angular/core";
import {QuestionInterface} from "../../../../../libs/shared/question.interface";

export interface QuestionState {
  currentQuestion: QuestionInterface,
  questions: QuestionInterface[];
  currentAnswer: string;
  progress: number
}

export function createInitialState(): QuestionState {
  return {
    currentQuestion: null,
    questions: [],
    currentAnswer: null,
    progress: 0
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({ name: 'question' })
export class QuestionStore extends Store<QuestionState> {
  constructor() {
    super(createInitialState());
  }
}
