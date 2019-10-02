import { combineReducers } from 'redux';
import QuizReducer from './QuizReducer';
import QuestionPoolReducer from './QuestionPoolReducer';
import QuestionSolveReducer from './QuestionSolveReducer';
import GlossarReducer from './GlossarReducer';
import GlossarSection from './GlossarySectionReducer';
import GlossarTitle from './GlossaryTitleReducer';
import VideoIndex from './VideoReducer';
import LearnReducer from './LearnReducer';
import Videos2Reducer from './Videos2Reducer';
import Videos2Section from './Videos2SectionReducer';
import Videos2Title from './Videos2TitleReducer';
/**
 * @brief Einbindung der neuen Reducer
 * @author Vickry Mukhtar
 */
export default combineReducers({
    selectedFb: QuizReducer,
    pool: QuestionPoolReducer,
    solveSelectedQuestionID: QuestionSolveReducer,
    glossary: GlossarReducer,
    selectedGlossarSection: GlossarSection,
    selectedGlossarTitle: GlossarTitle,
    videoindex: VideoIndex,
    learn: LearnReducer,
    videos2: Videos2Reducer,
    selectedVideos2Section: Videos2Section,
    selectedVideos2Title: Videos2Title
});
