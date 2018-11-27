
const QuizReducer = (state = { pickFb: 0 }, action) => {
    switch (action.type) {
        case 'fb1': return { pickFb: state.pickFb = 'fb1' };
        case 'fb2': return { pickFb: state.pickFb = 'fb2' };
        default: return state;
    }
  }
export default QuizReducer;
