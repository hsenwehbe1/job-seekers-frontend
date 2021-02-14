import React from 'react'
import classes from './PathContainer.css'
export default function PathContainer(props) {
    let light = ''
    let light1 = ''
    let bullet = ''
    let sort = ''
    let sort1 = ''
    if(props.sort){
        let color1 = '#4F4F4F'
        let color2 = '#4F4F4F'
        if(props.highlight===1){
            color1 = '#007FEB'
        }else if(props.highlight===2){
            color2 = '#007FEB'
        }
        sort = <i onClick={()=>{props.rolesSortHandler()}} className="fa fa-sort" style={{'cursor':'pointer', 'color':`${color1}`}}></i>
        sort1 = <i onClick={()=>{props.salarySortHandler()}} className="fa fa-sort" style={{'cursor':'pointer', 'color':`${color2}`}}></i>
    }
    if(props.bullets!==false){
        // fill bullet
        light = classes.light
        light1 = 'font-weight-light'
    }
    return (
        <div onClick={()=>{props.handler(props.title)}} className={`${classes.container} ${light}`}>
            <div className={`${classes.item} ${light1}`}>{props.title}</div>
            <div className={`${classes.item} ${light1}`}>{props.roles} {sort}</div>
            <div className={`${classes.item} ${light1}`}>{props.salary} {sort1}</div>
            <div className={`${classes.item} ${light1}`}>{props.advisors}</div>
            <div className={classes.special}>{bullet}</div>
        </div>
    )
}
