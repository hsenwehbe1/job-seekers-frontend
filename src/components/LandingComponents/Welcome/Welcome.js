import React from 'react'
import {Link} from 'react-router-dom'
import classes from './Welcome.css'
import WhiteSquare from '../../WhiteSquare/WhiteSquare'
export default function Welcome() {
    return (
        <WhiteSquare>
            <div className="text-center">
                <p className='font-weight-bold'>Welcome to MentorEd</p>
                <Link to='/signup' className={classes.signup}><button className={`btn btn-danger btn-lg ${classes.red} mt-5`}>Sign up</button></Link>
                <div className={`pt-5 ${classes.line_through}`}>
                    <div className={classes.line}></div>
                    <div ><p className={classes.account}>Already have an account?</p></div>
                    <div className={classes.line}></div>
                </div>
                <p className='pt-4'><Link to='/login' className={classes.login}>Login</Link></p>
                <p className={classes.bottom}><Link to='/faq'>FAQs</Link> <Link to='/terms&conditions'>Terms&Conditions</Link></p>
            </div>
        </WhiteSquare>
    )
}
