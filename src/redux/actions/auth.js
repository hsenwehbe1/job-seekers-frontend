import * as variables from '../../globalVariables';

export const saveEmail = (email)=>{
    return{
        type: variables.SAVEEMAIL,
        email
    }
}