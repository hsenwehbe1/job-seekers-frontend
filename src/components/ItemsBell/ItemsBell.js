import React,{useState,useEffect} from 'react'
import classes from './ItemsBell.css'
import ItemBell from '../ItemsBell/ItemBell/ItemBell'
import Bell from '../../assets/icons/bell.svg'

const ItemsBell = (props)=> {
    return (
        <React.Fragment>
            {props.isVisible?
            <div className={`d-flex flex-column justify-content-around ${classes.bell_container} bg-white ${classes.float_right} ${classes.absolute} ${classes.bell_items}`}>
                <ItemBell icon={Bell} text="Trending now: jobs related~to UX/UI design learn more"/>
                <ItemBell icon={Bell} text="New tips: how to collect~the right data"/>
                <ItemBell icon={Bell} text="Trending now: jobs related~to UX/UI design learn more"/>
                <div className={classes.See_all_border}>
                    See all
                </div>
            </div>
            :null
            }
        </React.Fragment>
    )
}
export default ItemsBell;
