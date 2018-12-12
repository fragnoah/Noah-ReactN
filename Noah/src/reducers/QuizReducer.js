import update from 'immutability-helper';

const initalstate = {
    arr: [],
    fragebogen: '',
    basisScore: 0,
    spezScore: 0,
    wrongAns: [],
    markedAns: [],
    wrongArr: []
};

export default (state = initalstate, action) => {
    switch (action.type) {
        case 'select_fb':
           return { ...state, fragebogen: action.payload };
        case 'select_answer': {
            const newItem = action.payload;
            return { 
                ...state,
                arr: [...state.arr, newItem]
            };
        }
        case 'update_answer':
            return update(state, { 
                arr: { 
                [action.index]: 
                { $set: action.payload }
              }
            }
          );
        case 'reset_fb': {
            return { ...initalstate };
        }
        case 'reset_wrong': {
            return { ...state, wrongAns: [] };
        }
        case 'get_BasisScore': 
            return { ...state, basisScore: action.payload };
        case 'get_SpezScore':
            return { ...state, spezScore: action.payload };
        case 'wrong': {
            const wrongItem = action.payload;
            return { 
                ...state,
                wrongAns: [...state.wrongAns, wrongItem]
                };
            }
        case 'select_WrongAnswer': {
            const newItem = action.payload;
            return { 
                ...state,
                wrongArr: [...state.wrongArr, newItem]
                };
            }
        case 'update_WrongAnswer':
                return update(state, { 
                    wrongArr: { 
                    [action.index]: 
                    { $set: action.payload }
                  }
                }
              );
        default:
            return state;
    }
};

