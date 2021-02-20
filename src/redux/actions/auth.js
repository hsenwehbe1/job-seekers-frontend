import * as variables from '../../globalVariables';

export const saveData = (data)=>{
    return{
        type: variables.SAVEDATA,
        data
    }
}
export const saveAnswer = (answers)=>{
    console.log(answers)
    return{
        type: variables.SAVEANSWER,
        answers: [...answers]
    }
}