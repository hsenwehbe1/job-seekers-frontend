import React from 'react'
import classes from './Media.css'

export default function Media(props) {
    return (
        <div onClick={props.click} className={`d-flex ${classes.main}`}>
            <img src='https://chicfetti.com/wp-content/uploads/2015/01/free-svg-file-heart-2.png' alt="John Doe"
                className="flex-shrink-0 border" style={{"width":"50px", "height":"50px", "borderRadius":"10px"}}/>
            <div style={{"paddingLeft":"7px"}}>
                <span className='font-weight-bold' style={{'fontSize':'14px'}}>{props.title}</span><br></br>
                <span style={{'fontSize':'14px'}}>{props.content}</span>
            </div>
        </div>
    )
}
