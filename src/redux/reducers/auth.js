import * as variables from '../../globalVariables'

const initState = {
    data : {},
    answers: new Array(8)
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
            answers: action.answers
        }
    }
    return state
}
export default reducer