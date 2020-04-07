import * as types from './../constants/ActionTypes';
import _ from 'lodash';
var cachedTasks = JSON.parse(localStorage.getItem('tasks'));
var s4 = () =>{
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
}
var generateID = () =>{
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4()
    + s4() + s4() + '-' + s4() + '-' +s4() + s4() + '-' + s4();
}

var initialState = cachedTasks ? cachedTasks : [];

var myReducer = (state = initialState, action) =>{
    var id = '';
    var index = -1;
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
                var task = {
                    id: action.task.id,
                    name: action.task.name,
                    status: action.task.status
                }
                if(!task.id){
                    task.id = generateID();
                    state.push(task);
                }else{
                    index = _.findIndex(state, (task) =>{
                        return task.id === action.task.id;
                    })
                    state[index] = task;     
                }
            localStorage.setItem('tasks',JSON.stringify(state)); 
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = _.findIndex(state, (task) =>{
                return task.id === id;
            })
            state.splice(index,1);
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];            
        default: return state;
    }
}

export default myReducer;