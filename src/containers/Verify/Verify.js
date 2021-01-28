import React, { Component } from 'react'
import axios from '../../axios'
import {connect} from 'react-redux'
import * as alertActions from '../../redux/actions/alert'
import Alert from '../../components/Alert/Alert'
import Spinner from '../../components/Spinner/Spinner'
class Verify extends Component {
    componentDidMount(){
        axios.post('/students/verify', {token : this.props.match.params.token}).then((response)=>{
            localStorage.removeItem('token')
            this.props.triggerAlert(true, 'success', 'Account successfully verified', 10000)
            this.props.history.push('/login')
        }).catch((err)=>{
            if (!err.response) { // connection error
                this.props.triggerAlert(true, 'error', 'Connection interrupted: Check your internet connection', 10000)
            }else{
                this.props.triggerAlert(true, 'error', 'Something went wrong', 10000)
            }
            localStorage.removeItem('token')
            this.props.history.push('/')
        })
    }
    render() {
        return (
            <div className='text-center'>
                Redirecting... <br></br>
                <Spinner/>
                <Alert/>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        triggerAlert: (alertOpen, alertType, alertMessage, alertDuration) => dispatch(alertActions.triggerAlert(alertOpen, alertType, alertMessage, alertDuration))
    };
};
export default connect(null, mapDispatchToProps)(Verify)