import React from 'react'
import classes from './New.css'
export default function New(props) {
    return (
        <div onClick={()=>{window.open(props.url)}} className={classes.container}>
            <img className="img-fluid" src={props.image} alt="Pic"/>
            <div className={classes.title}>{props.title}</div>
        </div>
    )
}