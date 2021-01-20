import React from 'react'
import classes from './ItemBell.css'
import NewLine from '../ItemBell/NewLine/NewLine'
const ItemBell = (props)=> {
    return (
        <div className={` d-flex justify-content-around ${classes.item_container}`}>
            <div className={`${classes.image_width}`}>
                <img  src={props.icon} alt="icon"/>
            </div>
            <NewLine text={props.text} percentage="135px"/>
        </div>
    )
}

export default ItemBell;