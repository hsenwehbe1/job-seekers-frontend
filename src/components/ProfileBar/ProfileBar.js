import React, { Component } from 'react';
import Media from '../Media/Media'
import classes from './ProfileBar.css'
import axios from '../../axios'
class ProfileBar extends Component {
    state=({
        name: ''
    })
    componentDidMount(){
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('/students/info', config).then((response)=>{
            this.setState({
                name: response.data.fname + ' ' + response.data.lname
            })
        })
    }
    render() {
        return (
            <div className={`p-4 ${classes.slidebar} ${this.props.content}`}>
                <div>
                    <i className={`fa fa-times ${classes.cross}`} aria-hidden="true" onClick={this.props.close}></i>
                </div><br></br><br></br>
                <div className=''>
                    <div className="d-flex">
                        <img src={this.props.imageSrc} alt="John Doe"
                            className="flex-shrink-0" style={{"width":"75px", "height":"75px", "borderRadius":"10px"}}/>
                        <div>
                            <div className={classes.name}>{this.state.name}</div>
                            <button onClick={this.props.pushProfile} className={`${classes.profileBtn} btn btn-sm`}>Edit Profile</button>
                        </div>
                    </div>
                    <hr/>
                    <Media click={this.props.pushInterest} title="My Interest" content="Find your Interest"/><br></br>
                    <Media click={this.props.pushConnectors} title="My Connectors" content="Search and visit connectors and mentors profiles"/><br></br>
                </div>
                <div className={classes.footer}>
                    <button onClick={this.props.logout} className={`btn btn-outline-danger btn-sm ${classes.logout}`}>Logout</button>
                </div>
            </div>
        );
    }
}

export default ProfileBar;