import React from 'react'
import classes from './Info.css'

const Info = (props) => {
    return (
        <div className={`d-flex flex-column justify-content-center ${classes.main}`}>
            <div className={`${classes.number}`}>{props.number}</div>
            <div className={`${classes.text}`}>{props.text}</div>
        </div>
    )
}

export default Info;