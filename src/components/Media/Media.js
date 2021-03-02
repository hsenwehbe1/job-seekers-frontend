import React from 'react'
import classes from './Media.css'

export default function Media(props) {
    let icon = ''
    if(props.title==='My Interest'){
        icon = <i className={`fas fa-heart ${classes.icons}`}></i>
    }else{
        icon = <i className={`fab fa-connectdevelop ${classes.icons}`}></i>
    }
    return (
        <div onClick={props.click} className={`d-flex ${classes.main}`}>
            <div className='pt-2'>
                {icon}
            </div>
            <div style={{"paddingLeft":"7px"}}>
                <span className='font-weight-bold' style={{'fontSize':'14px'}}>{props.title}</span><br></br>
                <span style={{'fontSize':'14px'}}>{props.content}</span>
            </div>
        </div>
    )
}
