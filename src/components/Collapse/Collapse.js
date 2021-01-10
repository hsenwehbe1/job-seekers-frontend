import React from 'react'
import classes from './Collapse.css'
export default function Collapse(props) {
    let id = `#${props.id}`
    return (
        <React.Fragment>
            <div className={`${classes.box_shadow} py-3 px-4`} data-bs-toggle="collapse" href={id} role='button'>
                <span className='text-danger font-weight-bold'>{props.label}</span> &nbsp; &nbsp; <span className="font-weight-bold">{props.question}</span>
            </div>
            <div className="collapse" id={props.id}>
                <div className="card card-body" style={{'border-radius': '10px', 'border':'none'}}>
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    )
}