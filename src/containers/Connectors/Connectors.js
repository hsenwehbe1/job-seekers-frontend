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
    const allBtn = () =>{
        console.log("clicked")
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
                            isMulti
                            name="roles"
                            options={roles}
                            className="basic-multi-select"
                            classNamePrefix="select"
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