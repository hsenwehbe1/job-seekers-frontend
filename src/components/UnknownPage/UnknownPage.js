import React from 'react'
import classes from './UnknownPage.css'
import {Link} from 'react-router-dom'
export default function UnknownPage() {
    return (
        <div className={classes.main}>
            <div className={classes.notfound}>
                <div className={classes.notfound_404}>
                    <h3>Oops! Page not found</h3>
                    <h1><span>4</span><span>0</span><span>4</span></h1>
                </div>
                <h2>we are sorry, but the page you requested was not found</h2>
                <Link to='/'><button className={`btn btn-dark btn-lg ${classes.black}`}>Redirect back home</button></Link>
            </div>
	    </div>
    )
}