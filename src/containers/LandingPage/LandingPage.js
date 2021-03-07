import React, { Component } from 'react'
import classes from './LandingPage.css'
import {connect} from 'react-redux'
import axios from '../../axios'
import Welcome from '../../components/LandingComponents/Welcome/Welcome'
import Signup from '../../components/LandingComponents/Signup/Signup'
import ResetPassword from '../../components/LandingComponents/ResetPassword/ResetPassword'
import ResetEmail from '../../components/LandingComponents/ResetEmail/ResetEmail'
import Login from '../../components/LandingComponents/Login/Login'
import Landing from '../../assets/icons/landing.svg'
import { withRouter } from 'react-router-dom'
import Alert from '../../components/Alert/Alert'
import Spinner from '../../components/Spinner/Spinner'
class LandingPage extends Component {
    state = ({
        isEmpty: true
    })
    componentDidMount(){
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('token-validity', config).then((response)=>{
            //redirect user to homepage)
            this.props.history.push('/home')
        }).catch((err)=>{
            //stay on landing page
            this.setState({
                isEmpty: false
            })
        })
    }
    render() {
        let isShown = ''
        let isHidden = ''
        let content = ''
        if(this.state.isEmpty){
            isShown = classes.hide
        }else{
            isHidden = classes.hide
        }
        if(this.props.section==='landing'){
            content = <Welcome/>
        }else if(this.props.section==='signup'){
            content = <Signup/>
        }else if(this.props.section==='login'){
            content = <Login/>
        }else if(this.props.section==='resetpassword'){
            content = <ResetPassword/>
        }else if(this.props.section==='updatepassword'){
            content = <ResetEmail/>
        }
        return (
            <React.Fragment>
                <div className={isHidden}><br></br><Spinner/></div>
                <div className={isShown}>
                    <div className="container-fluid mt-3">
                        <a className="font-weight-bold d-inline float-left" style={{'color':'#007FEB', 'fontSize':'20px'}}>MentorEd</a>
                        <div className={classes.icon}><i className={`united states flag ${classes.flagicon}`}></i></div>
                    </div>
                    <div className="container mt-5" style={{color:'#133C59'}}>
                        <div className="row">
                            <div className={`col-md-7 ${classes.left_content}`}>
                                <p className={classes.heading}><span className='font-weight-bold'>50% of recruiters</span> say referrals are the leading source of quality hires</p>
                                <img src={Landing} alt="landing" className='img-fluid'/>
                            </div>
                            <div className="col-md-5">
                                {content}
                            </div>
                        </div>
                    </div>
                    <Alert/>
            </div>
            </React.Fragment>
        )
    }
}
export default withRouter(connect(null, null)(LandingPage))