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
    auswahl: [],
    frage: 0,
    katalog: '',
    auswahlKatalog: []
};
/**
 * Redux-Reducer um Redux-Store zu bearbeiten und aufzurufen
 * @author Timur Burkholz
 */
export default (state = initalstate, action) => {
    switch (action.type) {

        case 'select_fb':
           return { ...state, fragebogen: action.payload };
        case 'checked':
            console.log('inside quizreducer checke: action.payload', action.payload);
           return { ...state, checked: action.payload };
        case 'select_katalog':
           return { ...state, katalog: action.payload };
        case 'safe_auswahl':
           return { ...state, auswahl: action.payload };
        case 'safe_ids':
           return { ...state, auswahlKatalog: action.payload };
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
                qno: 0,
                auswahl: [],
            };
        }
        case 'inc': {
            return { ...state, qno: state.qno + 1 };
        }
        case 'dec': {
            return { ...state, qno: state.qno - 1 };
        }
        case 'forward': {
            return { ...state, frage: state.frage + 1 };
        }
        case 'back': {
            return { ...state, frage: state.frage - 1 };
        }
        case 'reset_wrong': {
            return { ...state, wrongAns: [] };
        }
        case 'reset_wrongAnswer': {
            return { ...state, wrongArr: [] };
        }
        case 'reset_katalog': {
            return { ...state, 
                katalog: '',
                frage: 0,
                auswahlKatalog: []
        };
        }
        // die frage nummer muss raus -> anpassen zum speichern der fragenummer bezogen auf Katalog
        case 'reset_ids': {
            return { ...state, 
                auswahlKatalog: [],
                frage: 0,
        };
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
        case 'pass_Fb': {
            const newItem = action.payload;
            return { 
                ...state,
                passedFb: [...state.passedFb, newItem]
            };
        }
        case 'reset_default': {
            return { ...state, 
                basisScore: 0,
                spezScore: 0,
                wrongAns: [],
                wrongArr: [],
            };
        }
        case 'reset_marked': {
            return { ...state, arr: [] };
        }
        default:
            return state;
    }
};

