/**
 * @author Vickry Mukhtar
 */
export default (state = null, action) => {
    //console.log(action.type);
    //console.log(state);
    switch (action.type) {
      case 'select_videos2Title':
        return action.payload;
      default:
        return state;
    }
  };
  