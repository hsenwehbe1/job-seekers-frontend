import React from 'react'
import Image from './component.svg'
export default function Goodbye() {
    return (
        <div className='container text-center'>
            <div className="mt-3"><h4 className="display-5">Thank you for signing up</h4></div><br></br>
            <div className="mt-4">
                <img className="img-fluid" src={Image} alt="Component"/>
            </div>
        </div>
    )
}