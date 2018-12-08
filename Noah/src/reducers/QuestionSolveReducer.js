export default (state = null, action) => {
  switch (action.type) {
    case 'select_question':
      return action.payload;
    default:
      return state;
  }
};
