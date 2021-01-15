import React from 'react'

export default function Media() {
    return (
        <div className="d-flex">
            <img src='https://chicfetti.com/wp-content/uploads/2015/01/free-svg-file-heart-2.png' alt="John Doe"
                className="flex-shrink-0 border" style={{"width":"50px", "height":"50px", "borderRadius":"10px"}}/>
            <div style={{"paddingLeft":"7px"}}>
                <span className='font-weight-bold' style={{'fontSize':'14px'}}>Your Interests</span><br></br>
                <span style={{'fontSize':'14px'}}>Find your interests</span>
            </div>
        </div>
    )
}
