import { Actions } from 'react-native-router-flux';

export const toMain = () => {
  Actions.main(); 
};

export const toTests = () => {
 // resetFb();
        Actions.exam(); 
};

export const toLearn = () => {
  Actions.prepare(); 
};

export const toResult = () => {
  // ToDo: Prüflogik bisherige Fragen
  Actions.resultPages();
};

export const toRepeatAll = () => {
  Actions.repeatAll();
};

export const toRepeatWrong = () => {
  Actions.repeatWrong();
};

export const toRepeatMarked = () => {
  Actions.marked();
};

//export const toQuestions = ({ testNumber }) => {
 export const toQuestions = () => {
  //console.log(testNumber);
  //Actions.quest({ Testnumber: testNumber });
  Actions.doExam();
};

export const toLearnBasicQuestions = () => {
  //console.log(testNumber);
  //Actions.quest({ Testnumber: testNumber });
  Actions.learnbasic();
};

export const toLearnBinnenQuestions = () => {
  //console.log(testNumber);
  //Actions.quest({ Testnumber: testNumber });
  Actions.learnbinnen();
};

export const toLearnSegelQuestions = () => {
  //console.log(testNumber);
  //Actions.quest({ Testnumber: testNumber });
  Actions.learnsegel();
};

export const toGlossar = () => {
  Actions.glossary();
};

export const toVideos = () => {
  Actions.video();
};
export const toKatalog = () => {
  //console.log(testNumber);
  //Actions.quest({ Testnumber: testNumber });
  Actions.katalog();
};
