import React from 'react'
import classes from './Box.css'
export default function WhiteSquare(props) {
    return (
        <div className={`${classes.box_shadow} p-4`}>
            <div className={classes.title}>
                <div className="border-bottom">
                    <span className={classes.number}>{props.number}</span>
                    <span>{props.title}</span>
                </div>
            </div>
            {props.children}
        </div>
    )
}