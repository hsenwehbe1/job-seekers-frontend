import React from 'react'
import classes from './Button.css'
export default function Button(props) {
    let color = classes.white
    if(props.selected){
        color = classes.red
    }
    const clickHandler = (event)=>{
        props.handler(event.target.id)
    }
    return (
        <div id={props.id} onClick={clickHandler} className={`${classes.container} ${color}`}>
            {props.children}
        </div>
    )
}