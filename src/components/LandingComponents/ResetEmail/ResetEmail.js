import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from '../../../axios'
import * as alertActions from '../../../redux/actions/alert'
import classes from './ResetEmail.css'
import WhiteSquare from '../../WhiteSquare/WhiteSquare'
import Alert from '../../Alert/Alert';
class ResetEmail extends Component {
    state = ({
        email: '',
        pass1: '',
        pass2: ''
    })

    componentDidMount = ()=>{
        let config = {
            headers:{
                'Authorization' : `Bearer ${this.props.match.params.token}`
            }
        }
        axios.get('token-validity', config).then((response)=>{
            this.setState({
                ...this.state,
                email: response.data.email
            })
        }).catch((err)=>{
            if (!err.response) { // connection error
                this.props.triggerAlert(true, 'error', 'Connection interrupted: Check your internet connection', 10000)
            }else{
                this.props.triggerAlert(true, 'error', "Reset link expired", 3000)
                this.props.history.push('/')
            }
        })
    }

    pass1Handler = (event)=>{
        this.setState({
            ...this.state,
            pass1: event.target.value
        })
    }

    pass2Handler = (event)=>{
        this.setState({
            ...this.state,
            pass2: event.target.value
        })
    }

    submitHandler = ()=>{
        if(this.state.pass1!==this.state.pass2){
            this.props.triggerAlert(true, 'error', "Passwords don't match", 3000)
        }else if(this.state.pass1===''){
            this.props.triggerAlert(true, 'error', "Invalid input", 3000)
        }else if(this.state.pass1.length<8){
            this.props.triggerAlert(true, 'error', "Password too short", 3000)
        }else{
            axios.patch('students/resetpass', {email: this.state.email, password: this.state.pass1}).then((response)=>{
                this.props.triggerAlert(true, 'success', "Password changed successfully", 3000)
                this.props.history.push('/login')
            }).catch((err)=>{
                if (!err.response) { // connection error
                    this.props.triggerAlert(true, 'error', 'Connection interrupted: Check your internet connection', 10000)
                }else{
                    this.props.triggerAlert(true, 'error', "Something went wrong", 3000)
                }
            })
        }
    }
    render() {
        return (
            <WhiteSquare>
                <div className="text-center">
                    <div className='d-inline'>
                        <span><i className={`fas fa-arrow-left ${classes.float_left}`} style={{fontSize: '24px'}}></i></span>
                        <span className="font-weight-bold" style={{fontSize:'18px', paddingRight:'20px'}}>Reset Password</span>
                    </div>
                    <div className='mt-2 p-3'>
                        <div className={`${classes.left}`}>
                            <div className={classes.labels}>New Password</div>
                            <div className="input-group mb-3">
                                <input type="password" onChange={this.pass1Handler} className={`form-control ${classes.input}`}/>
                            </div>
                            <div className={classes.labels}>Confirm New Password</div>
                            <div className="input-group">
                                <input type="password" onChange={this.pass2Handler} className={`form-control ${classes.input}`}/>
                            </div>
                            <small className="text-muted" id="fileHelp" style={{fontSize:'11px'}}>Min. 8 characters</small>
                        </div>
                        <div className='mt-3 mb-4'>
                            <button onClick={this.submitHandler} className={`btn btn-danger ${classes.red} mt-3`}>Confirm</button>
                        </div>
                    </div>
                </div>
                <Alert/>
            </WhiteSquare>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        triggerAlert: (alertOpen, alertType, alertMessage, alertDuration) => dispatch(alertActions.triggerAlert(alertOpen, alertType, alertMessage, alertDuration))
    };
};
export default withRouter(connect(null, mapDispatchToProps)(ResetEmail))