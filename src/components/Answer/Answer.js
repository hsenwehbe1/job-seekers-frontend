import React from 'react'
import classes from './Answer.css'
export default function Answer(props) {
    let selectedCss = ''
    if(props.selected){
        selectedCss = classes.selected
    }
    const clickHandler = (event)=>{
        props.handler(event.target.value, event.target.id)
    }
    return (
        <input onClick={clickHandler} type="text" className={`px-3 py-2 ${selectedCss} ${classes.input}`} readOnly value={props.question} id={props.id}/>
    )
}
