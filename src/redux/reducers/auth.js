import * as variables from '../../globalVariables'

const initState = {
    email : ''
}
const reducer = (state=initState, action)=>{
    if(action.type === variables.SAVEEMAIL){
        return {
            ...state,
            email: action.email
        }
    }
    return state
}
export default reducer