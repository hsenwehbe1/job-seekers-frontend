import React from 'react'
import classes from './PathContainer.css'
export default function PathContainer(props) {
    let light = ''
    let light1 = ''
    let bullet = ''
    let sort = ''
    let sort1 = ''
    let colors = {color1: '#3BC3EB', color2: '#F89691', color3: '#5ef7de'}
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
        let arr = [...props.interestData.sort()]
        let tempo = ''
        arr.forEach((element, index) => {
            if(element===props.title){
                tempo = colors[`color${index+1}`]
                bullet = <i className='fas fa-circle' style={{'color':`${tempo}`, 'fontSize':'12px', 'marginRight': '4px'}} key={`okay${tempo}`}/>
            }
        })
        light = classes.light
        light1 = 'font-weight-light'
        
    }
    return (
        <React.Fragment>
            <div onClick={()=>{props.handler(props.title)}} className={`${classes.container} ${light}`}>
                <div className={`${classes.item} ${light1}`}>{props.title}</div>
                <div className={`${classes.item} ${light1}`}>{props.roles} {sort}</div>
                <div className={`${classes.item} ${light1}`}>{props.salary} {sort1}</div>
                <div className={`${classes.item} ${light1}`}>{props.advisors}</div>
                <div className={classes.special}>{bullet}</div>
            </div>
            <div className={`${classes.container1}`}>
                <p style={{'textAlign':'right'}}>{bullet}</p>
                <p><strong>Job Title: </strong><span className='font-weight-light'>{props.title}</span></p>
                <p><strong>Open Entry Level Roles: </strong><span className='font-weight-light'>{props.roles}</span></p>
                <p><strong>Average Starting Salary: </strong><span className='font-weight-light'>{props.salary}</span></p>
                <p className='font-weight-light text-center' style={{'cursor':'pointer'}}>{props.advisors}</p>
            </div>
        </React.Fragment>
    )
}
