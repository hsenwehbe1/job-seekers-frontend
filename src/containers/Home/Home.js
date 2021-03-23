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
import Select from 'react-select'
import Sort from 'merge-sort'
class Home extends Component {
    state = ({
        page: 1,
        data: [],
        fname: '',
        lname: '',
        didTakeTest: false,
        roles : [],
        spinner: false,
        studentID: '',
        searchData: [],
        interests: []
    })

    componentDidMount(){
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        this.setState({
            ...this.state,
            spinner: true
        })
        // check if user did the test
        axios.get('students/info', config).then((response)=>{
            let fname = response.data.fname
            let lname = response.data.didTakeTest
            let didTakeTest = response.data.didTakeTest
            let studentID = response.data.id
            if(didTakeTest){
                let interests = [...response.data.interests]
                axios.get('students/retreiveallroles', config).then((response)=>{
                    // console.log(response.data)
                    let arr = [...Sort(response.data)]
                    let objArr = []
                    let searchArr = []
                    let interestColors = []
                    let colors = {color1: '#3BC3EB', color2: '#F89691', color3: '#5ef7de'}
                    let i = 0
                    arr.forEach((element, index) => {
                        if(interests.includes(element)){
                            i++
                            searchArr.push({label: element, value: index})
                            interestColors.push({role: element, color: colors[`color${i}`]})
                        }
                        let obj = {
                            label: element,
                            value: index
                        }
                        objArr.push(obj)
                    })
                    this.setState({
                        ...this.state,
                        fname,
                        lname,
                        didTakeTest,
                        studentID,
                        roles: [...objArr],
                        searchData: [...searchArr],
                        spinner: false,
                        interests: [...interestColors]
                    })
                })
            }else{
                axios.get('students/retreiveallroles', config).then((response)=>{
                    let arr = [...Sort(response.data)]
                    let objArr = []
                    arr.forEach((element, index) => {
                        objArr.push({label: element, value: index})
                    })
                    this.setState({
                        ...this.state,
                        fname,
                        lname,
                        didTakeTest,
                        studentID,
                        roles: [...objArr],
                        spinner: false
                    })
                })
            }
            this.setState({
                ...this.state,
                fname: response.data.fname,
                lname: response.data.lname,
                didTakeTest: response.didTakeTest,
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
        
        axios.get('advisors/all', config).then((response)=>{
            this.setState({
                ...this.state,
                data: [...response.data]
            })
        }).catch((err)=>{

        })
    }
    paginationHandler = (element, value)=>{
        this.setState({
            ...this.state,
            page: value
        })
    }
    searchTrigger(event){
        if(event==null){
            this.setState({
                ...this.state,
                searchData: []
            })
        }else{
            this.setState({
                ...this.state,
                searchData: [...event]
            })
        }
    }
    connectHandler = (event)=>{
        
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.post('students/connect', {id: event.target.id}, config).then((response)=>{
            // console.log(response.data)
            window.open(`https://${response.data}`)
            axios.get('advisors/all', config).then((response)=>{
                this.setState({
                    ...this.state,
                    data: [...response.data]
                })
            })
        })
    }
    render() {
        let paginationLength = 0
        let content = ''
        let contentTable = ''
        let headerText = ''
        if(this.state.didTakeTest){
            headerText = 'Your Strengths!'
            content = (
                this.state.interests.map((element, key)=>{
                    return(
                        <BulletPoints text={element.role} color={element.color} key={key}/>
                    )
                })
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
                    let isValid = false
                    this.state.searchData.forEach(elem => {
                        if(element.roles.includes(elem.label)){
                            isValid = true
                        }
                    })
                    if(this.state.searchData.length===0){isValid=true}
                    let index = (this.state.page - 1)*10
                    if(key>=index && key<=index+9 && isValid){
                        let connect = <button onClick={this.connectHandler} id={element._id} className={`btn btn-danger ${classes.red}`}>Connect</button>
                        if(element.students.includes(this.state.studentID)){
                            connect = <span style={{'color':'#007FEB'}}>Connected</span>
                        }
                        let title = <span><img className='rounded-circle' src={`data:image/png;base64,${element.image}`} alt='profile' width='35px' height='35px'/>&nbsp;&nbsp;<span className={classes.advisor} onClick={()=>{window.location.pathname = `advisor/${element._id}`}}>{`${element.fname} ${element.lname}`}</span></span>
                        paginationLength++
                        return (
                            <PathContainer middle={true} title={title} roles={element.roles} connect={connect} bullets={true} bulletData={this.state.interests} key={key}/>
                        )
                    }else if(isValid){
                        paginationLength++
                    }
                })
            )
        }
        const SelectStyle = {
            control: (base, state) => ({
                ...base,
                border: 0,
                boxShadow: 0,
                borderRadius:'6px',
                cursor: 'text',
                height: "50px"
            }),
            multiValue: base => ({
                ...base,
                padding: 0,
                borderRadius: 4,
                border: '1px solid #007feb',
                backgroundColor: 'transparent',
                ':hover': {
                    cursor: 'pointer'
                }
            }),
            valueContainer: (provided, state) => ({
                ...provided,
                overflow: "scroll",
                textOverflow: "ellipsis",
                height: "50px",
                overflowX: 'hidden',
                "::-webkit-scrollbar": {
                    width: "5px"
                  },
                  "::-webkit-scrollbar-track": {
                    background: "#f1f1f1"
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "8px"
                  },
                  "::-webkit-scrollbar-thumb:hover": {
                    background: "#555"
                  }
              })
        }
        return (
            <React.Fragment>
                <div className="mt-4">
                    <HeaderBar/>
                    <div className={`${classes.body_container} px-3 mt-4`}>
                        <Sidebar page='home'/>
                        {this.state.spinner?<Spinner/>:<div className="container">
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
                                            <div className={`${classes.selectSearch}`}>
                                                <Select className={`${classes.search}`} defaultValue={[...this.state.searchData]} isMulti styles={SelectStyle} placeholder="Search" onChange={(e)=>this.searchTrigger(e)} options={this.state.roles} components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className={classes.desktop}>
                                <PathContainer title='Mentors' roles='Job Title' connect='Status' bullets={false}/>
                                {contentTable}
                                <div className='pt-3 pb-3 text-center' style={{'minWidth':'1000px'}}><Pagination onChange={this.paginationHandler} className='d-inline-block' count={Math.ceil(paginationLength/10)} size="small" /></div>
                            </div>
                            <div className={classes.mobile}>
                                {contentTable}
                                <div className='pt-3 pb-3 text-center'><Pagination onChange={this.paginationHandler} className='d-inline-block' count={Math.ceil(paginationLength/10)} size="small" /></div>
                            </div>
                        </div>
                    </div>}
                    </div>
                </div>
                <div className={classes.hidden}>
                    {localStorage.getItem('dialog')?<Dialog isShown={true}/>:<Dialog isShown={false}/>}
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