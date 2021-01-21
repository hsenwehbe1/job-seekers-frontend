import React from 'react'
import Media from '../Media/Media'
import classes from './ProfileBar.css'

export default function ProfileBar(props) {
    return (
        <div className={`p-4 ${classes.slidebar} ${props.content}`}>
            <div>
                <i className={`fa fa-times ${classes.cross}`} aria-hidden="true" onClick={props.close}></i>
            </div><br></br><br></br>
            <div className=''>
                <div className="d-flex">
                    <img src={props.imageSrc} alt="John Doe"
                        className="flex-shrink-0" style={{"width":"75px", "height":"75px", "borderRadius":"10px"}}/>
                    <div>
                        <span className={classes.name}>Mohamed Safieddine</span><br></br>
                        <button onClick={props.pushProfile} className={`${classes.profileBtn} btn btn-sm`}>Edit Profile</button>
                    </div>
                </div>
                <hr/>
                <Media click={props.pushInterest} title="My interest" content="Find your Interest"/><br></br>
                <Media click={props.pushConnectors} title="My Connectors" content="Search and visit connectors And mentors profiles"/><br></br>
                <Media click={props.pushSettings} title="Settings" content="Search and visit connectors And mentors profiles"/>
            </div>
            <div className={classes.footer}>
                <button onClick={props.logout} className={`btn btn-outline-danger btn-sm ${classes.logout}`}>Logout</button>
            </div>
        </div>
    )
}
