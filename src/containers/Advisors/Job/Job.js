import React from 'react'
import classes from './Job.css'
function Job(props) {
    return (
        <div className={classes.Media}>
            <i className={`fas fa-suitcase pt-1 ${classes.Media_figure}`}></i>
            <div className={classes.Media_body}>
                <input className={`font-weight-bold ${classes.input1}`} type="text" name="" id=""/><br></br>
                <input className={`font-weight-light ${classes.input1}`} type="text" name="" id=""/><br></br>
            </div>
        </div>
    )
}
export default Job