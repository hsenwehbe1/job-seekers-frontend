import React from 'react';
import classes from './Question.css'
import Answer from './Answer/Answer'
const Question = (props) => {
    let count = 3
    if(props.count){
        count = props.count
    }
    return (
        <div className={`${classes.box_shadow} p-3 mt-5`}>
            <p className={classes.question}>{props.question}</p>
            <Answer questionHandler = {props.questionHandler}/>
            <div className={classes.number}>
                {props.number}/{count}
            </div>
            <i onClick = {props.rightHandler} className={`fas fa-arrow-circle-right`}></i>
            {/**<i onClick = {props.leftHandler} className={`fas fa-arrow-circle-left`}></i>**/}
        </div>
    );
}

export default Question;