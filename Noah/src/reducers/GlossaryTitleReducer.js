export default (state = null, action) => {
  //console.log(action.type);
  //console.log(state);
  switch (action.type) {
    case 'select_glossaryTitle':
      return action.payload;
    default:
      return state;
  }
};
