import update from 'immutability-helper';

const initalstate = {
    arr: [],
    fragebogen: '',
    basisScore: 0,
    spezScore: 0,
    wrongAns: [],
    marked: [],
    wrongArr: [],
    passedFb: [],
    qno: 0,
    auswahl: []
};

export default (state = initalstate, action) => {
    switch (action.type) {

        case 'select_fb':
           return { ...state, fragebogen: action.payload };
        case 'safe_auswahl':
           return { ...state, auswahl: action.payload };
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
            return { ...state,
                arr: [],
                fragebogen: '', 
                basisScore: 0,
                spezScore: 0,
                marked: [],
                wrongAns: [],
                wrongArr: [],
                qno: 0
            };
        }
        case 'inc': {
            return { ...state, qno: state.qno + 1 };
        }
        case 'dec': {
            return { ...state, qno: state.qno - 1 };
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
        case 'reset_default': {
            return { ...state, 
                basisScore: 0,
                spezScore: 0,
                wrongAns: [],
                wrongArr: [],
            };
        }
        case 'pass_Fb': {
            const newItem = action.payload;
            return { 
                ...state,
                passedFb: [...state.passedFb, newItem]
            };
        }
        default:
            return state;
    }
};

