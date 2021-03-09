import React from 'react'
import classes from './SidebarIcons.css'
import {withRouter} from 'react-router-dom'
function SidebarIcons(props) {
    let cssClass = ''
    if(props.selected){
        cssClass = classes.selected
    }
    const clickHandler = ()=>{
        window.location.pathname = props.text
    }
    return (
        <div className='text-center pt-5'>
                <div onClick={clickHandler} className={`${cssClass} ${classes.pointer}`}>
                    {props.icon}<br></br>
                    {props.text}
                </div>
        </div>
    )
}
export default withRouter(SidebarIcons)