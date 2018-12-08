const initalstate = {
    arr: [],
    fragebogen: ''
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
        default:
            return state;
    }
};

