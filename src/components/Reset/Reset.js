import React from 'react'
import ResetIcon from '../../assets/icons/Reset.svg'
export default function Reset(props) {
    return (
        <div>
            <img src={ResetIcon} alt="reset"/>
            <p className='font-weight-bold pt-3'>{props.message}</p>
        </div>
    )
}