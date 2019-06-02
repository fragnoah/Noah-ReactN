
/**
 * @author Timur Burkholz
 */


/**
 * Auswahl Fragebogen
 * Zugriff auf Redux-Store
 * @param fb 
 */
export const selectLearnFb = (fb) => {
    return {
      type: 'select_Learnfb',
      payload: fb
    };
};

export const selectLearnAnswer = (antwort) => {
  return {
    type: 'select_Learnanswer',
    payload: antwort
  };
};

export const updateLearnAnswer = (antwort, qno) => {
  return {
    type: 'update_Learnanswer',
    payload: antwort,
    index: qno
  };
};

export const resetLearnFb = () => {
  return {
    type: 'reset_Learnfb'
  };
};

export const getLearnBasisScore = (basisScore) => {
  return {
    type: 'get_LearnBasisScore',
    payload: basisScore
  };
};
export const getLearnSpezScore = (spezScore) => {
  return {
    type: 'get_LearnSpezScore',
    payload: spezScore
  };
};
/**
 * Speichern falscher Fragen
 * Zugriff auf Redux-Store
 * @param i 
 */
export const WrongLearn = (i) => {
  return {
    type: 'wrongLearn',
    payload: i
  };
};

export const selectLearnWrongAnswer = (antwort) => {
  return {
    type: 'select_LearnWrongAnswer',
    payload: antwort
  };
};

export const updateLearnWrongAnswer = (antwort, qno) => {
  return {
    type: 'update_LearnWrongAnswer',
    payload: antwort,
    index: qno
  };
};
export const resetLearnWrong = () => {
  return {
    type: 'reset_Learnwrong'
  };
};
export const resetLearnWrongAnswer = () => {
  return {
    type: 'reset_LearnwrongAnswer'
  };
};
export const markLearn = (qno) => {
  return {
    type: 'mark_Learnquestion',
    payload: qno
  };
};
export const unmarkLearn = (qno) => {
  return {
    type: 'unmark_Learnquestion',
    payload: qno
  };
};
export const resetLearnMarked = () => {
  return {
    type: 'reset_Learnmarked'
  };
};
export const resetLearnDefault = () => {
  return {
    type: 'reset_Learndefault'
  };
};
/**
 * Speichern bestandenen Fragebogen
 * Notwendig für Statistische Auswertung
 * Zugriff auf Redux-Store
 * @param i 
 */
export const passLearnFb = (fb) => {
  return {
    type: 'pass_LearnFb',
    payload: fb
  };
};
/**
 * Nächste Frage auswählen
 * Zugriff auf Redux-Store
 */
export const incrementLearn = () => {
  return {
    type: 'incLearn'
  };
};
export const decrementLearn = () => {
  return {
    type: 'decLearn'
  };
};
export const safeLearnAuswahl = (auswahl) => {
  return {
    type: 'safe_Learnauswahl',
    payload: auswahl
  };
};
export const safeLearnIds = (ids) => {
  return {
    type: 'safe_Learnids',
    payload: ids
  };
};
export const backLearn = () => {
  return {
    type: 'backLearn'
  };
};
export const forwardLearn = () => {
  return {
    type: 'forwardLearn'
  };
};
export const selectLearnKatalog = (katalog) => {
  return {
    type: 'select_Learnkatalog',
    payload: katalog
  };
};
export const resetLearnKatalog = () => {
  return {
    type: 'reset_Learnkatalog'
  };
};
export const resetLearnIds = () => {
  return {
    type: 'reset_Learnids'
  };
};
