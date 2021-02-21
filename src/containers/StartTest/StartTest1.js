import React, { Component } from 'react'
import classes from './StartTest.css'
import {connect} from 'react-redux'
import * as authActions from '../../redux/actions/auth'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Question1 from './Type1/Question1/Question1'
import Question2 from './Type1/Question2/Question2'
import Question3 from './Type1/Question3/Question3'
import Question4 from './Type1/Question4/Question4'
import Question5 from './Type1/Question5/Question5'
import Question6 from './Type2/Question1/Question1'
import { withRouter } from 'react-router-dom'
class StartTest1 extends Component {
    state = ({
        page: 1,
        questions: {
            type1: {
                q1: ['Have you taken Computer Science? If yes, did you like it?', 'I took it and found it interesting', 'I took it and I did not enjoy it', 'I have never taken Computer Science or Programming'],
                q2: ['Do you enjoy building things with your hands?', 'Very much so', 'Yes', 'Neutral', 'Not really', 'Not at all'],
                q3: ['When you picture yourself on the job in the future, are you working with data , people, things  or ideas?', 'data (numbers)', 'people (clients, patients, users, students...)', 'things (building materials)', 'ideas (creating new things)'],
                q4: ['Do you consider yourself a good test taker?', 'Yes, I test well', `No, I often know the material but don't do well on the exam`, `I don't know`],
                q5: ['Do you enjoy writing?', 'Very much so', 'Yes', 'Neutral', 'Not really', 'Not at all'],
                answers: new Array(5)
            },
            type2: {
                q1: ['Select the subjects you most enjoy', 'English', 'Math', 'Biology', 'Chemistry', 'Physics'],
                q2: ['d', 'e', 'f'],
                q3: ['g', 'h', 'i'],
                q4: ['j', 'k', 'l'],
                answers: new Array(4)
            },
            type3: {
                q1: ['a', 'b', 'c'],
                answers: new Array(1)
            }
        },
        index: 1
    })
    componentDidMount(){
        this.props.saveData(this.state)
    }
    backHandler = ()=>{
        if (this.state.index === 1) {
            this.setState({
                ...this.state,
                index: 1,
                page: this.state.page - 1
            })
        } else {
            this.setState({
                ...this.state,
                index: this.state.index - 1
            })
        }
    }
    nextHandler = ()=>{
        if (this.state.index < Object.keys(this.state.questions[`type${this.state.page}`]).length-1) {
            this.setState({
                ...this.state,
                index: this.state.index + 1
            })
        } else {
            this.setState({
                ...this.state,
                index: 1,
                page: this.state.page + 1
            })
        }
    }
    render() {
        const comps = {
            "t1q1": Question1,
            "t1q2": Question2,
            "t1q3": Question3,
            "t1q4": Question4,
            "t1q5": Question5,
            "t2q1": Question6
        }
        let page = Object.keys(this.state.questions[`type${this.state.page}`]).length-1
        let question = this.state.questions[`type${this.state.page}`][`q${this.state.index}`]
        let back = ''
        let backCss = classes.back
        let Content = ''
        //progress bar
        let css = ['', '', '', '']
        for (let i = 0; i < this.state.page; i++) {
            css[i] = `${classes.active} ${classes.bold}`
        }
        //page content
        Content = comps[`t${this.state.page}q${this.state.index}`]
        //back button
        if(this.state.page===1){
            if(this.state.index!==1){
                back = 'Back'
                backCss = ''
            }
        }else{
            back = 'Back'
            backCss = ''
        }
        return (
            <React.Fragment>
                <div className="mt-4">
                    <HeaderBar/>
                    <div className={`${classes.body_container} px-3 mt-4`}>
                        <Sidebar/>
                        <div className="container">
                            <div className={`px-5`}>
                                <div className={`${classes.text_lg}`}>
                                    Start The Test
                                    <div className={`pt-4`}>
                                        <ul className={`${classes.progressbar} ${classes.rb_square} d-flex justify-content-center`}>
                                            <li className={`${classes.user} ${css[0]}`}>Your personality</li>
                                            <li className={`${classes.mobile} ${css[1]}`}>Your past career</li>
                                            <li className={`${classes.email} ${css[2]}`}>Your degree</li>
                                            <li className={`${classes.success} ${css[3]}`}>Your interests</li>
                                            <li className={`${classes.end}`}></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={classes.content}>
                                    <p className='font-weight-bold'>{question[0]}</p>
                                    <div className='text-center'>
                                        <Content/>
                                    </div>
                                    <div className='row pt-2 text-center'>
                                        <div onClick={this.backHandler} className={`col-1 font-weight-bold text-decoration-underline ${backCss}`} style={{'cursor': 'pointer'}}>
                                            {back}
                                        </div>
                                        <div className="col-10">
                                            {this.state.index}/{page}
                                        </div>
                                        <div onClick={this.nextHandler} className="col-1 font-weight-bold text-decoration-underline" style={{'cursor': 'pointer'}}>
                                            Next
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveData: (data) => dispatch(authActions.saveData(data))
    }
}
export default withRouter(connect(null, mapDispatchToProps)(StartTest1))