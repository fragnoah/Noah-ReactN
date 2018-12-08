import { combineReducers } from 'redux';
import QuizReducer from './QuizReducer';
import QuestionPoolReducer from './QuestionPoolReducer';
import QuestionSolveReducer from './QuestionSolveReducer';

export default combineReducers({
    selectedFb: QuizReducer,
    pool: QuestionPoolReducer,
    solveSelectedQuestionID: QuestionSolveReducer
});
