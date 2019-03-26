export * from './NavActions';
export * from './LearnActions';
export * from './messages';
/**
 * @author Timur Burkholz
 */


/**
 * Auswahl Fragebogen
 * Zugriff auf Redux-Store
 * @param fb 
 */
export const selectFb = (fb) => {
    return {
      type: 'select_fb',
      payload: fb
    };
};

export const selectAnswer = (antwort) => {
  return {
    type: 'select_answer',
    payload: antwort
  };
};

export const updateAnswer = (antwort, qno) => {
  return {
    type: 'update_answer',
    payload: antwort,
    index: qno
  };
};

export const resetFb = () => {
  return {
    type: 'reset_fb'
  };
};

export const getBasisScore = (basisScore) => {
  return {
    type: 'get_BasisScore',
    payload: basisScore
  };
};
export const getSpezScore = (spezScore) => {
  return {
    type: 'get_SpezScore',
    payload: spezScore
  };
};
/**
 * Speichern falscher Fragen
 * Zugriff auf Redux-Store
 * @param i 
 */
export const wrong = (i) => {
  return {
    type: 'wrong',
    payload: i
  };
};

export const selectWrongAnswer = (antwort) => {
  return {
    type: 'select_WrongAnswer',
    payload: antwort
  };
};

export const updateWrongAnswer = (antwort, qno) => {
  return {
    type: 'update_WrongAnswer',
    payload: antwort,
    index: qno
  };
};
export const resetWrong = () => {
  return {
    type: 'reset_wrong'
  };
};
export const resetWrongAnswer = () => {
  return {
    type: 'reset_wrongAnswer'
  };
};
export const mark = (qno) => {
  return {
    type: 'mark_question',
    payload: qno
  };
};
export const unmark = (qno) => {
  return {
    type: 'unmark_question',
    payload: qno
  };
};
export const resetMarked = () => {
  return {
    type: 'reset_marked'
  };
};
export const resetDefault = () => {
  return {
    type: 'reset_default'
  };
};
/**
 * Speichern bestandenen Fragebogen
 * Notwendig für Statistische Auswertung
 * Zugriff auf Redux-Store
 * @param i 
 */
export const passFb = (fb) => {
  return {
    type: 'pass_Fb',
    payload: fb
  };
};
/**
 * Nächste Frage auswählen
 * Zugriff auf Redux-Store
 */
export const increment = () => {
  return {
    type: 'inc'
  };
};
export const decrement = () => {
  return {
    type: 'dec'
  };
};
export const safeAuswahl = (auswahl) => {
  return {
    type: 'safe_auswahl',
    payload: auswahl
  };
};
export const safeIds = (ids) => {
  return {
    type: 'safe_ids',
    payload: ids
  };
};
export const back = () => {
  return {
    type: 'back'
  };
};
export const forward = () => {
  return {
    type: 'forward'
  };
};
export const selectKatalog = (katalog) => {
  return {
    type: 'select_katalog',
    payload: katalog
  };
};
export const resetKatalog = () => {
  return {
    type: 'reset_katalog'
  };
};
export const resetIds = () => {
  return {
    type: 'reset_ids'
  };
};
