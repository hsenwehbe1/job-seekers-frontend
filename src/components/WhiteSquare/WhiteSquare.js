import React from 'react'
import classes from './WhiteSquare.css'
export default function WhiteSquare(props) {
    return (
        <div className={`${classes.box_shadow} p-4`}>
            <div className={classes.title}>{props.title}</div>
            {props.children}
        </div>
    )
}