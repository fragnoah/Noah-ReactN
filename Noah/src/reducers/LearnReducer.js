import update from 'immutability-helper';

const initalstate = {
    learnarr: [],
    learnfragebogen: '',
    learnbasisScore: 0,
    learnspezScore: 0,
    learnwrongAns: [],
    learnmarked: [],
    learnwrongArr: [],
    learnpassedFb: [],
    learnqno: 0,
    learnauswahl: [],
    learnfrage: 0,
    learnkatalog: '',
    learnauswahlKatalog: []
};
/**
 * Redux-Reducer um Redux-Store zu bearbeiten und aufzurufen
 * @author Timur Burkholz
 */
export default (state = initalstate, action) => {
    switch (action.type) {

        case 'select_Learnfb':
           return { ...state, learnfragebogen: action.payload };
        case 'select_Learnkatalog':
           return { ...state, learnkatalog: action.payload };
        case 'safe_Learnauswahl':
           return { ...state, learnauswahl: action.payload };
        case 'safe_Learnids':
           return { ...state, learnauswahlKatalog: action.payload };
        case 'select_Learnanswer': {
            const newItem = action.payload;
            return { 
                ...state,
                learnarr: [...state.learnarr, newItem]
            };
        }
        case 'update_Learnanswer':
            return update(state, { 
                learnarr: { 
                [action.index]: 
                { $set: action.payload }
              }
            }
          );
        case 'reset_Learnfb': {
            return { ...state,
                learnarr: [],
                learnfragebogen: '', 
                learnbasisScore: 0,
                learnspezScore: 0,
                learnmarked: [],
                learnwrongAns: [],
                learnwrongArr: [],
                learnqno: 0,
                learnauswahl: [],
            };
        }
        case 'incLearn': {
            return { ...state, learnqno: state.learnqno + 1 };
        }
        case 'decLearn': {
            return { ...state, learnqno: state.learnqno - 1 };
        }
        case 'forwardLearn': {
            return { ...state, learnfrage: state.learnfrage + 1 };
        }
        case 'backLearn': {
            return { ...state, learnfrage: state.learnfrage - 1 };
        }
        case 'reset_Learnwrong': {
            return { ...state, learnwrongAns: [] };
        }
        case 'reset_LearnwrongAnswer': {
            return { ...state, learnwrongArr: [] };
        }
        case 'reset_Learnkatalog': {
            return { ...state, 
                learnkatalog: '',
                learnfrage: 0,
                learnauswahlKatalog: []
        };
        }
        // die frage nummer muss raus -> anpassen zum speichern der fragenummer bezogen auf Katalog
        case 'reset_Learnids': {
            return { ...state, 
                learnauswahlKatalog: [],
                learnfrage: 0,
        };
        }
        case 'get_LearnBasisScore': 
            return { ...state, learnbasisScore: action.payload };
        case 'get_LearnSpezScore':
            return { ...state, learnspezScore: action.payload };
        case 'wrongLearn': {
            const wrongItem = action.payload;
            return { 
                ...state,
                learnwrongAns: [...state.learnwrongAns, wrongItem]
                };
            }
        case 'select_LearnWrongAnswer': {
            const newItem = action.payload;
            return { 
                ...state,
                learnwrongArr: [...state.learnwrongArr, newItem]
                };
            }
        case 'update_LearnWrongAnswer':
                return update(state, { 
                    learnwrongArr: { 
                    [action.index]: 
                    { $set: action.payload }
                  }
                }
              );
        case 'mark_Learnquestion': {
            const newItem = action.payload;
            return { 
                ...state,
                learnmarked: [...state.learnmarked, newItem]
            };
        }
        case 'unmark_Learnquestion': {
            return {
                ...state,
                learnmarked: state.learnmarked.filter(item => item !== action.payload)
            };
        }
        case 'pass_LearnFb': {
            const newItem = action.payload;
            return { 
                ...state,
                learnpassedFb: [...state.learnpassedFb, newItem]
            };
        }
        case 'reset_Learndefault': {
            return { ...state, 
                learnbasisScore: 0,
                learnspezScore: 0,
                learnwrongAns: [],
                learnwrongArr: [],
            };
        }
        case 'reset_Learnmarked': {
            return { ...state, learnarr: [] };
        }
        default:
            return state;
    }
};

