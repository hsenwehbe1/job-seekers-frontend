import React from 'react'
import classes from './Accordion.css'
export default function Accordion(props) {
    return (
        <div className={`accordion ${classes.accordion}`} id="accordionExample">
            <div className="accordion-item">
                <h2 className={`accordion-header ${classes.pad}`} id="headingOne">
                    <button className={`accordion-button ${classes.accordion} ${classes.btn}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <strong>Change Password</strong>
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style={{border:'none'}}>
                    <div className="accordion-body border mt-2 text-center" style={{borderRadius: '5px'}}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}
