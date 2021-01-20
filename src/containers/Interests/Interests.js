import React,{useState,useEffect} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import classes from './Interests.css'
import WhiteSqure from '../../components/WhiteSquare/WhiteSquare'
import InterestRow from '../../components/InterestRow/InterestRow'
import imageTest from '../../assets/images/0.jpg'
import $ from 'jquery'
import axios from '../../axios'
import { useHistory } from "react-router-dom";
import Alert from '../../components/Alert/Alert'

const Interests = () => {
    const [interestArray, setInterestArray] = useState([])
    const [defaultArray,setDefaultArray] = useState([])
    const [send, setSend] = useState(false)
    const history= useHistory()

    useEffect(()=>{
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('/students/interests',config).then((response)=>{
            setInterestArray(response.data.interests)
            setDefaultArray(response.data.default_values)
        }).catch((error)=>{
            history.push('/')
        }) 
    },[send])

    const btnClick = ()=>{
        const val = $(`.${classes.input}`).val()
        let newArray = [...interestArray]
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.post('/students/add-interest',{
            interest:val
        },config).then((response)=>{
            newArray.push(val)
            setInterestArray(newArray)
        }).catch((error)=>{
            if(error.response.data.error === "unauthorized"){
                history.push('/')
            }
        }) 
        
    }
    return (
        <div className="mt-4">
            <HeaderBar/>
            <div className={`${classes.body_container} px-3 mt-4`}>
                <Sidebar/>
                <div className={`d-lg-flex flex-column ${classes.my_interests}`}>
                    <div className={`${classes.first_interests}`}>
                        My Interests
                    </div>
                    <div>
                        Add new interests<strong> (up to 8)</strong>
                    </div>
                    <div className={`${classes.input_div}`}>
                        <select className={`${classes.input}`} >
                            {defaultArray.map((interest)=>{
                                return(
                                    <option value={interest}>{interest}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <button onClick={btnClick} className={`${classes.btn}`}>add</button>
                    </div>
                    <div>
                        <ul className={`${classes.ul_style}`}>
                            {interestArray.map((element)=>{
                                return (
                                    <li>
                                        <div className={`d-flex  justify-content-around ${classes.li_style}`}>
                                            <div><span className={`${classes.dot}`}></span></div>
                                            <div style={{marginLeft:'10px'}}>{element}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className={`d-lg-flex flex-column ${classes.careers_recommended}`}>
                    <WhiteSqure title="Best 5 careers recommended for you" setClass={false}>
                        <InterestRow imageOne={imageTest} imageTwo={imageTest} imageThree={imageTest} text="UX/UI designer"/> 
                        <InterestRow imageOne={imageTest} imageTwo={imageTest} imageThree={imageTest} text="UX/UI developer"/> 
                        <InterestRow imageOne={imageTest} imageTwo={imageTest} imageThree={imageTest} text="Web designer"/> 
                        <InterestRow imageOne={imageTest} imageTwo={imageTest} imageThree={imageTest} text="Web developer"/> 
                        <InterestRow imageOne={imageTest} imageTwo={imageTest} imageThree={imageTest} text="UX consultant"/> 
                    </WhiteSqure>
                    <div style={{marginTop:'21px'}}>

                    </div>
                    <WhiteSqure title="top 10 skills must have !" setClass={false}>
                        <ul className={`${classes.second_ul}`}>
                            <li>Html</li>
                            <li>Jquery</li>
                            <li>Css</li>
                            <li>Nodejs</li>
                            <li>React</li>
                        </ul>
                    </WhiteSqure>
                </div>
            </div>
        </div>
    )
}
export default Interests;
