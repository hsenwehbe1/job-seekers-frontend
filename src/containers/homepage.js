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
    render() {
        return (
            <div>
                {this.state.fname}
            </div>
        );
    }
}

export default homepage;