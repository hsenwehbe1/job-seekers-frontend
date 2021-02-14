import React from 'react'
import classes from './Skills.css'
export default function Skills(props) {
    return (
        <div className={`d-inline-block ${classes.skill}`}>
            {props.children}
        </div>
    )
}
