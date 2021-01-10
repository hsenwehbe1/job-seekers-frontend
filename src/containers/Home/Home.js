import React, { Component } from 'react'
import classes from './Home.css'
import axios from '../../axios'
import Dialog from '../../components/Dialog/Dialog'
import Box from '../../components/Box/Box'
import BulletPoints from '../../components/BulletPoints/BulletPoints'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import { withRouter } from 'react-router-dom'

class Home extends Component {
    state = ({
        fname: '',
        lname: '',
        didTakeTest: false
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
                lname: response.data.lname,
                didTakeTest: response.data.didTakeTest
            })
        }).catch((err)=>{
            if (!err.response) { // connection error
                this.props.triggerAlert(true, 'error', 'Connection interrupted: Check your internet connection', 10000)
            }else if(err.response.data.error==='unauthorized'){
                this.props.history.push('/')
            }
        })
    }
    render() {
        let content = ''
        let headerText = ''
        if(this.state.didTakeTest){
            headerText = 'Your Strengths!'
            content = (
                <React.Fragment>
                    <BulletPoints text='Computer Science'/>
                    <BulletPoints text='Design'/>
                    <BulletPoints text='Writing'/>
                </React.Fragment>
            )
        }else{
            headerText = `Hey, ${this.state.fname}!`
            content = (
                <React.Fragment>
                    <span className={classes.pb_2}>Start your test to fetch the best roles</span><br></br>
                    <button onClick={()=>this.props.history.push('/test')} className={`btn btn-danger ${classes.red}`}>Get test now</button>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <div className="mt-4">
                    <HeaderBar/>
                    <div className={`${classes.body_container} px-3 mt-4`}>
                        <Sidebar page='home'/>
                        <div className="container">
                            <div className={`${classes.upper_part} ${classes.pad}`}>
                                <div className={`${classes.text_lg}`}>
                                    {headerText}
                                </div>
                                <div className={classes.fool}>
                                    {content}
                                    <br></br>
                                    <div className={`${classes.bar} ${classes.pt_6} w-100`}>
                                        <div className={`w-100 p-1 ${classes.outer}`}>
                                            <div className={`w-100 p-3 bg-white d-flex ${classes.inner}`}>
                                                <i className={`fas fa-search ${classes.searchIcon}`}></i>
                                                <input className={`w-100 ${classes.search}`} type="text" placeholder="Search"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className='px-5 pt-5'>
                                <p className={classes.text}>
                                    Insights in USA, California
                                </p>
                                <div className="row">
                                    <div className="col-sm-12 col-md-3">
                                        <Box number='340K' text='Some text Some text Some text Some text'/>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <Box number='340K' text='Some text Some text Some text Some text'/>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <Box number='340K' text='Some text Some text Some text Some text'/>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <Box number='340K' text='Some text Some text Some text Some text'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.hidden}>
                    <Dialog isShown={true}/>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(Home)