import React from 'react'
import classes from './Box.css'
export default function Box(props) {
    return (
        <div className={`bg-white p-3 ${classes.card}`}>
            <span className={classes.text_blue}>
                {props.number}
            </span>
            <br></br>
            <span>
                {props.text}
            </span>
        </div>
    )
}
