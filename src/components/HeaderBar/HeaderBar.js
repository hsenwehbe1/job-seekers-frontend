import React, { Component } from 'react'
import classes from './HeaderBar.css'
import axios from '../../axios'
import { withRouter } from 'react-router-dom'
import ItemsBell from '../ItemsBell/ItemsBell'
import ProfileBar from '../ProfileBar/ProfileBar'

class HeaderBar extends Component {
    state = ({
        isShownProfile : false,
        imageSource : 'https://use.fontawesome.com/releases/v5.0.8/svgs/solid/user.svg'
    })
    componentDidMount = ()=>{
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('students/photo', config).then((response)=>{
            if(response.data.error==='notfound'){
            }else{
                this.setState({
                    ...this.state,
                    imageSource : `data:image/png;base64,${response.data.image}`
                })
            }
        })
    }
    closeHandler = ()=>{
        this.setState({
            isShownProfile : false
        })
    }
    openHandler = ()=>{
        this.setState({
            isShownProfile : true
        })
    }
    logoutHandler = ()=>{
        localStorage.removeItem('token')
        this.props.history.push('/')
    }
    pushInterest = () =>{
        this.props.history.push('/interests')
    }
    pushConnectors = () =>{
        this.props.history.push('/connectors')
    }
    pushSettings = () =>{
        this.props.history.push('/settings')
    }
    pushProfile = () =>{
        this.props.history.push('/profile')
    }
    render() {
        let imageSrc = this.state.imageSource
        if(this.props.image){
            imageSrc = this.props.image
        }
        let content = classes.hide
        if(this.state.isShownProfile){
            content = classes.show
        }
        return (
            <React.Fragment>
                <div className={`${classes.header_container} px-3`}>
                    <div onClick={()=>{window.location.pathname='home'}} className={`d-inline-block ${classes.platform_name} ${classes.float_left}`}>MentorEd</div>
                    <div className={`d-inline-block ${classes.float_right} px-2 py-1 bg-white ${classes.item} ${classes.pointer}`} onClick={this.openHandler}>
                        <span className={`${classes.small_text}`}>
                            ME 
                        </span>
                        <img style={{'borderRadius':'50%'}} src={imageSrc} alt="" width='20' height='20'/>
                    </div>
                    <div className={`d-inline-block ${classes.float_right} ${classes.spacing} px-2 py-1 bg-white ${classes.item}`}>
                        <i className={`united states flag ${classes.FlagIcon}`}></i>
                    </div>
                </div>
                <ProfileBar imageSrc={imageSrc} content ={`${content}`} close={this.closeHandler} 
                    logout={this.logoutHandler} pushProfile={this.pushProfile} pushInterest={this.pushInterest} pushConnectors={this.pushConnectors} pushSettings={this.pushSettings}/>
                    
            </React.Fragment>
        )
    }
}
export default withRouter(HeaderBar)