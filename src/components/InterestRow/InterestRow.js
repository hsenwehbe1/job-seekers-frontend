import React from 'react'
import classes from './InterestRow.css'

const InterestRow = (props) => {
    return (
        <div className={`d-flex justify-content-between ${classes.main}`}>
            <div>{props.text}</div>
            <div className="d-flex align-items-center">
                <div>
                    <img className={`${classes.image}`} src={props.imageOne} alt="image"/>                    
                </div>
                <div>
                    <img className={`${classes.image}`} src={props.imageTwo} alt="image"/>
                </div>
                <div>
                    <img className={`${classes.image}`} src={props.imageThree} alt="image"/>
                </div>
                <div style={{marginLeft:'5px'}}>& 3 more</div>
            </div>
        </div>
    )
}

export default InterestRow;
