export const selectQuestion = (QuestionId) => {
    return {
      type: 'select_question',
      payload: QuestionId
    };
};
