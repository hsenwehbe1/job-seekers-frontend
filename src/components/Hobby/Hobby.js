import React from 'react'
import classes from './Hobby.css'
export default function Hobby(props) {
    let content = ''
    if(props.cross){
        content = (
            <div className={classes.parent}>
                {props.text} <i className="fa fa-times" aria-hidden="true" onClick={()=>clickHandler(props.index)}></i>
            </div>
        )
    }else{
        content = (
            <div className={classes.parent} onClick={()=>clickHandler(props.index)}>
                {props.text} 
            </div>
        )
    }
    const clickHandler = (index)=>{
        console.log(index)
        props.handler(index)
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    )
}