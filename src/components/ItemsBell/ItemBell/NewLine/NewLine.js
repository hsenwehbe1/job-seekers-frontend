import React from 'react'
import classes from './NewLine.css'

const NewLine = (props) => {
    const text = props.text;
    const newText = text.split('~').map(str => `${str}\n`);
    return (
        <div style={{width:props.percentage}}>
            <p className={`${classes.text_font}`}>{newText}</p>
        </div>
    )
}
export default NewLine;
