import React from 'react'
import classes from './Tip.css'
export default function Tip(props) {
    return (
        <div className={classes.card}>
            <div className={classes.number}>
                {props.number}
            </div>
            <div className={classes.text}>
                {props.children}
            </div>
        </div>
    )
}
