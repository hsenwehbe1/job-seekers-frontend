import React, { Component } from 'react'
import classes from './Profile.css'
import {connect} from 'react-redux'
import * as alertActions from '../../redux/actions/alert'
import axios from '../../axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Tooltip from '../../components/Tooltip/Tooltip'
import { withRouter } from 'react-router-dom'
import Alert from '../../components/Alert/Alert'
import moment from 'moment'
import Accordion from '../../components/Accordion/Accordion'
class Profile extends Component {
    state = ({
        image : 'https://use.fontawesome.com/releases/v5.0.8/svgs/solid/user.svg',
        timestamp : 0,
        fname : '',
        lname : '',
        fnameEdit: false,
        lnameEdit: false,
        oldPass: '',
        newPass: '',
        confirmPass: ''
    })
    componentDidMount(){
        console.log('here')
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('students/photo', config).then((response)=>{
            if(response.data.error==='notfound'){
                this.setState({
                    ...this.state,
                    timestamp : moment(response.data.timestamp).format('MMMM DD, YYYY'),
                    fname: response.data.fname,
                    lname: response.data.lname
                })
            }else{
                this.setState({
                    ...this.state,
                    image : `data:image/png;base64,${response.data.image}`,
                    timestamp : moment(response.data.timestamp).format('MMMM DD, YYYY'),
                    fname: response.data.fname,
                    lname: response.data.lname
                })
            }
            
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
    }
    imageHandler = (event)=>{
        const formData = new FormData()
        formData.append('upload1', event.target.files[0])
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.post('students/photo', formData, config).then((response)=>{
            this.setState({
                ...this.state,
                image: `data:image/png;base64,${response.data.image}`
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
    }
    editPictureHandler = ()=>{
        this.fileInput.click()
    }
    deletePictureHandler = ()=>{
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.delete('students/photo', config).then((response)=>{
            this.props.triggerAlert(true, 'success', 'Profile picture removed', 5000)
            this.setState({
                ...this.state,
                image: 'https://use.fontawesome.com/releases/v5.0.8/svgs/solid/user.svg'
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
    }
    fNameInputHandler = (event)=>{
        this.setState({
            ...this.state,
            fname: event.target.value,
            fnameEdit: true
        })
    }
    lNameInputHandler = (event)=>{
        this.setState({
            ...this.state,
            lname: event.target.value,
            lnameEdit: true
        })
    }
    fNameSaveHandler = ()=>{
        if(this.state.fname===''){
            this.props.triggerAlert(true, 'error', 'Field cannot be empty', 5000)
        }else{
            let config = {
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.patch('students/fname', {fname:this.state.fname}, config).then((response)=>{
                this.setState({
                    ...this.state,
                    fnameEdit: false
                })
                this.props.triggerAlert(true, 'success', 'Updated', 5000)
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
        }
    }
    lNameSaveHandler = ()=>{
        if(this.state.fname===''){
            this.props.triggerAlert(true, 'error', 'Field cannot be empty', 5000)
        }else{
            let config = {
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.patch('students/lname', {lname:this.state.lname}, config).then((response)=>{
                this.setState({
                    ...this.state,
                    lnameEdit: false
                })
                this.props.triggerAlert(true, 'success', 'Updated', 5000)
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
        }
    }
    oldPassHandler = (event)=>{
        this.setState({
            ...this.state,
            oldPass : event.target.value
        })
    }
    newPassHandler = (event)=>{
        this.setState({
            ...this.state,
            newPass : event.target.value
        })
    }
    confirmPassHandler = (event)=>{
        this.setState({
            ...this.state,
            confirmPass : event.target.value
        })
    }
    changePassHandler = ()=>{
        if(this.state.newPass==='' || this.state.confirmPass==='' || this.state.oldPass===''){
            this.props.triggerAlert(true, 'error', 'Empty field(s)', 5000)
        }else if(this.state.newPass.length<8 || this.state.confirmPass.length<8){
            this.props.triggerAlert(true, 'error', 'New password should contain 8 minimum characters', 5000)
        }else if(this.state.newPass!==this.state.confirmPass){
            this.props.triggerAlert(true, 'error', "New password doesn't match", 5000)
        }else{
            let config = {
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.patch('students/changepassword', {oldPass:this.state.oldPass, newPass:this.state.newPass}, config).then((response)=>{
                if (response.data==='no match') {
                    this.props.triggerAlert(true, 'error', 'Wrong password', 5000)
                } else if(response.data==='match') {
                    this.props.triggerAlert(true, 'success', 'Password updated', 5000)
                }
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
        }
    }
    render() {
        let imageSrc = this.state.image
        let fnameEdit = <i onClick={this.fNameSaveHandler} className={`fas fa-pen ${classes.allowed}`}/>
        let lnameEdit = <i onClick={this.lNameSaveHandler} className={`fas fa-pen ${classes.allowed}`}/>
        if(!this.state.fnameEdit){
            fnameEdit = <i className={`fas fa-pen ${classes.notallowed}`}/>
        }
        if(!this.state.lnameEdit){
            lnameEdit = <i className={`fas fa-pen ${classes.notallowed}`}/>
        }
        return (
            <div className="mt-4">
                <HeaderBar image={imageSrc}/>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <Sidebar page=''/>
                    <div className="container">
                        <div className={`${classes.upper_part} px-0`}>
                            <div className={`${classes.text_lg}`}>
                                My Profile
                            </div>
                            <div className="">
                                <div className='row pt-3'>
                                    <div className="col-12 col-md-3">
                                        <figure className={classes.center}>
                                            <img src={imageSrc} alt=""
                                            className={`flex-shrink-0 ${classes.WhiteBorder} ${classes.image}`}/>
                                            <figcaption className={`${classes.caption}`}>
                                                <Tooltip handler={this.deletePictureHandler} message='Remove picture'>
                                                    <i className={`fas fa-trash`}></i>
                                                </Tooltip>
                                                <Tooltip handler={this.editPictureHandler} message='Edit picture'>
                                                    <i className="fas fa-pen"/>
                                                    <input type="file" name="upload1" id="upload1" onChange={this.imageHandler} style={{display:'none'}}ref={fileInput=>this.fileInput=fileInput}/>
                                                </Tooltip>
                                                <br></br>
                                                Joined {this.state.timestamp}
                                            </figcaption>
                                        </figure>
                                    </div>
                                    
                                    <div className='col-12 col-md-9'>
                                        <div className='row'>
                                            <div className="col-sm-12 col-md-6 mb-3">
                                                <div className="border-bottom d-inline-block w-100">
                                                    <div className='font-weight-bold'>First Name</div>
                                                    <input type="text" className={`form-control ${classes.border} ${classes.input}`} defaultValue={this.state.fname} onChange={this.fNameInputHandler}/>
                                                    {fnameEdit}
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <div className="border-bottom d-inline-block w-100">
                                                    <div className='font-weight-bold'>Last Name</div>
                                                    <input type="text" className={`form-control ${classes.border} ${classes.input}`}  defaultValue={this.state.lname} onChange={this.lNameInputHandler}/>
                                                    {lnameEdit}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <Accordion>
                                                    <div className="row ">
                                                        <div className="col-sm-12 col-md-4">
                                                            <div className="border-bottom">
                                                                <input onChange={this.oldPassHandler} type="password" placeholder='Current password' className={`form-control ${classes.border} ${classes.input}`}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12 col-md-4 mt-3 mt-md-0">
                                                            <div className="border-bottom">
                                                                <input onChange={this.newPassHandler} type="password" placeholder='New password' className={`form-control ${classes.border} ${classes.input}`}/>
                                                            </div>
                                                        </div> 
                                                        <div className="col-sm-12 col-md-4 mt-3 mt-md-0">
                                                            <div className="border-bottom">
                                                                <input onChange={this.confirmPassHandler} type="password" placeholder='Confirm new password' className={`form-control ${classes.border} ${classes.input}`}/>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                    <button onClick={this.changePassHandler} className="mt-4 btn btn-dark btn-sm w-100">Save</button>
                                                </Accordion>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Alert/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
        triggerAlert: (alertOpen, alertType, alertMessage, alertDuration) => dispatch(alertActions.triggerAlert(alertOpen, alertType, alertMessage, alertDuration))
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))