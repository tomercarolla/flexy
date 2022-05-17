import { Store, StoreConfig } from '@datorama/akita';
import {Injectable} from "@angular/core";
import {QuestionInterface} from "@flexy/shared";

export interface QuestionState {
  currentQuestion: QuestionInterface,
  questions: QuestionInterface[];
  currentAnswer: string;
  progress: number;
  sendAnswers: boolean;
  visualLearningPoints: number;
  movementLearningPoints: number;
  auditoryLearningPoints: number;
}

export function createInitialState(): QuestionState {
  return {
    currentQuestion: null,
    questions: [],
    currentAnswer: null,
    progress: 0,
    sendAnswers: null,
    visualLearningPoints: 0,
    movementLearningPoints: 0,
    auditoryLearningPoints: 0
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({ name: 'question' })
export class QuestionStore extends Store<QuestionState> {
  constructor() {
    super(createInitialState());
  }
}
