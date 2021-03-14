import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import * as alertActions from '../../redux/actions/alert'
import Alert from '../../components/Alert/Alert'
import classes from './Interests.css'
import axios from '../../axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import WhiteSqure from '../../components/WhiteSquare/WhiteSquare'
import InterestRow from '../../components/InterestRow/InterestRow'
import Select from 'react-select'
import Interest from './Interest/Interest'
import Sort from 'merge-sort'
import Modal from './Modal/Modal'
import Spinner from '../../components/Spinner/Spinner'
class Interesets extends Component {
    state = {
        roles: [],
        interests: [],
        advisors: [],
        modal: false,
        modalData: [],
        spinner: false
    }
    componentDidMount(){
        this.setState({
            ...this.state,
            spinner: true
        })
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('students/info', config).then((response)=>{
            this.setState({
                ...this.state,
                interests: [...response.data.interests]
            })
        }).catch((error)=>{

        })
        axios.get('students/retreiveallroles', config).then((response)=>{
            let arr = [...Sort(response.data)]
            let objArr = []
            arr.forEach((element, index) => {
                objArr.push({label: element, value: index})
            })
            this.setState({
                ...this.state,
                roles: [...objArr]
            })
        }).catch((error)=>{

        })
        axios.get('advisors/all', config).then((response)=>{
            this.setState({
                ...this.state,
                advisors: [...response.data],
                spinner: false
            })
        }).catch((error)=>{

        })
    }
    selectHandler = (e)=>{
        if(this.state.interests.length===3){
            this.props.triggerAlert(true, 'error', 'You can have a maximum of 3 interests', 5000)
        }else{
            let config = {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.post('students/addinterest', {interest: e.label}, config).then((response)=>{
                this.setState({
                    ...this.state,
                    interests: [...response.data]
                })
            }).catch((error)=>{
    
            })
        }
    }
    openModal = (data)=>{
        this.setState({
            ...this.state,
            modal: true,
            modalData: [...data]
        })
    }
    closeModal = ()=>{
        this.setState({
            ...this.state,
            modal: false
        })
    }
    deleteInterest = (data)=>{
        if(this.state.interests.length===1){
            this.props.triggerAlert(true, 'error', 'You must have at least 1 interest', 5000)
        }else{
            let config = {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.post('students/removeinterest', {interest: data}, config).then((response)=>{
                this.setState({
                    ...this.state,
                    interests: [...response.data]
                })
            }).catch((error)=>{
    
            })
        }
    }
    render() {
        const SelectStyle = {
            control: (base, state) => ({
                ...base,
                border: 0,
                boxShadow: 0,
                borderRadius:'6px',
                cursor: 'text'
            })
        }
        let content = ''
        content = (
            this.state.interests.map((element, index)=>{
                let data = []
                this.state.advisors.forEach(elem => {
                    if(elem.roles.includes(element)){
                        data.push(elem)
                    }
                })
                return (
                    <InterestRow data={data} text={element} modalHandler={this.openModal} key={`${element}${index}`}/>
                )
            })
        )
        return (
            <div className="mt-4">
                <HeaderBar/>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <Sidebar/>
                    <div className="container">
                        <div className={`${classes.upper_part} px-0`}>
                            <div className={`${classes.text_lg}`}>
                                Your Interests
                            </div>
                            {this.state.spinner?<Spinner/>:<div className="row">
                            <div className="col-12 col-sm-12 col-md-5">
                                <p className='mt-3 font-weight-light'>Add new interests<strong className='font-weight-bold'> (up to 3)</strong></p>
                                <div className={classes.select_container}>
                                    <Select className={`${classes.search}`} placeholder="Add interests" styles={SelectStyle} value='' onChange={this.selectHandler} options={this.state.roles}/>
                                </div>
                                <div className='mt-3'>
                                    {this.state.interests.map((element, index)=>{
                                        return (
                                            <Interest text={element} key={index} handler={this.deleteInterest}/>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={`col-12 col-sm-12 col-md-7 ${classes.cont}`}>
                                <WhiteSqure title="Top 3 careers recommended for you" setClass={false}>
                                    {content}
                                </WhiteSqure>
                                {this.state.modal?<Modal isShown={true} data={this.state.modalData} handler={this.closeModal}/>:null}
                                <Alert/>
                            </div>
                        </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        triggerAlert: (alertOpen, alertType, alertMessage, alertDuration) => dispatch(alertActions.triggerAlert(alertOpen, alertType, alertMessage, alertDuration))
    };
};
export default withRouter(connect(null, mapDispatchToProps)(Interesets))