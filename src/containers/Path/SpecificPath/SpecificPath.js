import React, { Component } from 'react'
import classes from './SpecificPath.css'
import Sidebar from '../../../components/Sidebar/Sidebar'
import HeaderBar from '../../../components/HeaderBar/HeaderBar'
import Skill from './Skills/Skills'
import axios from '../../../axios'
import { withRouter } from 'react-router-dom'
import Spinner from '../../../components/Spinner/Spinner'
class SpecificPath extends Component {
    state = ({
        data: {},
        myAdvisors: [],
        spinner: false
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
        axios.get(`/students/specificrole/${this.props.match.params.role}`).then((response)=>{
            this.setState({
                ...this.state,
                data: {...response.data},
                spinner: false
            })
        })
        axios.get('students/myadvisors', config).then((response)=>{
            this.setState({
                ...this.state,
                myAdvisors: [...response.data]
            })
        }).catch((err)=>{

        })
    }
    render() {
        let pay = ''
        let text = ''
        let bullets = ''
        let skill = ''
        let education = ''
        if(this.state.data.salary){
            pay = `$${this.state.data.salary.split(' per')[0]}`
            text = `Per${this.state.data.salary.split(' per')[1]}`
            bullets = (
                this.state.data.detail.map((element, key)=>{
                    return (
                        <li key={`${key}a`}>{element}</li>
                    )
                })
            )
            skill = (
                this.state.data.skills.map((element, key)=>{
                    return (
                        <Skill key={`${key}b`}>{element}</Skill>
                    )
                })
            )
            education = (
                this.state.data.education_degree.map((element, key)=>{
                    return (
                        <li key={`${key}c`}>{element}</li>
                    )
                })
            )
        }
        let i = 0
        this.state.myAdvisors.map(element => {
            if(element.roles.includes(this.props.match.params.role)){
                i++
            }
        })
        return (
            <div className="mt-4">
                <HeaderBar/>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <Sidebar page='path'/>
                    {this.state.spinner?<Spinner/>:<div className="container">
                    <div className={`${classes.upper_part} px-0`}>
                        <div className={`${classes.text_lg}`}>
                            <i onClick={()=>{this.props.history.goBack()}} className="fas fa-long-arrow-alt-left" style={{'cursor':'pointer'}}></i> {this.state.data.role}
                        </div>
                        <div className='row mt-3'>
                            <div className="col-12 col-md-8">
                                <div className="row">
                                    <div className="col-12 col-sm-4">
                                        <div className={classes.card}>
                                            <div className={classes.blue}>{this.state.data.jobs}</div>
                                            <div className='font-weight-light'>Number of entry level roles</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className={classes.card}>
                                            <div className={classes.blue}>{pay}</div>
                                            <div className='font-weight-light'>{text}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className={classes.card}>
                                            <div className={classes.blue}>{i}</div>
                                            <div className='font-weight-light'>Advisors in your network</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='pt-3'>
                                    <p style={{'fontWeight':'390', 'lineHeight': '2rem'}}>
                                        {this.state.data.summary}<br></br>
                                    </p>
                                    <ul style={{'fontWeight':'390', 'lineHeight': '2rem'}}>
                                        {bullets}
                                    </ul>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-6">
                                            <div className='p-3 bg-white pb-1' style={{'borderRadius':'10px'}}>
                                                Education requirement
                                                <ul className={classes.list}>
                                                    {education}
                                                </ul>
                                            </div>
                                        </div>
                                    </div><br></br>
                                    <div>
                                        <strong>Top skills to consider for this role</strong>
                                        <div className={classes.skills}>
                                            {skill}
                                        </div>
                                    </div><br></br>
                                </div>
                            </div>
                            <div className={`col-12 col-md-4 ${classes.vids}`}>
                                <div className="row text-center">
                                    <div onClick={()=>{window.open(`https://www.youtube.com/watch?v=${this.state.data.video}`)}} className="col-12 col-sm-4 col-md-12">
                                        <img src={`https://img.youtube.com/vi/${this.state.data.video}/maxresdefault.jpg`} alt="video" className={`${classes.youtube} img-fluid mb-3`}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                </div>
            </div>
        )
    }
}
export default withRouter(SpecificPath)