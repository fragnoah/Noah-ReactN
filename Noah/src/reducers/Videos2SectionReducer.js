/**
 * 
 * @author Vickry Mukhtar
 */
export default (state = null, action) => {
    //console.log('GlSecRed_Type', action.type);
    //console.log('GlSecRed_State', state);
    switch (action.type) {
      case 'select_videos2Section':
        return action.payload;
      default:
        return state;
    }
  };