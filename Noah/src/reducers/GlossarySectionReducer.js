export default (state = null, action) => {
  //console.log('GlSecRed_Type', action.type);
  //console.log('GlSecRed_State', state);
  switch (action.type) {
    case 'select_glossarySection':
      return action.payload;
    default:
      return state;
  }
};
