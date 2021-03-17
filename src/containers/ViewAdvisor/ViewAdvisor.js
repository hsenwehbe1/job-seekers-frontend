import React, { Component } from 'react'
import classes from './ViewAdvisor.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import axios from '../../axios'
import { withRouter } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import Major from '../Path/SpecificPath/Skills/Skills'
import moment from 'moment'
class AboutUs extends Component {
    state = ({
        fname : '',
        lname : '',
        email : '',
        linkedin : '',
        major : [],
        image : '',
        spinner : false,
        workExperience: [],
        date: '',
        isAdvisor: ''
    })
    componentDidMount(){
        this.setState({
            ...this.state,
            spinner: true
        })
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get(`advisors/${this.props.match.params.id}`, config).then((response)=>{
            this.setState({
                ...this.state,
                fname: response.data.fname,
                lname: response.data.lname,
                email: response.data.email,
                workExperience: [...response.data.workExperience],
                linkedin: response.data.linkedin,
                date: moment(response.data.createdAt).format('MMMM DD, YYYY'),
                major: [...response.data.roles],
                image: response.data.image,
                spinner: false
            })
        }).catch((error)=>{
            console.log(error)
        })
        axios.get(`students/isadvisor/${this.props.match.params.id}`, config).then((response)=>{
            console.log(response.data)
            this.setState({
                ...this.state,
                isAdvisor: response.data
            })
        }).catch((error)=>{

        })
    }
    addAdvisor = ()=>{
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.post('students/connect', {id: this.props.match.params.id}, config).then((response)=>{
            this.setState({
                ...this.state,
                isAdvisor: true
            })
        }).catch((err)=>{

        })
    }
    removeAdvisor = ()=>{
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.post('students/removeadvisor', {id: this.props.match.params.id}, config).then((response)=>{
            this.setState({
                ...this.state,
                isAdvisor: false
            })
        }).catch((err)=>{
            
        })
    }
    render() {
        let majors = ''
        let workExperienceContent = ''
        if(this.state.major.length!==0){
            majors = (
                this.state.major.map((element, index)=>{
                    return <Major key={index}>{element}</Major>
                })
            )
            workExperienceContent = (
                this.state.workExperience.map((element, index)=>{
                    return <div>
                    <div className={classes.Media}>
                        <div className={classes.Media_figure}>
                            <div className={`fas fa-suitcase pt-1 d-block`}></div>
                        </div>
                        <div className={classes.Media_body}>
                            <input readOnly className={`font-weight-bold w-100 ${classes.input1}`} type="text" defaultValue={element.jobTitle} id={index}/><br></br>
                            <input readOnly className={`font-weight-light w-100 ${classes.input1}`} type="text" defaultValue={element.organization} id={index}/><br></br>
                        </div>
                    </div></div>
                })
            )
        }
        return (
            <div className="mt-4">
                <HeaderBar/>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <Sidebar/>
                    <div className="container">
                        <div className={`${classes.upper_part} px-0`}>
                            <div>
                            {this.state.spinner ? <Spinner/> :
                                <div className='row pt-3'>
                                <div className={`col-12 col-md-3 ${classes.resp}`}>
                                    <img src={`data:image/png;base64,${this.state.image}`} alt="" className={classes.image}/><p className='font-weight-light'>Joined {this.state.date}</p>
                                    {this.state.isAdvisor ? <p><button className={`btn btn-danger ${classes.red}`} onClick={this.removeAdvisor}>Remove advisor</button></p> : <p><button className={`btn btn-primary ${classes.blue}`} onClick={this.addAdvisor}>Add advisor</button></p>}
                                </div>
                                <div className='col-12 col-md-9'>
                                    <div className='row'>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="border-bottom d-inline-block w-100">
                                                <div className='font-weight-light'>First Name</div>
                                                <input readOnly type="text" className={`form-control ${classes.border} ${classes.input}`} defaultValue={this.state.fname}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="border-bottom d-inline-block w-100">
                                                <div className='font-weight-light'>Last Name</div>
                                                <input readOnly type="text" className={`form-control ${classes.border} ${classes.input}`} defaultValue={this.state.lname}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="border-bottom d-inline-block w-100">
                                                <div className='font-weight-light'>Email</div>
                                                <input readOnly type="email" className={`form-control ${classes.border} ${classes.input}`} defaultValue={this.state.email}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="border-bottom d-inline-block w-100">
                                                <div className='font-weight-light'>LinkedIn Public URL</div>
                                                <div className='d-flex'>
                                                    <i className={`fab fa-linkedin-in ${classes.logo1}`}></i>
                                                    <input readOnly type="text" className={`form-control ${classes.border} ${classes.input}`} defaultValue={this.state.linkedin} style={{'color':'#007FEB'}}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3 position-relative">
                                            <div className="d-inline-block w-100">
                                                <div className='font-weight-light'>Work Field</div>
                                                {majors}
                                            </div>
                                            <div ref={this.wrapperRef} className={`${classes.dropdown}`}>
                                            </div>
                                        </div>
                                        <div className={`col-12 ${classes.experience}`}>
                                            <p className='font-weight-bold'>Work Experience</p>
                                            {workExperienceContent}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AboutUs)