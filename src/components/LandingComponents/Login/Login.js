import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from '../../../axios'
import * as alertActions from '../../../redux/actions/alert'
import classes from './Login.css'
import Alert from '../../Alert/Alert'
import Spinner from '../../Spinner/Spinner'
import LinkedinIcon from '../../../assets/images/linkedin.png'
import WhiteSquare from '../../WhiteSquare/WhiteSquare'
class Login extends Component {
    state = ({
        email: '',
        password: '',
        spinner: false
    })

    emailHandler = (event)=>{
        this.setState({
            ...this.state,
            email: event.target.value
        })
    }

    passwordHandler = (event)=>{
        this.setState({
            ...this.state,
            password: event.target.value
        })
    }

    submitHandler = ()=>{
        if(this.state.email==='' || this.state.password===''){
            this.props.triggerAlert(true, 'error', 'Invalid input.', 3000)
        }else{
            this.setState({
                ...this.state,
                spinner: true
            })
            axios.post('students/login', {
                email : this.state.email,
                password : this.state.password
            }).then((response)=>{
                this.setState({
                    ...this.state,
                    spinner: false
                })
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('dialog', true)
                this.props.history.push('/home')
            }).catch((err)=>{
                if (!err.response) { // connection error
                    this.props.triggerAlert(true, 'error', 'Connection interrupted: Check your internet connection', 10000)
                }else{
                    if(err.response.data.error==='invalid credentials'){
                        this.props.triggerAlert(true, 'error', 'Invalid credentials.', 3000)
                    }else if(err.response.data.error==='unverified account'){
                        this.props.triggerAlert(true, 'error', 'Account not verified. Kindly check your mailbox to verify it.', 3000)
                    }
                }
                this.setState({
                    ...this.state,
                    spinner: false
                })
            })
        }
    }
    render() {
        let spinner = ''
        if(this.state.spinner){
            spinner = <Spinner/>
        }
        return (
            <WhiteSquare>
                <div className="text-center">
                    <div className='d-inline'>
                        <Link onClick={()=>this.props.history.push('/')} style={{color: '#133C59'}}>
                            <i className={`fas fa-arrow-left ${classes.float_left}`} style={{fontSize: '24px'}}></i>
                        </Link>
                        <span className="font-weight-bold" style={{fontSize:'18px', paddingRight:'20px'}}>Login</span>
                    </div>
                    <div>
                        <div className={`${classes.left} pt-4`}>
                            <div className={classes.labels}>Email</div>
                            <input onChange={this.emailHandler} type="email" className={classes.input}/>
                            <div className={`pt-2 ${classes.labels}`}>Password</div>
                            <div className='mb-2'><input onChange={this.passwordHandler} type="password" className={classes.input}/><br></br></div>
                        </div>
                        <div className='mt-4'>
                            <button onClick={this.submitHandler} className={`btn btn-danger ${classes.red}`}>Sign In</button>
                            <div className='mt-4'>
                                <p>Don't have an account? <Link to='/signup' className={classes.signup}><span className={`font-weight-bold`}>Sign up</span></Link> </p>
                                <p>Forgot password? <span onClick={()=>this.props.history.push('/resetpassword')} className={classes.reset}>Reset Now</span> </p>
                            </div>
                            <div className={`${classes.line_through}`}>
                                <div className={classes.line}></div>
                                <div><p className={classes.account}>or via</p></div>
                                <div className={classes.line}></div>
                            </div>
                            <img src={LinkedinIcon} alt="linkedin"/>
                        </div><br></br>
                        {spinner}
                        <Alert/>
                    </div>
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
export default withRouter(connect(null, mapDispatchToProps)(Login))