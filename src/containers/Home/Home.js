import React, { Component } from 'react'
import classes from './Home.css'
import {connect} from 'react-redux'
import * as alertActions from '../../redux/actions/alert'
import * as authActions from '../../redux/actions/auth'
import axios from '../../axios'
import Dialog from '../../components/Dialog/Dialog'
import Box from '../../components/Box/Box'
import BulletPoints from '../../components/BulletPoints/BulletPoints'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import { withRouter } from 'react-router-dom'
import Alert from '../../components/Alert/Alert'
import HomeConnector from '../../components/HomeConnector/HomeConnector'
import Select from 'react-select'
import image1 from '../../assets/images/imageProfile1.jpg'
import image2 from '../../assets/images/imageProfile2.jpg'
import image3 from '../../assets/images/imageProfile3.jpg'
import image4 from '../../assets/images/imageProfile4.jpg'

class Home extends Component {
    state = ({
        fname: '',
        lname: '',
        didTakeTest: false,
        searching:false,
        roles : [{label:"None",value:1},{label:"Accounting",value:2},{label:"Administrative",value:3},
        {label:"Arts and Design",value:4},{label:"Business Development",value:5},{label:"back-end developer",value:6}],
        connectors:[
        ],
        allConnectors:[
            {imageSrc:image1,name:"hussein wehbe",jobTitle:"Arts and Design",salary:"1200$"},
            {imageSrc:image2,name:"mohamed saf.",jobTitle:"back-end developer",salary:"1200$"},
            {imageSrc:image3,name:"ali jaber",jobTitle:"back-end developer",salary:"1200$"},
            {imageSrc:image4,name:"mahmoud abbas",jobTitle:"Arts and Design",salary:"1200$"},
            {imageSrc:image1,name:"hassan ali",jobTitle:"Business Development",salary:"1200$"},
            {imageSrc:image2,name:"elie samra",jobTitle:"Business Development",salary:"1200$"},
            {imageSrc:image3,name:"jad rydan",jobTitle:"back-end developer",salary:"1200$"},
            {imageSrc:image4,name:"elie maalouf",jobTitle:"Business Development",salary:"1200$"},
            {imageSrc:image1,name:"hussein wehbe",jobTitle:"Arts and Design",salary:"1200$"},
            {imageSrc:image2,name:"hussein wehbe",jobTitle:"back-end developer",salary:"1200$"},
            {imageSrc:image3,name:"hussein wehbe",jobTitle:"back-end developer",salary:"1200$"},
            {imageSrc:image4,name:"hussein wehbe",jobTitle:"Arts and Design",salary:"1200$"},
            {imageSrc:image1,name:"hussein wehbe",jobTitle:"Business Development",salary:"1200$"},
            {imageSrc:image2,name:"hussein wehbe",jobTitle:"Business Development",salary:"1200$"},
            {imageSrc:image3,name:"hussein wehbe",jobTitle:"back-end developer",salary:"1200$"},
            {imageSrc:image4,name:"hussein wehbe",jobTitle:"Business Development",salary:"1200$"}
        ],
        filter:[]
    })

    componentDidMount(){
        this.setState({
            ...this.state,
            connectors:this.state.allConnectors
        })
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        // check if user did the test
        axios.get('/students/info', config).then((response)=>{
            this.setState({
                fname: response.data.fname,
                lname: response.data.lname,
                didTakeTest: response.data.didTakeTest
            })
        }).catch((err)=>{
            if (!err.response) { // connection error
                this.props.triggerAlert(true, 'error', 'Connection interrupted: Check your internet connection', 10000)
            }else if(err.response.data.error==='unauthorized'){
                this.props.history.push('/')
            }
        })
    }
    componentDidUpdate(prevProps,prevState){
       if(prevState.filter !== this.state.filter){
           let filteredConnectors = this.state.allConnectors.filter(this.searchV,this)
           this.setState({
               ...this.state,
               connectors:filteredConnectors
           })
       }else{
        console.log("no")
       } 
    }
    searchTrigger(e){
        if(!e){
            this.setState({
                ...this.state,
                searching:false,
                filter:[]
            })
        }else{
            this.setState({
                ...this.state,
                searching:true,
                filter:e,
            })
        }
    }

    searchV(connector){
        let the_filter = this.state.filter
        for(let i=0;i<the_filter.length;i++){
            if(the_filter[i].label === connector.jobTitle){
                return true
            }
        }
        return false
    }
    render() {
        let content = ''
        let headerText = ''
        if(this.state.didTakeTest){
            headerText = 'Your Strengths!'
            content = (
                <React.Fragment>
                    <BulletPoints text='Computer Science'/>
                    <BulletPoints text='Design'/>
                    <BulletPoints text='Writing'/>
                </React.Fragment>
            )
        }else{
            headerText = `Hey, ${this.state.fname}!`
            content = (
                <React.Fragment>
                    <span className={classes.pb_2}>Start your test to fetch the best roles</span><br></br>
                    <button onClick={()=>this.props.history.push('/test')} className={`btn btn-danger ${classes.red}`}>Get test now</button>
                </React.Fragment>
            )
        }
        const SelectStyle = {
            control: (base, state) => ({
                ...base,
                border: state.isFocused ? 0 : 0,
                boxShadow: state.isFocused ? 0 : 0,
                borderRadius:'6px'
            })
        }
        return (
            <React.Fragment>
                <div className="mt-4">
                    <HeaderBar/>
                    <div className={`${classes.body_container} px-3 mt-4`}>
                        <Sidebar page='home'/>
                        <div className="container">
                            <div className={`${classes.upper_part} ${classes.pad}`}>
                                <div className={`${classes.text_lg}`}>
                                    {headerText}
                                </div>
                                <div className={classes.fool}>
                                    {content}
                                    <br></br>
                                    <div className={`${classes.bar} ${classes.pt_6} w-100`}>
                                        <div className={`w-100 p-1 ${classes.outer}`}>
                                            <div className={`w-100 p-3 bg-white d-flex ${classes.inner}`}>
                                                <i className={`fas fa-search ${classes.searchIcon}`}></i>
                                                {/* <input className={`w-100 ${classes.search}`} type="text" placeholder="Search"/> */}
                                                <div className={`${classes.selectSearch}`}>
                                                    <Select
                                                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                                        isMulti
                                                        styles={SelectStyle}
                                                        placeholder="Search"
                                                        onChange={(e)=>this.searchTrigger(e)}
                                                        options={this.state.roles}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={this.state.searching?{display:'none'}:{display:'block'}} className='px-5 pt-5'>
                                <p className={classes.text}>
                                    Insights in USA, California
                                </p>
                                <div className="row">
                                    <div className="col-sm-12 col-md-3">
                                        <Box number='340K' text='Some text Some text Some text Some text'/>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <Box number='340K' text='Some text Some text Some text Some text'/>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <Box number='340K' text='Some text Some text Some text Some text'/>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <Box number='340K' text='Some text Some text Some text Some text'/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.connectors} style={this.state.searching?{display:'block'}:{display:'none'}} >
                                {
                                    this.state.connectors.map((connector)=>{
                                        return(
                                            <HomeConnector imageSrc={connector.imageSrc} name={connector.name} jobTitle={connector.jobTitle} salary={connector.salary}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.hidden}>
                    <Dialog isShown={true}/>
                </div>
                <Alert/>
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        triggerAlert: (alertOpen, alertType, alertMessage, alertDuration) => dispatch(alertActions.triggerAlert(alertOpen, alertType, alertMessage, alertDuration))
    };
};
export default withRouter(connect(null, mapDispatchToProps)(Home))