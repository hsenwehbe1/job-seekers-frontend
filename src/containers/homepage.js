import React, { Component } from 'react';
import axios from '../axios';

class homepage extends Component {
    state = ({
        'fname' : '',
        'lname' : ''
    })
    componentDidMount(){
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('/students/info', config).then((response)=>{
            this.setState({
                fname: response.data.fname,
                lname: response.data.lname
            })
        })
    }
    logoutHandler = ()=>{
        localStorage.removeItem('token')
        this.props.history.push('/')
    }
    render() {
        return (
            <div className='container'>
                Welcome {this.state.fname}
                <button className="btn btn-outline-primary" onClick={this.logoutHandler}>Logout</button>
            </div>
        );
    }
}

export default homepage;