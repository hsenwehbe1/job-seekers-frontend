import React from 'react'
import classes from './Interest.css'
export default function Interest(props) {
    return (
        <div className={classes.container}>
            <div className='fas fa-circle d-inline' style={{'fontSize':'8px', 'color':`${props.color}`, 'paddingTop':'8px', 'paddingRight':'6px'}}/> <span className={classes.text}>{props.text}</span> <i className='fas fa-times' style={{'fontSize':'13px', 'paddingTop':'6px', 'paddingLeft':'6px', 'cursor':'pointer', color: '#a6aeb4'}}></i>
        </div>
    )
}