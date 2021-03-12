import React from 'react'
import classes from './Interest.css'
export default function Interest(props) {
    return (
        <div className={classes.container}>
            <span className={classes.text}>{props.text}</span> <i onClick={()=>{props.handler(props.text)}} className={`fas fa-times ${classes.times}`}></i>
        </div>
    )
}