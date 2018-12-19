export const selectQuestion = (QuestionId) => {
    return {
      type: 'select_question',
      payload: QuestionId
    };
};

export const selectGlossarySection = (key) => {
  //console.log('Learnactions_Section', key);
  return {
    type: 'select_glossarySection',
    payload: key
  };
};

export const selectGlossaryTitle = (Title) => {
  return {
    type: 'select_glossaryTitle',
    payload: Title
  };
};
