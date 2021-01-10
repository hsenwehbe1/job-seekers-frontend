import React from 'react'
import classes from './HeaderBar.css'
import Bell from '../../assets/icons/bell.svg'
export default function HeaderBar(props) {
    return (
        <div className={`${classes.header_container} px-3`}>
            <div className={`d-inline-block ${classes.platform_name} ${classes.float_left}`}>LinkedEd</div>
            <div className={`d-inline-block ${classes.float_right} px-2 py-1 bg-white ${classes.item}`}>
                <span className={`${classes.small_text}`}>
                    ME
                </span>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className={`${classes.avatar}`}/>
            </div>
            <div className={`d-inline-block ${classes.float_right} ${classes.spacing} px-2 py-1 bg-white ${classes.item}`}>
                <i className={`united states flag ${classes.FlagIcon}`}></i>
            </div>
            <div className={`d-inline-block ${classes.float_right} ${classes.spacing} px-2 py-1 bg-white ${classes.item} ${classes.relative}`}>
                <img src={Bell} alt="bell" className="img-fluid"/>
                <span className={classes.button_badge}>4</span>
            </div>
        </div>
    )
}
