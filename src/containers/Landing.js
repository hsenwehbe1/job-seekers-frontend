import React, { Component } from 'react'
import axios from '../axios'
import Spinner from '../components/Spinner/Spinner'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/alert'
import Alert from '../components/Alert/Alert'
class Landing extends Component {
    state = ({
        'email' : '',
        'password' : '',
        spinner : true,
        empty : true
    })
    componentDidMount(){
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('token-validity', config).then((response)=>{
            console.log(response)
            this.props.history.push('/home')
        }).catch((err)=>{
            this.setState({
                ...this.state,
                spinner : false,
                empty : false
            })
        })
    }
    loginSubmitHandler = (event)=>{
        event.preventDefault()
        this.setState({
            ...this.state,
            spinner : true
        })
        axios.post('students/login', {
            email : this.state.email,
            password : this.state.password
        }).then((response)=>{
            localStorage.setItem('token', response.data.token)
            this.props.history.push('/home')
            this.setState({
                ...this.state,
                spinner : false
            })
        }).catch((err)=>{
            this.props.triggerAlert(true, 'error', 'Invalid credentials', 3000)
            this.setState({
                ...this.state,
                spinner : false
            })
        })
    }
    emailHandler = (event)=>{
        this.setState({
            ...this.state,
            email : event.target.value
        })
    }
    passwordHandler = (event)=>{
        this.setState({
            ...this.state,
            password : event.target.value
        })
    }
    resetPasswordHandler = ()=>{
        this.props.history.push('/resetpassword')
    }
    render() {
        let spinner = ''
        let content = (
            <React.Fragment>
                <form onSubmit={this.loginSubmitHandler}>
                    <div className="form-group">
                        <input type="email" onChange={this.emailHandler} className="form-control mb-3" placeholder="Email" required/>
                        <input type="password" onChange={this.passwordHandler} className="form-control mb-3" placeholder="Password" required/>
                        <button className="btn btn-primary btn-block">Login</button>
                        <Alert/>
                    </div>
                </form>
                <button className="btn btn-primary btn-block" onClick={this.resetPasswordHandler}>Reset Password</button>
            </React.Fragment>
        )
        if(this.state.spinner){
            spinner = <Spinner/>
        }
        if(this.state.empty){
            content = ''
        }
        return (
            <React.Fragment>
                <div className="container mt-5">
                    {content}
                    {spinner}
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        triggerAlert: (alertOpen, alertType, alertMessage, alertDuration) => dispatch(actions.triggerAlert(alertOpen, alertType, alertMessage, alertDuration)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Landing);