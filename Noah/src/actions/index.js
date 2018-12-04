export * from './NavActions';
/*
export * from './Quizactions';
*/
export const selectFb = (fb) => {
    return {
      type: 'select_fb',
      payload: fb
    };
};
