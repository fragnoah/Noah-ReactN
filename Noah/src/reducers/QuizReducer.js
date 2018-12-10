import update from 'immutability-helper';

const initalstate = {
    arr: [],
    fragebogen: '',
    basisScore: 0,
    spezScore: 0
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
        case 'get_BasisScore': 
            return { ...state, basisScore: action.payload };
        case 'get_SpezScore':
            return { ...state, spezScore: action.payload };
        default:
            return state;
    }
};

