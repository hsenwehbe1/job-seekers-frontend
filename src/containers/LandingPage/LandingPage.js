import React, { Component } from 'react'
import classes from './LandingPage.css'
import {connect} from 'react-redux'
import axios from '../../axios'
import Welcome from '../../components/LandingComponents/Welcome/Welcome'
import Signup from '../../components/LandingComponents/Signup/Signup'
import ResetPassword from '../../components/LandingComponents/ResetPassword/ResetPassword'
import ResetEmail from '../../components/LandingComponents/ResetEmail/ResetEmail'
import Login from '../../components/LandingComponents/Login/Login'
import Logo from '../../assets/icons/logo.svg'
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
                    <nav className={`navbar navbar-expand-md navbar-light bg-transparent ${classes.nav} p-3`}>
                        <div className="container-fluid">
                            <a className="navbar-brand"><img src={Logo} alt="Logo"/></a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-bars"></i>
                            </button>
                            <div className={`collapse navbar-collapse ${classes.navpad}`} id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className={`nav-item`}>
                                        <a className={`nav-link font-weight-bold ${classes.nav}`} aria-current="page">Home</a>
                                    </li>
                                    <li className={`nav-item ${classes.itempad}`}>
                                        <a className={`nav-link font-weight-bold ${classes.nav}`}>About</a>
                                    </li>
                                    <li className={`nav-item ${classes.itempad}`}>
                                        <a className={`nav-link font-weight-bold ${classes.nav}`}>Career news</a>
                                    </li>
                                    <li className={`nav-item ${classes.itempad}`}>
                                        <a className={`nav-link font-weight-bold ${classes.nav}`}>Quick tips</a>
                                    </li>
                                </ul>
                            </div>
                            <div className={classes.icon}><i className={`united states flag ${classes.flagicon}`}></i></div>
                        </div>
                    </nav>
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