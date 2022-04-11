import {Query} from '@datorama/akita';
import {QuestionState, QuestionStore} from "./question.store";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class QuestionQuery extends Query<QuestionState> {
  selectQuestions$ = this.select(store => store.questions);
  currentQuestion$ = this.select(store => store.currentQuestion);
  selectVisualLearningPoints$ = this.select(store => store.visualLearningPoints);
  selectMovementLearningPoints$ = this.select(store => store.movementLearningPoints);
  selectAuditoryLearningPoints$ = this.select(store => store.auditoryLearningPoints);

  constructor(store: QuestionStore) {
    super(store);
  }
}
