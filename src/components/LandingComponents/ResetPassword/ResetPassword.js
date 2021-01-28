import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import classes from './ResetPassword.css'
import {connect} from 'react-redux'
import axios from '../../../axios'
import Alert from '../../Alert/Alert'
import * as alertActions from '../../../redux/actions/alert'
import Validate from 'email-validator'
import WhiteSquare from '../../WhiteSquare/WhiteSquare'
class ResetPassword extends Component {
    state = ({
        email : ''
    })

    emailHandler = (event)=>{
        this.setState({
            email: event.target.value
        })
    }

    submitHandler = ()=>{
        if(Validate.validate(this.state.email)){
            axios.post('students/resetpass', {email: this.state.email}).then((response)=>{
                this.props.triggerAlert(true, 'success', 'An email has been sent with the reset link', 10000)
            }).catch((err)=>{
                if (!err.response) { // connection error
                    this.props.triggerAlert(true, 'error', 'Connection interrupted: Check your internet connection', 10000)
                }else{
                    this.props.triggerAlert(true, 'error', "Something went wrong", 3000)
                }
            })
        }else{
            this.props.triggerAlert(true, 'error', 'Invalid input', 3000)
        }
    }
    render() {
        return (
            <WhiteSquare>
                <div className="text-center">
                    <div className='d-inline'>
                        <span><i onClick={()=>this.props.history.push('/login')} className={`fas fa-arrow-left ${classes.float_left}`} style={{fontSize: '24px', cursor: 'pointer'}}></i></span>
                        <span className="font-weight-bold" style={{fontSize:'18px', paddingRight:'20px'}}>Reset Password</span>
                    </div>
                    <div className='mt-5 p-3'>
                        <div className={`${classes.left}`}>
                            <div className={classes.labels}>Email</div>
                            <input onChange={this.emailHandler} type="email" className={classes.input}/>
                        </div>
                        <div className='mt-3 mb-4'>
                            <button onClick={this.submitHandler} className={`btn btn-danger ${classes.red} mt-3`}>Reset</button>
                        </div>
                    </div>
                    <Alert/>
                </div>
            </WhiteSquare>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        triggerAlert: (alertOpen, alertType, alertMessage, alertDuration) => dispatch(alertActions.triggerAlert(alertOpen, alertType, alertMessage, alertDuration))
    };
};
export default withRouter(connect(null, mapDispatchToProps)(ResetPassword))