import { combineReducers } from 'redux';
import QuizReducer from './QuizReducer';
import QuestionPoolReducer from './QuestionPoolReducer';
import QuestionSolveReducer from './QuestionSolveReducer';
import GlossarReducer from './GlossarReducer';
import GlossarSection from './GlossarySectionReducer';
import GlossarTitle from './GlossaryTitleReducer';
 
export default combineReducers({
    selectedFb: QuizReducer,
    pool: QuestionPoolReducer,
    solveSelectedQuestionID: QuestionSolveReducer,
    glossary: GlossarReducer,
    selectedGlossarSection: GlossarSection,
    selectedGlossarTitle: GlossarTitle
});
