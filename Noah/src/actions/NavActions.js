import { Actions } from 'react-native-router-flux';

export const toTests = () => {
 // resetFb();
        Actions.test(); 
};

export const toLearn = () => {
  Actions.learn(); 
};

export const toResult = () => {
  // ToDo: Prüflogik bisherige Fragen
  Actions.result();
};

//export const toQuestions = ({ testNumber }) => {
 export const toQuestions = () => {
  //console.log(testNumber);
  //Actions.quest({ Testnumber: testNumber });
  Actions.quest();
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
  Actions.glossar();
};
