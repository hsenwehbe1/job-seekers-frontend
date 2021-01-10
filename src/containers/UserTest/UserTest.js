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
                                    In order for us to estimate your personal Interests and Usual Style, you will first need to answer a series of questions. Read each pair of phrases below and decide which one of the two most describes you, then select the radio button next to that phrase.
                                </p>
                                <button onClick={()=>this.props.history.push('/test/start')} className={`btn btn-lg btn-danger ${classes.red}`}>Start Now</button><br></br><br></br>
                                <p className={classes.text}>
                                    Why taking the test?
                                </p>
                                <div className={`${classes.box_shadow} p-3 mb-5`}>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem natus accusamus impedit voluptatum aperiam dolores nobis nostrum atque, quidem ex.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem natus accusamus impedit voluptatum aperiam dolores nobis nostrum atque, quidem ex.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem natus accusamus impedit voluptatum aperiam dolores nobis nostrum atque, quidem ex.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(UserTest)