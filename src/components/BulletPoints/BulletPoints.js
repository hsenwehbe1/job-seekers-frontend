import React from 'react'
import classes from './BulletPoints.css'
function BulletPoints(props) {
    return (
        <span className='d-inline-block'>
            <i className={`fas fa-circle ${classes.circle} ${classes.bullet} `}/>
            <span className={classes.role}>
                {props.text}
            </span>
        </span>
    )
}
export default BulletPoints