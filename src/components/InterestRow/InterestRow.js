import React from 'react'
import classes from './InterestRow.css'
import Tooltip from '@material-ui/core/Tooltip'
const InterestRow = (props) => {
    const openModal = ()=>{
        props.modalHandler(props.data)
    }
    let more = ''
    let content = ''
    let count = 0
    if(props.data.length===0){
        content = 'No mentors yet'
    }else{
        content = (
            props.data.map((element, key)=>{
                if(key<=2){
                    return (
                        <div key={`${element}${key}`}>
                            <Tooltip style={{'cursor':'pointer'}} onClick={()=>{window.location.pathname = `advisor/${element._id}`}} title={`${element.fname} ${element.lname}`}><img className={`${classes.image}`} src={`data:image/png;base64,${element.image}`} alt="comp"/></Tooltip>              
                        </div>
                    )
                }else{
                    count++
                }
            })
        )
    }
    if(count!==0){
        more = <div className={classes.more} onClick={openModal} style={{marginLeft:'5px'}}>& {count} more</div>
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