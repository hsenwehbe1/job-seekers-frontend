import React from 'react'
import classes from './InterestRow.css'
import Tooltip from '@material-ui/core/Tooltip'
const InterestRow = (props) => {
    let more = ''
    let content = ''
    if(props.data.length===0){
        content = 'No mentors yet'
    }else{
        if(props.data.length>3){
            more = <div className='font-weight-light' style={{marginLeft:'5px'}}>& 3 more</div>
        }
        content = (
            props.data.map((element, key)=>{
                if(key<=2){
                    return (
                        <div>
                            <Tooltip style={{'cursor':'pointer'}} onClick={()=>{window.location.pathname = `advisor/${element._id}`}} title={`${element.fname} ${element.lname}`}><img className={`${classes.image}`} src={`data:image/png;base64,${element.image}`} alt="comp" key={`${element}${key}`}/></Tooltip>              
                        </div>
                    )
                }
            })
        )
    }
    return (
        <div className={`d-flex justify-content-between ${classes.main}`}>
            <div className='font-weight-light'>{props.text}</div>
            <div className="d-flex align-items-center">
                {content}
                {more}
            </div>
        </div>
    )
}
export default InterestRow;