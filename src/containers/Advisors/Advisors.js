import React, { Component } from 'react'
import classes from './Advisors.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Query from 'query-string'
import axios from '../../axios'
import defaultAxios from 'axios'
import {connect} from 'react-redux'
import * as alertActions from '../../redux/actions/alert'
import Alert from '../../components/Alert/Alert'
import Spinner from '../../components/Spinner/Spinner'
import Job from './Job/Job'
class Advisors extends Component {
    state = ({
        fname : '',
        lname : '',
        email : '',
        linkedin : '',
        major : [],
        image : 'https://use.fontawesome.com/releases/v5.0.8/svgs/solid/user.svg',
        spinner1 : false,
        dropdown: false,
        roles: ['hello', 'my', 'name', 'is', 'Mohamed', 'Safieddine', 'And', 'im', 'a', 'beast'],
        search: ['hello', 'my', 'name', 'is', 'Mohamed', 'Safieddine', 'And', 'im', 'a', 'beast'],
        workExperience: [],
        wrapperRef: React.createRef(),
        handleClickOutside: this.handleClickOutside.bind(this)
    })
    componentDidMount(){
        document.addEventListener('mousedown', this.state.handleClickOutside);
        let params = Query.parse(this.props.location.search)
        if(params.code!==undefined){
            let oldState = JSON.parse(localStorage.getItem('state'))
            this.setState({
                ...oldState
            })
            axios.post('/advisors/photo', {code: params.code}).then((response)=>{
                this.setState({
                    ...this.state,
                    image: response.data.image
                })
                this.props.triggerAlert(true, 'success', "Photo added", 10000)
            }).catch((err)=>{
                this.props.triggerAlert(true, 'error', "Photo failed. Try again", 10000)
            })
        }
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.state.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.state.wrapperRef && !this.state.wrapperRef.current.contains(event.target)) {
            this.setState({
                ...this.state,
                dropdown: false
            })
        }
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
    linkedinHandler = (event)=>{
        this.setState({
            ...this.state,
            linkedin : event.target.value
        })
    }
    majorHandler = (event)=>{
        this.setState({
            ...this.state,
            major : event.target.value
        })
    }
    redirectHandler = ()=>{
        // save the state in local storage then redirect the user.
        localStorage.setItem('state', JSON.stringify(this.state))
    }
    workHandler = (event)=>{
        let arr = []
        this.state.roles.forEach(element => {
            if(element.toLowerCase().includes(event.target.value.toLowerCase())){
                arr.push(element)
            }
        })
        if(arr.length===0 && event.target.value===''){
            this.setState({
                ...this.state,
                search: [...this.state.roles]
            })
        }else{
            this.setState({
                ...this.state,
                search: [...arr]
            })
        }
    }
    optionHandler = (event)=>{
        let arr = [...this.state.major]
        let selected = this.state.search[event.target.id]
        arr.push(selected)
        this.setState({
            major: [...arr]
        })
    }
    optionHandlerUnselect = (event)=>{
        let arr = [...this.state.major]
        let selected = this.state.search[event.target.id]
        arr.splice(arr.indexOf(selected), 1)
        this.setState({
            major: [...arr]
        })
    }
    submitHandler = ()=>{
        //console.log(this.state.workExperience)
        if(this.state.fname==='' || this.state.lname==='' || this.state.email==='' || this.state.major.length===0 || this.state.image==='' || this.state.linkedin==='' || this.state.workExperience.length===0){
            this.props.triggerAlert(true, 'error', "Missing field(s)", 10000)
        }else{
            axios.post('advisors/signup', {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                linkedin: this.state.linkedin,
                roles: this.state.major,
                image: this.state.image
            }).then((response)=>{
                if(response.data.message==='exists'){
                    this.props.triggerAlert(true, 'error', "Mentor with the same email exists", 10000)
                }else{
                    this.props.triggerAlert(true, 'success', "Successfully signed up", 10000)
                }
            }).catch((err)=>{
                this.props.triggerAlert(true, 'error', "Something went wrong. Try again", 10000)
            })
        }
    }
    cvHandler = (event)=>{
        const formData = new FormData()
        formData.append('file', event.target.files[0])
        let fileType = event.target.files[0].name.split('.')[1]
        if(fileType==='doc' || fileType==='docx' || fileType==='pdf'){
            formData.append('fileName', event.target.files[0].name)
            let token = '74d6116771b61cd7b242b5d539dd1f1c3e78f4ff'
            let config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            }
            let config1 = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            this.setState({
                ...this.state,
                spinner1: true
            })
            defaultAxios.post('https://resume-parser.affinda.com/public/api/v1/documents/', formData, config).then((response)=>{
                let id = response.data.identifier
                setTimeout(() => {
                    defaultAxios.get(`https://resume-parser.affinda.com/public/api/v1/documents/${id}`, config1).then((response)=>{
                        console.log(response)
                        let data = response.data.data
                        let linkedin = ''
                        data.websites.forEach(element => {
                            if(element.toLowerCase().includes('linkedin.com')){
                                linkedin = element
                            }
                        })
                        if(linkedin===''){
                            this.props.triggerAlert(true, 'warning', "We couldn't retrieve your LinkedIn public url from the resume. Please insert it manually.", 10000)
                        }
                        this.setState({
                            ...this.state,
                            fname: data.name.first,
                            lname: data.name.last,
                            email: data.emails[0],
                            workExperience: [...data.workExperience],
                            linkedin: linkedin,
                            spinner1: false
                        })
                    }).catch((err)=>{
                        this.props.triggerAlert(true, 'error', 'Something went wrong. Please try again', 10000)
                    })
                }, 5000);
            }).catch((err)=>{
                this.props.triggerAlert(true, 'error', 'Something went wrong. Please try again', 10000)
            })
        }else{
            this.props.triggerAlert(true, 'error', 'File should be of type pdf, doc, or docx', 10000)
        }
    }
    render() {
        console.log(this.state.workExperience)
        let dropdownContent = (
            this.state.search.map((element, index)=>{
                if(this.state.major.includes(element)){
                    return <div key={`i${index}`} className={`${classes.item} ${classes.selectedItem}`} id={index} onClick={this.optionHandlerUnselect}>{element}</div>

                }else{
                    return <div key={`o${index}`} className={classes.item} id={index} onClick={this.optionHandler}>{element}</div>
                }
            })
        )
        let workExperienceContent = ''
        workExperienceContent = (
            this.state.workExperience.map((element, index)=>{
                return <div>
                <div className={classes.Media}>
                    <i className={`fas fa-suitcase pt-1 ${classes.Media_figure}`}></i>
                    <div className={classes.Media_body}>
                        <input className={`font-weight-bold w-100 ${classes.input1}`} type="text" value={element.jobTitle}/><br></br>
                        <input className={`font-weight-light w-100 ${classes.input1}`} type="text" value={element.organization}/><br></br>
                    </div>
                </div></div>
            })
        )
        let spinner = ''
        let isShownDropdown = ''
        if(!this.state.dropdown){
            isShownDropdown = 'd-none'
        }
        if(this.state.spinner1){
            spinner = <Spinner/>
        }
        return (
            <div className="mt-4">
                <p className={classes.platform}>MentorEd</p>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <div className="container">
                        <div className={`${classes.upper_part} px-0`}>
                            <div className={`${classes.text_lg}`}>
                                Mentor Signup
                            </div>
                            <div className="">
                                <div className='row pt-3'>
                                    <div className="col-12 col-md-3">
                                        <img src={this.state.image} alt="" className={classes.image}/><br></br>
                                        <a className='font-weight-light' onClick={this.redirectHandler} href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&scope=r_liteprofile%20r_emailaddress&client_id=78q6bhbb9echn1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fadvisors">Upload your LinkedIn photo</a>
                                    </div>
                                    <div className='col-12 col-md-9'>
                                        <div className='row'>
                                            <div className="col-sm-12">
                                                <button className='btn btn-outline-primary mb-3' onClick={()=>{this.fileInput.click()}}>Upload Resume</button>{spinner}
                                            </div>
                                            <div className="col-sm-12 col-md-6 mb-3">
                                                <div className="border-bottom d-inline-block w-100">
                                                    <div className='font-weight-light'>First Name</div>
                                                    <input type="text" className={`form-control ${classes.border} ${classes.input}`} defaultValue={this.state.fname} onChange={this.fnameHandler}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6 mb-3">
                                                <div className="border-bottom d-inline-block w-100">
                                                    <div className='font-weight-light'>Last Name</div>
                                                    <input type="text" className={`form-control ${classes.border} ${classes.input}`} defaultValue={this.state.lname} onChange={this.lnameHandler}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6 mb-3">
                                                <div className="border-bottom d-inline-block w-100">
                                                    <div className='font-weight-light'>Email</div>
                                                    <input type="email" className={`form-control ${classes.border} ${classes.input}`} defaultValue={this.state.email} onChange={this.emailHandler}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6 mb-3 position-relative">
                                                <div className="border-bottom d-inline-block w-100">
                                                    <div className='font-weight-light'>Work Field</div>
                                                    <input type="text" onFocus={()=>{this.setState({...this.state, dropdown:true})}} className={`form-control ${classes.border} ${classes.input}`} onChange={this.workHandler}/>
                                                </div>
                                                <div ref={this.state.wrapperRef} className={`${classes.dropdown} ${isShownDropdown}`}>
                                                    <p className='font-weight-bold'>Work Experience</p>
                                                    {dropdownContent}
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6 mb-3">
                                                <div className="border-bottom d-inline-block w-100">
                                                    <div className='font-weight-light'>LinkedIn Public URL</div>
                                                    <input type="text" className={`form-control ${classes.border} ${classes.input}`} defaultValue={this.state.linkedin} onChange={this.linkedinHandler} style={{'color':'#007FEB'}}/>
                                                </div>
                                            </div>
                                            <div className={`col-12 ${classes.experience}`}>
                                                <p className='font-weight-bold'>Work Experience</p>
                                                {workExperienceContent}
                                                <div className="text-center"><span style={{'cursor':'pointer'}}>Add <i className='fas fa-plus-circle'></i></span></div>
                                            </div>
                                            <div className="col-12">
                                                <button onClick={this.submitHandler} className="btn btn-dark btn-block">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Alert/>
                <input style={{"display":"none"}} ref={fileInput=>this.fileInput=fileInput} type="file" name='upload1' id='upload1' onChange={this.cvHandler}/>
                <input style={{"display":"none"}} ref={imageInput=>this.imageInput=imageInput} type="file" name='upload2' id='upload2' onChange={this.imageHandler}/>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        triggerAlert: (alertOpen, alertType, alertMessage, alertDuration) => dispatch(alertActions.triggerAlert(alertOpen, alertType, alertMessage, alertDuration))
    }
}
export default connect(null, mapDispatchToProps)(Advisors)