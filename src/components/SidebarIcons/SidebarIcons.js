import React from 'react'
import classes from './SidebarIcons.css'
import {Link} from 'react-router-dom'
export default function SidebarIcons(props) {
    let cssClass = ''
    if(props.selected){
        cssClass = classes.selected
    }
    const clickHandler = ()=>{
        
    }
    return (
        <div className='text-center pt-5'>
            <Link to={props.text} className={classes.links}>
                <div onClick={clickHandler} className={`${cssClass} ${classes.pointer}`}>
                    {props.icon}<br></br>
                    {props.text}
                </div>
            </Link>
        </div>
    )
}