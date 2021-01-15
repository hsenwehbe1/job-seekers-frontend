import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
export default function IconButtons(props) {
    return (
        <React.Fragment>
            <Tooltip onClick={props.handler} title={props.message}>
                <IconButton aria-label="filter" style={{'fontSize':'12px'}}>
                    {props.children}
                </IconButton>
            </Tooltip>
        </React.Fragment>
    )
}
