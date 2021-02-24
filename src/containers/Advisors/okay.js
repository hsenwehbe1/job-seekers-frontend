import React, { Component } from 'react'
import classes from './Advisors.css'
import Query from 'query-string'
import axios from '../../axios'
import defaultAxios from 'axios'
import {connect} from 'react-redux'
import * as alertActions from '../../redux/actions/alert'
import Alert from '../../components/Alert/Alert'
import Logo from '../../assets/icons/logo.svg'
class Advisors extends Component {
    state = ({
        fname : '',
        lname : '',
        email : '',
        univeristy : '',
        linkedin : '',
        major : '',
        image : ''
    })
    componentDidMount(){
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
    universityHandler = (event)=>{
        this.setState({
            ...this.state,
            univeristy : event.target.value
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
        console.log(this.state)
        localStorage.setItem('state', JSON.stringify(this.state))
    }
    submitHandler = ()=>{
        if(this.state.fname==='' || this.state.lname==='' || this.state.email==='' || this.state.major==='' || this.state.univeristy==='' || this.state.image==='' || this.state.linkedin===''){
            this.props.triggerAlert(true, 'error', "Missing field(s)", 10000)
        }else{
            axios.post('advisors/signup', {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                linkedin: this.state.linkedin,
                university: this.state.univeristy,
                major: this.state.major,
                image: this.state.image
            }).then((response)=>{
                this.props.triggerAlert(true, 'success', "Successfully signed up", 10000)
            }).catch((err)=>{
                this.props.triggerAlert(true, 'error', "Something went wrong. Try again", 10000)
            })
        }
    }
    cvHandler = (event)=>{
        const formData = new FormData()
        formData.append('file', event.target.files[0])
        let fileType = event.target.files[0].name.split('.')[1]
        console.log(fileType)
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
            defaultAxios.post('https://resume-parser.affinda.com/public/api/v1/documents/', formData, config).then((response)=>{
                console.log(response.data.identifier)
                let id = response.data.identifier
                setTimeout(() => {
                    defaultAxios.get(`https://resume-parser.affinda.com/public/api/v1/documents/${id}`, config1).then((response)=>{
                        console.log(response.data.data)
                        let data = response.data.data
                        let univeristy = ''
                        let linkedin = ''
                        data.education.forEach(element => {
                            if(element.organization.toLowerCase().includes('university')){
                                univeristy = element.organization
                            }
                        })
                        data.websites.forEach(element => {
                            if(element.toLowerCase().includes('linkedin.com')){
                                linkedin = element
                            }
                        })
                        if(linkedin===''){
                            this.props.triggerAlert(true, 'warning', "We couldn't retrieve your LinkedIn public url from the resume. Please insert it manually.", 10000)
                        }
                        this.setState({
                            fname: data.name.first,
                            lname: data.name.last,
                            email: data.emails[0],
                            univeristy: univeristy,
                            linkedin: linkedin,
                            major: 'whatever'// fix later
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
        return (
            <React.Fragment>
                <div className={classes.logo}>
                    MentorEd
                </div>
                <div>
                    <button onClick={()=>{this.fileInput.click()}}>Upload Resume</button> or manually fill the fields <br></br>
                    <input type="text" placeholder='First name' defaultValue={this.state.fname} onChange={this.fnameHandler}/> <br></br>
                    <input type="text" placeholder='Last name' defaultValue={this.state.lname} onChange={this.lnameHandler}/> <br></br>
                    <input type="text" placeholder='Email' defaultValue={this.state.email} onChange={this.emailHandler}/> <br></br>
                    <input type="text" placeholder='Linkedin Public URL' defaultValue={this.state.linkedin} onChange={this.linkedinHandler}/><br></br>
                    <input type="text" placeholder='University' defaultValue={this.state.univeristy} onChange={this.universityHandler}/> <br></br>
                    <input type="text" placeholder='Major' defaultValue={this.state.major} onChange={this.majorHandler}/> <br></br>
                    <a onClick={this.redirectHandler} href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&scope=r_liteprofile%20r_emailaddress&client_id=78q6bhbb9echn1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fadvisors">use your LinkedIn profile photo</a><br></br>
                    <button onClick={this.submitHandler}>Submit</button><br></br>
                </div>
                <Alert/>
                <input style={{"display":"none"}} ref={fileInput=>this.fileInput=fileInput} type="file" name='upload1' id='upload1' onChange={this.cvHandler}/>
                <input style={{"display":"none"}} ref={imageInput=>this.imageInput=imageInput} type="file" name='upload2' id='upload2' onChange={this.imageHandler}/>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
        triggerAlert: (alertOpen, alertType, alertMessage, alertDuration) => dispatch(alertActions.triggerAlert(alertOpen, alertType, alertMessage, alertDuration))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Advisors)