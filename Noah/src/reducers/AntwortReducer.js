export default (state = null, action) => {
    switch (action.type) {
        case 'select_answer':
        return { 
            ...state,
            arr: [...state.arr, action.newItem]
            };
        default:
            return state;
    }
};

