import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import classes from './Signup.css'
import axios from '../../../axios'
import {connect} from 'react-redux'
import * as alertActions from '../../../redux/actions/alert'
import validator from 'email-validator'
import Alert from '../../Alert/Alert'
import LinkedinIcon from '../../../assets/images/linkedin.png'
import Reset from '../../Reset/Reset'
import WhiteSquare from '../../WhiteSquare/WhiteSquare'
import Spinner from '../../Spinner/Spinner'
class Signup extends Component {
    state = ({
        fname: '',
        lname: '',
        email: '',
        password: '',
        checkbox: false,
        mailbox: false,
        spinner: false
    })

    
    fnameHandler = (event)=>{
        this.setState({
            ...this.state,
            fname: event.target.value
        })
    }
    
    lnameHandler = (event)=>{
        this.setState({
            ...this.state,
            lname: event.target.value
        })
    }

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

    checkboxHandler = (event)=>{
        this.setState({
            ...this.state,
            checkbox: event.target.checked
        })
    }

    formHandler = ()=>{
        if(validator.validate(this.state.email) && this.state.password.length>=8 && this.state.checkbox){
            this.setState({
                ...this.state,
                spinner: true
            })
            axios.post('students/signup', {
                fname : this.state.fname,
                lname : this.state.lname,
                email : this.state.email,
                password : this.state.password
            }).then((response)=>{
                this.props.triggerAlert(true, 'success', 'Success', 3000)
                this.setState({
                    ...this.state,
                    mailbox: true,
                    spinner: false
                })
            }).catch((err)=>{
                if (!err.response) { // connection error
                    this.props.triggerAlert(true, 'error', 'Connection interrupted: Check your internet connection', 10000)
                } else {
                    if(err.response.data.error!==''){
                        this.props.triggerAlert(true, 'error', 'Email already in use', 3000)
                    }else{
                        this.props.triggerAlert(true, 'error', 'Something went wrong', 3000)
                    }   
                }
                this.setState({
                    ...this.state,
                    spinner: false
                })
            })
            
        }else if(this.state.fname===''){
            this.props.triggerAlert(true, 'error', "First Name can't be empty", 3000)
        }else if(this.state.lname===''){
            this.props.triggerAlert(true, 'error', "Last Name can't be empty", 3000)
        }else if(!validator.validate(this.state.email)){
            this.props.triggerAlert(true, 'error', 'Invalid email', 3000)
        }else if(this.state.password.length<8){
            this.props.triggerAlert(true, 'error', 'Password too short', 3000)
        }else if(!this.state.checkbox){
            this.props.triggerAlert(true, 'error', 'You have to accept terms and conditions', 3000)
        }
    }
    render() {
        let content = ''
        let spinner = ''
        if(this.state.spinner){
            spinner = <Spinner/>
        }
        if(this.state.mailbox){
            content = <Reset message='Kindly check your mailbox to verify your account'/>
        }else{
            content = (
                <React.Fragment>
                    <div className='d-inline'>
                        <span>
                            <Link onClick={()=>this.props.history.goBack()} style={{color: '#133C59'}}>
                                <i className={`fas fa-arrow-left ${classes.float_left}`} style={{fontSize: '24px'}}></i>
                            </Link>
                        </span>
                        <span className="font-weight-bold" style={{fontSize:'18px', paddingRight:'20px'}}>Sign Up</span>
                    </div>
                    <div>
                        <p className='pt-3'>via</p>
                        <img src={LinkedinIcon} alt="linkedin"/>
                        <div className={`pt-4 ${classes.line_through}`}>
                            <div className={classes.line}></div>
                            <div><p className={classes.account}>Or</p></div>
                            <div className={classes.line}></div>
                        </div>
                        <div className={`${classes.left}`}>
                            <div className={classes.labels}>First Name</div>
                            <input onChange={this.fnameHandler} type="text" className={classes.input} />
                            <div className={`pt-2 ${classes.labels}`}>Last Name</div>
                            <input onChange={this.lnameHandler} type="text" className={classes.input} />
                            <div className={`pt-2 ${classes.labels}`}>Email</div>
                            <input onChange={this.emailHandler} type="email" className={classes.input} />
                            <div className={`pt-2 ${classes.labels}`}>Password</div>
                            <div className='mb-2'><input onChange={this.passwordHandler} type="password" className={classes.input}/><small className="text-muted" id="fileHelp" style={{fontSize:'11px'}}>Min. 8 characters</small><br></br></div>
                            <div className="d-inline" style={{fontSize: '12px'}}>
                                <input type="checkbox" onChange={this.checkboxHandler}/> I have read all <span className="font-weight-bold">terms & conditions</span>
                            </div>
                        </div>
                        <div>
                            <button onClick={this.formHandler} className={`btn btn-danger ${classes.red} mt-3`}>Sign Up</button>
                        </div><br></br>
                        {spinner}
                    </div>
                </React.Fragment>
            )
        }
        return (
            <WhiteSquare>
                <div className="text-center">
                    {content}
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
export default withRouter(connect(null, mapDispatchToProps)(Signup))