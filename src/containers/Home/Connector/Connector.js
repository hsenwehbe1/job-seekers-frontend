import React from 'react'
import classes from './Connector.css'
export default function PathContainer(props) {
    let light = ''
    let light1 = ''
    let bullet = ''
    let css = classes.item
    if(props.bullets!==false){
        // fill bullet
        light = classes.light
        light1 = 'font-weight-light'
    }
    if(props.middle){
        css = classes.item1
    }
    let content = ''
    if(props.roles==='Job Title'){
        content = 'Job Title'
    }else{
        content = (props.roles.map((element, index)=>{
            if(index+1===props.roles.length){
                return <span className={classes.role} onClick={()=>{window.location.pathname=`my path/${element}`}} key={`b${index}`}> {element} </span>
            }else{
                return <span className={classes.role} onClick={()=>{window.location.pathname=`my path/${element}`}} key={`b${index}`}> {element}, </span>
            }
        }))
    }
    return (
        <div className={`${classes.container} ${light}`}>
            <div className={`${css} ${light1}`}>{props.title}</div>
            <div className={`${classes.item} ${light1}`}>{content}</div>
            <div className={`${classes.item} ${light1}`}>{props.connect}</div>
            <div className={classes.special}>{bullet}</div>
        </div>
    )
}
