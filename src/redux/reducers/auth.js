import * as variables from '../../globalVariables'

const initState = {
    data : {},
    answers: new Array(10),
    options: [['','',''],['', '', '', '', ''],['','','',''],['','',''],['','','','',''], ['', '', '', '', ''], ['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', '']],
    check: [[false, false, false, false, false], [false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false]]
}
const reducer = (state=initState, action)=>{
    if(action.type === variables.SAVEDATA){
        return {
            ...state,
            data: action.data
        }
    }else if(action.type === variables.SAVEANSWER){
        return {
            ...state,
            answers: [...action.answers]
        }
    }else if(action.type === variables.SAVEOPTIONS){
        return {
            ...state,
            options: [...action.options]
        }
    }else if(action.type === variables.SAVECHECK){
        return {
            ...state,
            check: [...action.check]
        }
    }
    return state
}
export default reducer