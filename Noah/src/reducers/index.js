import { combineReducers } from 'redux';
import QuizReducer from './QuizReducer';

export default combineReducers({
    quiz: QuizReducer
});

// im quizreducer lassen sich vermutlich erstmal alle Funktionen abbilden
