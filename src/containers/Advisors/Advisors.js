import React, { Component } from 'react'
import classes from './Advisors.css'
import axios from '../../axios'
import defaultAxios from 'axios'
import {connect} from 'react-redux'
import * as alertActions from '../../redux/actions/alert'
import Alert from '../../components/Alert/Alert'
import Spinner from '../../components/Spinner/Spinner'
import Sort from 'merge-sort'
import { Tooltip } from '@material-ui/core'
class Advisors extends Component {
    state = ({
        fname : '',
        lname : '',
        email : '',
        linkedin : '',
        major : [],
        image : 'https://use.fontawesome.com/releases/v5.0.8/svgs/solid/user.svg',
        spinner1 : false,
        spinner2: false,
        dropdown: false,
        roles: [],
        search: []  ,
        workExperience: [], // array of objects that has jobTitle and organization
        manualWorkExperience: [],
        handleClickOutside: this.handleClickOutside.bind(this)
    })
    wrapperRef= React.createRef()
    componentDidMount(){
        this.setState({
            ...this.state,
            spinner2: true
        })
        axios.get('students/retreiveallroles').then((response)=>{
            let arr = Sort(response.data)
            this.setState({
                ...this.state,
                roles: [...arr],
                search: [...arr],
                spinner2: false
            })
        }).catch((error)=>{
        })
        document.addEventListener('mousedown', this.state.handleClickOutside)
        let search = this.props.location.search
        search = search.substring(1)
        let params = new URLSearchParams(search);
        if(params.get("code")!==null){
            let oldState = {...JSON.parse(localStorage.getItem('state'))}
            this.setState({
                ...oldState
            })
            axios.post('/advisors/photo', {code: params.get("code")}).then((response)=>{
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
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
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
        let obj = JSON.stringify({...this.state})
        localStorage.setItem('state', obj)
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
    addWorkExperience = ()=>{
        let arr = [...this.state.manualWorkExperience]
        let obj = {
            'jobTitle': '',
            'organization': ''
        }
        arr.push(obj)
        this.setState({
            manualWorkExperience: [...arr]
        })
    }
    jobTitleHandler = (event)=>{
        let arr = [...this.state.workExperience]
        let obj = {...arr[event.target.id]}
        obj.jobTitle = event.target.value
        arr[event.target.id] = obj
        this.setState({
            ...this.state,
            workExperience: [...arr]
        })
    }
    manualJobTitleHandler = (event)=>{
        let arr = [...this.state.manualWorkExperience]
        let obj = {...arr[event.target.id]}
        obj.jobTitle = event.target.value
        arr[event.target.id] = obj
        this.setState({
            ...this.state,
            manualWorkExperience: [...arr]
        })
    }
    organizationHandler = (event)=>{
        let arr = [...this.state.workExperience]
        let obj = {...arr[event.target.id]}
        obj.organization = event.target.value
        arr[event.target.id] = obj
        this.setState({
            ...this.state,
            workExperience: [...arr]
        })
    }
    manualOrganizationHandler = (event)=>{
        let arr = [...this.state.manualWorkExperience]
        let obj = {...arr[event.target.id]}
        obj.organization = event.target.value
        arr[event.target.id] = obj
        this.setState({
            ...this.state,
            manualWorkExperience: [...arr]
        })
    }
    deleteJob = (event)=>{
        let arr = [...this.state.workExperience]
        arr.splice(event.target.id, 1)
        this.setState({
            ...this.state,
            workExperience: [...arr]
        })
    }
    manualDeleteJob = (event)=>{
        let arr = [...this.state.manualWorkExperience]
        arr.splice(event.target.id, 1)
        this.setState({
            ...this.state,
            manualWorkExperience: [...arr]
        })
    }
    validateEmail = (email)=>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validateExperience = (arr)=>{
        let isEmpty = false
        arr.forEach(element => {
            if(element.jobTitle==='' || element.organization===''){isEmpty=true}
        })
        return isEmpty
    }
    submitHandler = ()=>{
        let finalWorkExperience = []
        let obj = ''
        this.state.workExperience.forEach(element => {
            obj = {
                jobTitle: element.jobTitle,
                organization: element.organization
            }
            finalWorkExperience.push(obj)
        })
        finalWorkExperience = [...finalWorkExperience.concat(this.state.manualWorkExperience)]
        if(this.state.fname==='' || this.state.lname==='' || this.state.email==='' || this.state.major.length===0 || this.state.image==='' || this.state.linkedin==='' || this.validateExperience(finalWorkExperience)){
            console.log(this.state)
            console.log(finalWorkExperience)
            this.props.triggerAlert(true, 'error', "Missing field(s)", 10000)
        }else if(!this.validateEmail(this.state.email)){
            this.props.triggerAlert(true, 'error', "Invalid email address", 10000)
        }else{
            axios.post('advisors/signup', {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                linkedin: this.state.linkedin,
                roles: this.state.major,
                image: this.state.image,
                workExperience: finalWorkExperience
            }).then((response)=>{
                if(response.data.message==='exists'){
                    this.props.triggerAlert(true, 'error', "Mentor with the same email exists", 10000)
                }else{
                    this.props.triggerAlert(true, 'success', "Successfully signed up", 10000)
                    window.location.pathname = '/advisors/end'
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
            let token = '245085f80f1873c5f6f114dc99cc46633cc8db85'
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
                        let data = response.data.data
                        let linkedin = ''
                        if(data.websites!=null){
                            data.websites.forEach(element => {
                                if(element.toLowerCase().includes('linkedin.com')){
                                    linkedin = element
                                }
                            })
                        }
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
        let major = ''
        let ok = ''
        if(!this.state.dropdown){
            major = this.state.major.join(', ')
        }else{
            ok = 'd-none'
        }
        let manualExperience = (
            this.state.manualWorkExperience.map((element, index)=>{
                return (
                    <div key={`rr${index}`}>
                        <div className={classes.Media}>
                            <div className={classes.Media_figure}>
                                <div className={`fas fa-suitcase pt-1 d-block`}></div>
                                <Tooltip title='Delete Job'><div className={`fas fa-minus-circle pt-1`} style={{'color':'#F37168', 'cursor':'pointer'}} id={index} onClick={this.manualDeleteJob}></div></Tooltip>
                            </div>
                            <div className={classes.Media_body}>
                                <input placeholder='Job Title' onChange={this.manualJobTitleHandler} value={element.jobTitle} className={`font-weight-bold w-100 ${classes.input1}`} type="text" id={index}/><br></br>
                                <input value={element.organization} placeholder='Organization' onChange={this.manualOrganizationHandler} className={`font-weight-light w-100 ${classes.input1}`} type="text" id={index}/><br></br>
                            </div>
                        </div>
                    </div>
                )
            })
        )
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
                return <div key={`pp${index}`}>
                <div className={classes.Media}>
                    <div className={classes.Media_figure}>
                        <div className={`fas fa-suitcase pt-1 d-block`}></div>
                        <Tooltip title='Delete Job'><div className={`fas fa-minus-circle pt-1`} id={index} style={{'color':'#F37168', 'cursor':'pointer'}} onClick={this.deleteJob}></div></Tooltip>
                    </div>
                    <div className={classes.Media_body}>
                        <input onChange={this.jobTitleHandler} className={`font-weight-bold w-100 ${classes.input1}`} type="text" value={element.jobTitle} id={index}/><br></br>
                        <input onChange={this.organizationHandler} className={`font-weight-light w-100 ${classes.input1}`} type="text" value={element.organization} id={index}/><br></br>
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
                            {this.state.spinner2?<Spinner/>:<div className="">
                            <div className='row pt-3'>
                                <div className={`col-12 col-md-3 ${classes.centerit}`}>
                                    <img src={this.state.image} alt="" className={classes.image}/><br></br>
                                    <a className='font-weight-light' onClick={this.redirectHandler} href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&scope=r_liteprofile%20r_emailaddress&client_id=78q6bhbb9echn1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fadvisors">Upload your LinkedIn photo</a>
                                </div>
                                <div className='col-12 col-md-9'>
                                    <div className='row'>
                                        <div className={`col-sm-12 ${classes.centerit} ${classes.mrgn}`}>
                                            <button className='btn btn-outline-primary mb-3' onClick={()=>{this.fileInput.click()}}>Upload Resume</button>{spinner}
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="border-bottom d-inline-block w-100">
                                                <div className='font-weight-light'>First Name</div>
                                                <input type="text" className={`form-control ${classes.border} ${classes.input}`} value={this.state.fname} onChange={this.fnameHandler}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="border-bottom d-inline-block w-100">
                                                <div className='font-weight-light'>Last Name</div>
                                                <input type="text" className={`form-control ${classes.border} ${classes.input}`} value={this.state.lname} onChange={this.lnameHandler}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="border-bottom d-inline-block w-100">
                                                <div className='font-weight-light'>Email</div>
                                                <input type="email" className={`form-control ${classes.border} ${classes.input}`} value={this.state.email} onChange={this.emailHandler}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3 position-relative">
                                            <div className="border-bottom d-inline-block w-100">
                                                <div className='font-weight-light'>Work Field</div>
                                                <input type="text" onFocus={()=>{this.setState({...this.state, dropdown:true})}} className={`form-control ${classes.border} ${classes.input}`} onChange={this.workHandler}/>
                                                <span className={ok}><input className={`position-absolute form-control ${classes.border} ${classes.input}`} onFocus={()=>{this.setState({...this.state, dropdown:true})}} style={{'left':'12px'}} value={major}/></span>
                                            </div>
                                            <div ref={this.wrapperRef} className={`${classes.dropdown} ${isShownDropdown}`}>
                                                {dropdownContent}
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="border-bottom d-inline-block w-100">
                                                <div className='font-weight-light'>LinkedIn Public URL</div>
                                                <input type="text" className={`form-control ${classes.border} ${classes.input}`} value={this.state.linkedin} onChange={this.linkedinHandler} style={{'color':'#007FEB'}}/>
                                            </div>
                                        </div>
                                        <div className={`col-12 ${classes.experience}`}>
                                            <p className='font-weight-bold'>Work Experience</p>
                                            {workExperienceContent}
                                            {manualExperience}
                                            <div onClick={this.addWorkExperience} className="text-center pt-2"><span style={{'cursor':'pointer'}}>Add <i className='fas fa-plus-circle'></i></span></div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <button onClick={this.submitHandler} className="btn btn-dark btn-block">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
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