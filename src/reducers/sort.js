import * as types from '../constants/ActionTypes';

var initialState = {
    by: '',
    value: 1 // 1: ascendant
};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.SORT:
            console.log(action.sort.by);
            console.log(action.sort.value);
            return {
                by: action.sort.by,
                value: action.sort.value
            }    
        default: return state;

    }
}

export default myReducer;