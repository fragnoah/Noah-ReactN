import update from 'immutability-helper';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initalstate = {
    arr: [],
    fragebogen: '',
    basisScore: 0,
    spezScore: 0,
    wrongAns: [],
    marked: [],
    wrongArr: []
};

export default (state = initalstate, action) => {
    switch (action.type) {
         // case REHYDRATE:
        //    return action.payload.selectedFb || [];
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
        case 'reset_wrongAnswer': {
            return { ...state, wrongArr: [] };
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
        case 'mark_question': {
            const newItem = action.payload;
            return { 
                ...state,
                marked: [...state.marked, newItem]
            };
        }
        case 'unmark_question': {
            return {
                ...state,
                marked: state.marked.filter(item => item !== action.payload)
            };
        }
        case 'reset_marked': {
            return { ...state, arr: [] };
        }
        default:
            return state;
    }
};

