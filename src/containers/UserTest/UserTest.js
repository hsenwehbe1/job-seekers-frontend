import React, { Component } from 'react'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Sidebar from '../../components/Sidebar/Sidebar'
import classes from './UserTest.css'
import BodyImage from '../../assets/icons/Dialog3.svg'
import { withRouter } from 'react-router-dom'
class UserTest extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="mt-4">
                    <HeaderBar/>
                    <div className={`${classes.body_container} px-3 mt-4`}>
                        <Sidebar/>
                        <div className="container px-5">
                            <div className={classes.text}>Get The Test</div>
                            <div className="text-center">
                                <img src={BodyImage} alt="img" className="img-fluid"/>
                                <p className={classes.content}>
                                    Start your test to allow us detect your path
                                </p>
                                <p className={classes.sub_content}>
                                    In order for us to estimate your personal interests and usual Style, you will first need to answer a series of questions. When answering, don't just let your grades be the driver of your response. Sometimes we know how to think but we aren't great test takers. Also, try your best to answer by focusing on the subject or skill and not whether you had a good experience in a specific class or with a specific teacher; sometimes we may be good at a subject but the way it is taught doesn't suit our learning style.
                                </p>
                                <button onClick={()=>this.props.history.push('/test/start')} className={`btn btn-lg btn-danger ${classes.red}`}>Start Now</button><br></br><br></br>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(UserTest)