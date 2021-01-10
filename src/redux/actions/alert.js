import * as variables from '../../globalVariables';

export const triggerAlert = (alertOpen, alertType, alertMessage, alertDuration)=>{
    return{
        type: variables.TRIGGERALERT,
        alertOpen,
        alertType,
        alertMessage,
        alertDuration
    }
}