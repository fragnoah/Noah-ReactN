import { combineReducers } from 'redux';
import QuizReducer from './QuizReducer';
<<<<<<< HEAD

export default combineReducers({
    quiz: QuizReducer
=======
import QuestionPoolReducer from './QuestionPoolReducer';
import QuestionSolveReducer from './QuestionSolveReducer';

export default combineReducers({
    quiz: QuizReducer,
    pool: QuestionPoolReducer,
    solveSelectedQuestionID: QuestionSolveReducer
>>>>>>> ddbf39451b640ee054f42f7cbf2fc3e34072a99e
});

// im quizreducer lassen sich vermutlich erstmal alle Funktionen abbilden
