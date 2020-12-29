import React, { Component } from 'react'
import axios from '../axios'
import Spinner from '../components/Spinner/Spinner'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/auth'
class signup extends Component {
    state=({
        spinner : false,
        fname : '',
        lname : '',
        email : '',
        password : '',
    })
    signupFormSubmit = (event)=>{
        event.preventDefault()
        this.setState({
            ...this.state,
            spinner : true
        })
        axios.post('students/signup', {
            fname : this.state.fname,
            lname : this.state.lname,
            email : this.state.email,
            password : this.state.password
        }).then((response)=>{
            this.props.saveEmail(this.state.email)
            this.setState({
                ...this.state,
                spinner : false
            })
            this.props.history.push('/verify')
        }).catch((err)=>{
            this.setState({
                ...this.state,
                spinner : false
            })
            console.log('bad')
            console.log(err)
        })
    }
    fnameHandler = (event)=>{
        this.setState({
            ...this.state,
            fname : event.target.value
        })
    }
    lnameHandler = (event)=>{
        this.setState({
            ...this.state,
            lname : event.target.value
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
    render() {
        let content = ''
        if(this.state.spinner){
            content = <Spinner/>
        }
        return (
            <React.Fragment>
            <div className="container mt-5">
                <form onSubmit={this.signupFormSubmit}>
                    <div className="form-group">
                        <input className="form-control mb-3" onChange={this.fnameHandler} type="text" id="name" placeholder="First Name"/>
                        <input className="form-control mb-3" onChange={this.lnameHandler} type="text" id="name" placeholder="Last Name"/>
                        <input className="form-control mb-3" onChange={this.emailHandler} type="email" id="name" placeholder="Email"/>
                        <input className="form-control mb-3" onChange={this.passwordHandler} type="password" id="name" placeholder="Password"/>
                        <button className="btn btn-primary btn-block" type='submit'>Submit</button>
                    </div>
                </form>
                {content}
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveEmail: (email) => dispatch(actions.saveEmail(email))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(signup);