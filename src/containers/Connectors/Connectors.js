import React,{useState,useEffect} from 'react'
import imageTest from '../../assets/images/0.jpg'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Connector from '../../components/ItemConnector/Connector/Connector'
import Info from '../../components/ItemConnector/Info/Info'
import axios from '../../axios' 
import classes from './Connectors.css'
import { useHistory } from "react-router-dom";
import Select from 'react-select';

const Connectors = () => {
    var first = 0
    const [send, setSend] = useState(false)
    const [connectors, setConnectors] = useState([])
    const [roles,setRoles] = useState([])
    const[filter,setFilter] = useState([])
    const[allConnectors,setAllConnectors] = useState([])
    const history = useHistory()
    useEffect(()=>{
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('/students/connectors',config).then((response)=>{
            setConnectors(response.data.connectors)
            setAllConnectors(response.data.connectors)
        }).catch((error)=>{
            history.push('/')
        }) 
        axios.get('/roles').then((response)=>{
            const data = response.data.roles
            console.log(data)
            setRoles(data)
        }).catch((error)=>{
            console.log(error)
        }) 
    },[send])
    
    useEffect(()=>{
        let filteredConnectors = []
        if(filter){
            filteredConnectors = allConnectors.filter(searchV)
        }else{
            filteredConnectors = allConnectors
        }
        setConnectors(filteredConnectors)
    },[filter])
    const selectChange = (e) =>{
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('token-validity',config).then((response)=>{  
            setFilter(e)
        }).catch((error)=>{
            history.push('/')
        })
    }

    const searchV = (connector) =>{
        for(let i=0;i<filter.length;i++){
            if(filter[i].label === connector.career){
                return true
            }
        }
        return false
    }
    
    const selectStyle = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px solid #D0D0D0',
            borderBottomWidth:'70%',
            backgroundColor: 'white',
            '&:hover': {
                backgroundColor: '#007FEC',
                borderRadius: '6px',
                color:'white',
                border:'#007FEC',
                boxShadow: '0 0 10px #007FEC'
            }
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? 0 : 0,
            boxShadow: state.isFocused ? 0 : 0,
            borderRadius:'6px',
            '&:hover': {
                backgroundColor: 'white',
                borderRadius: '6px',
                color:'white',
                border:'#007FEB',
                boxShadow: '0px 0px 5px #007FEB'
            }
        })
    }
    return (
        <div className="mt-4">
            <HeaderBar/>
            <div className={`${classes.body_container} px-3 mt-4`}>
                <Sidebar/>
                <div className={`d-flex flex-column ${classes.main}`}>
                    <div className={classes.title}>
                        My Connectors
                    </div>
                    <div className={`${classes.info_items}`}>
                        <Info number="3914" text="Connections"/>
                        <Info number="3914" text="Connections"/>
                        <Info number="3914" text="Connections"/>
                        <Info number="3914" text="Connections"/>
                        <Info number="3914" text="Connections"/>
                    </div>
                    <div className={`${classes.select}`}>
                        <Select
                            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                            isMulti
                            name="roles"
                            options={roles}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="title"
                            styles={selectStyle}
                            onChange={(e)=>selectChange(e)}
                        />
                    </div>
                    <div className={`${classes.connector_items}`}>
                        {
                            connectors.map((connector)=>{
                                if(first%6 === 0){
                                    first = first + 1
                                    return(
                                        <Connector margin="first" profile={connector.imageSrc} name={connector.name} career={connector.career}/>
                                    )
                                }
                                first = first + 1
                                return(
                                    <Connector margin="medium" profile={connector.imageSrc} name={connector.name} career={connector.career}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Connectors ; 