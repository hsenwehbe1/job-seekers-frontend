import React,{useState,useEffect} from 'react'
import linkedInConnector from '../../../assets/icons/linkedInConnector.svg'
import classes from './Connector.css'

const ItemConnector = (props) => {
    const [name, setName] = useState("")
    useEffect(() => {
        if(props.name.length>12){
            let str =  props.name.split(" ")
            let firstName = str[0]
            let secondName = str[1].substr(0,3)
            setName(`${firstName} ${secondName}.`)
        }else{
            setName(props.name)
        }
    }, [props])
    return (
        //${props.margin === "first"?classes.first:props.margin === "last"?classes.last:classes.mid}
        <div className={`${props.margin === "first"?classes.first:classes.mid}`}>
            <div className={`${classes.icon}`}>
                <img src={linkedInConnector} alt="img"/>
            </div>
            <div className={`${classes.profile}`}>
                <img className={`${classes.image}`} src={props.profile} alt="img"/>
            </div>
            <div className={`${classes.name}`}>
                {name}
            </div>
            <div className={`${classes.career}`}>
                {props.career}
            </div>
        </div>
    )
}
export default ItemConnector;