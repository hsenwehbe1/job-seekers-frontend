import React, { Component } from 'react'
import classes from './Home.css'
import {connect} from 'react-redux'
import * as alertActions from '../../redux/actions/alert'
import axios from '../../axios'
import Dialog from '../../components/Dialog/Dialog'
import BulletPoints from '../../components/BulletPoints/BulletPoints'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import { withRouter } from 'react-router-dom'
import Alert from '../../components/Alert/Alert'
import PathContainer from './Connector/Connector'
import Pagination from '@material-ui/lab/Pagination'
import Spinner from '../../components/Spinner/Spinner'
class Home extends Component {
    state = ({
        page: 1, // for pagination,
        highlight: 0,
        data: [],
        fname: '',
        lname: '',
        didTakeTest: false,
        searching:false,
        roles : [{label:"None",value:1},{label:"Accounting",value:2},{label:"Administrative",value:3},
        {label:"Arts and Design",value:4},{label:"Business Development",value:5},{label:"back-end developer",value:6}],
        connectors:[],
        filter:[],
        spinner: false,
        studentID: ''
    })

    componentDidMount(){
        // this.setState({
        //     ...this.state,
        //     connectors:this.state.allConnectors
        // })
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        // check if user did the test
        axios.get('/students/info', config).then((response)=>{
            this.setState({
                ...this.state,
                fname: response.data.fname,
                lname: response.data.lname,
                didTakeTest: true,
                studentID: response.data.id
            })
        }).catch((err)=>{
            if(!err.response) { // connection error
                this.props.triggerAlert(true, 'error', 'Connection interrupted: Check your internet connection', 10000)
            }else if(err.response.data.error==='unauthorized'){
                this.props.triggerAlert(true, 'error', "Session expired", 3000)
                this.props.history.push('/')
            }else{
                this.props.triggerAlert(true, 'error', 'Something went wrong', 10000)
            }
        })
        this.setState({
            ...this.state,
            spinner: true
        })
        axios.get('/advisors/all', config).then((response)=>{
            this.setState({
                ...this.state,
                data: [...response.data],
                spinner: false
            })
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
    paginationHandler = (element, value)=>{
        this.setState({
            ...this.state,
            page: value
        })
    }
    searchTrigger(e){
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('token-validity',config).then((response)=>{  

        }).catch((error)=>{
            this.props.history.push('/')
        })
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
    connectHandler = (event)=>{
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.post('students/connect', {id: event.target.id}, config).then((response)=>{
            axios.get('/advisors/all', config).then((response)=>{
                this.setState({
                    ...this.state,
                    data: [...response.data],
                    spinner: false
                })
            })
        })
    }
    render() {
        let content = ''
        let contentTable = ''
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
        if(this.state.data.length!==0){
            contentTable = (
                this.state.data.map((element, key) => {
                    let index = (this.state.page - 1)*10
                    if(key>=index && key<=index+9){
                        let connect = <button onClick={this.connectHandler} id={element._id} className={`btn btn-danger ${classes.red}`}>Connect</button>
                        if(element.students.includes(this.state.studentID)){
                            connect = <span style={{'color':'#007FEB'}}>Connected</span>
                        }
                        let title = <span><img className='rounded-circle' src={`data:image/png;base64,${element.image}`} alt='profile' width='35px' height='35px'/>&nbsp;&nbsp;<span className={classes.advisor} onClick={()=>{window.location.pathname = `advisor/${element._id}`}}>{`${element.fname} ${element.lname}`}</span></span>
                        return (
                            <PathContainer middle={true} title={title} roles={element.roles} connect={connect} bullets={true} key={key}/>
                        )
                    }
                })
            )
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
                                                <input className={`w-100 ${classes.search}`} type="text" placeholder="Search"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <PathContainer title='Mentors' roles='Job Title' connect='Status' bullets={false} highlight={this.state.highlight}/>
                                {this.state.spinner ? <Spinner/> : contentTable}
                                <div className='pt-3 pb-3 text-center' style={{'minWidth':'1000px'}}><Pagination onChange={this.paginationHandler} className='d-inline-block' count={Math.ceil(this.state.data.length/10)} size="small" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.hidden}>
                    <Dialog isShown={false}/>
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