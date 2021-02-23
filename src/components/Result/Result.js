import React from 'react'
import classes from './Result.css'
import ResultIcon from '../../assets/icons/result.svg'
import BulletPoints from '../BulletPoints/BulletPoints'
export default function Result() {
    const clickHandler = ()=>{
        window.location.pathname = 'my path'
    }
    return (
        <div className="row container py-4">
            <div className="col-4">
                <img src={ResultIcon} alt="result" className="img-fluid"/>
            </div>
            <div className="col-8">
                <div className={classes.text_lg}>Your Result</div> <br></br>
                As per your answer we assume that your strengths are the below:
                <div className='pt-3'>
                    <BulletPoints text='Computer Science'/><BulletPoints text='Computer Science'/><BulletPoints text='Computer Science'/>
                    <div className="pt-5 text-center">
                        <div className={classes.text_lg}>Now Discover</div>
                        <button onClick={clickHandler} className={`btn btn-lg btn-danger ${classes.red}`}>Your Path</button>
                    </div>
                </div>
            </div>
        </div>
    )
}