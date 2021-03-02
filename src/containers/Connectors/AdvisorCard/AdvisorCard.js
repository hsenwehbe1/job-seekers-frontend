import React from 'react'
import classes from './AdvisorCard.css'
export default function AdvisorCard(props) {
    let roles = ''
    roles = props.role.map((element, index) => {
        console.log(element)
        return (
            <span className={classes.name} onClick={()=>{window.location.pathname = `my path/${element}`}} key={`r${index}`}>{element} &nbsp;</span>
        )
    })
    return (
        <div className={classes.container}>
            <div style={{'textAlign':'right'}}><i className='fab fa-linkedin-in' style={{'color':'#007FEB'}}></i></div>
            <div className='text-center'>{props.image}</div>
            <div onClick={()=>{window.location.pathname = `advisor/${props.advisorid}`}} className={`text-center pt-2 ${classes.name}`} style={{'fontSize':'14px'}}>{props.name}</div>
            <div className={`text-center`} style={{'fontSize':'14px'}}>{roles}</div>
        </div>
    )
}