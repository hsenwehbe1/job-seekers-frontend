import React,{useState,useEffect} from 'react'
import imageTest from '../../assets/images/0.jpg'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Connector from '../../components/ItemConnector/Connector/Connector'
import Info from '../../components/ItemConnector/Info/Info'
import axios from '../../axios' 
import classes from './Connectors.css'

const Connectors = () => {
    var first = 0
    const [send, setSend] = useState(false)
    const [connectors, setConnectors] = useState([
        {
            imageSrc: imageTest,
            name:"hussein wehbe",
            career:"web developer"
        },{
            imageSrc: imageTest,
            name:"mohamed saffiyedeen",
            career:"front-end developer"
        },{
            imageSrc: imageTest,
            name:"hadi mheidly",
            career:"back-end developer"
        },{
            imageSrc: imageTest,
            name:"omar malka",
            career:"security consultant"
        },{
            imageSrc: imageTest,
            name:"Ali Chalhoub",
            career:"CyberSecurity"
        },{
            imageSrc: imageTest,
            name:"Hussein Jaber",
            career:"Data Analyst"
        },{
            imageSrc: imageTest,
            name:"hussein wehbe",
            career:"web developer"
        },{
            imageSrc: imageTest,
            name:"mohamed saffiyedeen",
            career:"front-end developer"
        },{
            imageSrc: imageTest,
            name:"hadi mheidly",
            career:"back-end developer"
        },{
            imageSrc: imageTest,
            name:"omar malka",
            career:"security consultant"
        },{
            imageSrc: imageTest,
            name:"Ali Chalhoub",
            career:"CyberSecurity"
        },{
            imageSrc: imageTest,
            name:"Hussein Jaber",
            career:"Data Analyst"
        },{
            imageSrc: imageTest,
            name:"hussein wehbe",
            career:"web developer"
        },{
            imageSrc: imageTest,
            name:"mohamed saffiyedeen",
            career:"front-end developer"
        },{
            imageSrc: imageTest,
            name:"hadi mheidly",
            career:"back-end developer"
        },{
            imageSrc: imageTest,
            name:"omar malka",
            career:"security consultant"
        },{
            imageSrc: imageTest,
            name:"Ali Chalhoub",
            career:"CyberSecurity"
        },{
            imageSrc: imageTest,
            name:"Hussein Jaber",
            career:"Data Analyst"
        },{
            imageSrc: imageTest,
            name:"hussein wehbe",
            career:"web developer"
        },{
            imageSrc: imageTest,
            name:"mohamed saffiyedeen",
            career:"front-end developer"
        },{
            imageSrc: imageTest,
            name:"hadi mheidly",
            career:"back-end developer"
        },{
            imageSrc: imageTest,
            name:"omar malka",
            career:"security consultant"
        },{
            imageSrc: imageTest,
            name:"Ali Chalhoub",
            career:"CyberSecurity"
        },{
            imageSrc: imageTest,
            name:"Hussein Jaber",
            career:"Data Analyst"
        },{
            imageSrc: imageTest,
            name:"hussein wehbe",
            career:"web developer"
        },{
            imageSrc: imageTest,
            name:"mohamed saffiyedeen",
            career:"front-end developer"
        },{
            imageSrc: imageTest,
            name:"hadi mheidly",
            career:"back-end developer"
        },{
            imageSrc: imageTest,
            name:"omar malka",
            career:"security consultant"
        },{
            imageSrc: imageTest,
            name:"Ali Chalhoub",
            career:"CyberSecurity"
        }
    ])

    useEffect(()=>{
        axios.get('/roles').then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.log(error.response.data.error)
        }) 
    },[send])
    
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
                    <div className={classes.select}>
                        <select>
                            <option value="All">All</option>
                        </select>
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