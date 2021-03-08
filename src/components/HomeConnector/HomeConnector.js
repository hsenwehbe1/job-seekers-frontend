import React from 'react'
import classes from './HomeConnector.css'
const HomeConnector = (props) => {
    return (
        <div className={classes.main}>
            <div className={classes.first}>
                <div>
                    <img className={classes.image} src={props.imageSrc} alt="Alternate"/>
                </div>
                <div className={classes.text}>
                   {props.name} 
                </div>
            </div>
            <div style={{width:'20%'}}>
                {props.jobTitle}
            </div>
            <div style={{width:'20%'}} >
                {props.salary}
            </div>
            <div style={{width:'15%'}}>
                <button className={`btn btn-danger ${classes.btn}`}>Connect</button>
            </div>
        </div>
    )
}

export default HomeConnector