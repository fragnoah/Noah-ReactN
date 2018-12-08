import { combineReducers } from 'redux';
import QuizReducer from './QuizReducer';
import QuestionPoolReducer from './QuestionPoolReducer';
import QuestionSolveReducer from './QuestionSolveReducer';

export default combineReducers({
    quiz: QuizReducer,
    pool: QuestionPoolReducer,
    solveSelectedQuestionID: QuestionSolveReducer
});

// im quizreducer lassen sich vermutlich erstmal alle Funktionen abbilden
