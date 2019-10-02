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

export const selectVideosSection = (key) => {
  //console.log('Learnactions_Section', key);
  return {
    type: 'select_ViedeosSection',
    payload: key
  };
};

export const selectVideosTitle = (Title) => {
  return {
    type: 'select_VideosTitle',
    payload: Title
  };
};

export const selectVideos2Section = (key) => {
  //console.log('Learnactions_Section', key);
  return {
    type: 'select_Viedeos2Section',
    payload: key
  };
};

export const selectVideos2Title = (Title) => {
  return {
    type: 'select_Videos2Title',
    payload: Title
  };
};
