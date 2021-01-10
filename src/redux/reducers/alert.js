import * as variables from '../../globalVariables'

const initState = {
    alertOpen : false,
    alertType : '',
    alertMessage : '',
    alertDuration : 0
}
const reducer = (state=initState, action)=>{
    if(action.type === variables.TRIGGERALERT){
        return {
            alertOpen : action.alertOpen,
            alertType : action.alertType,
            alertMessage : action.alertMessage,
            alertDuration : action.alertDuration
        }
    }
    return state
}
export default reducer