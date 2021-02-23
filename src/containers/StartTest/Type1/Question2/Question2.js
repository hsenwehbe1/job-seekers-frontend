import React, { Component } from 'react'
import classes from './Question2.css'
import {connect} from 'react-redux'
import * as authActions from '../../../../redux/actions/auth'
import { withRouter } from 'react-router-dom'
class Type1 extends Component{
    clickHandler = (event)=>{
        let arr = [...this.props.reduxAnswers]
        arr[1] = event.target.value
        this.props.saveAnswer(arr)
        let s = ['', '', '', '', '']
        s[event.target.id[0]] = classes.selected
        let r = [...this.props.reduxOptions]
        r[1] = s
        this.props.saveOptions(r)
    }
    render() {
        let option1 = ''
        let option2 = ''
        let option3 = ''
        let option4 = ''
        let option5 = ''
        if(this.props.reduxData.page){
            option1 = this.props.reduxData.questions.type1.q2[1]
            option2 = this.props.reduxData.questions.type1.q2[2]
            option3 = this.props.reduxData.questions.type1.q2[3]
            option4 = this.props.reduxData.questions.type1.q2[4]
            option5 = this.props.reduxData.questions.type1.q2[5]
        }
        return (
            <div className='mb-3'>
                <textarea onClick={this.clickHandler} type="text" className={`px-3 py-2 ${classes.input} ${this.props.reduxOptions[1][0]}`} readOnly value={option1} id='0q2'/><br></br>
                <textarea onClick={this.clickHandler} type="text" className={`px-3 py-2 mt-3 ${classes.input} ${this.props.reduxOptions[1][1]}`} readOnly value={option2} id='1q2'/><br></br>
                <textarea onClick={this.clickHandler} type="text" className={`px-3 py-2 mt-3 ${classes.input} ${this.props.reduxOptions[1][2]}`} readOnly value={option3} id='2q2'/><br></br>
                <textarea onClick={this.clickHandler} type="text" className={`px-3 py-2 mt-3 ${classes.input} ${this.props.reduxOptions[1][3]}`} readOnly value={option4} id='3q2'/><br></br>
                <textarea onClick={this.clickHandler} type="text" className={`px-3 py-2 mt-3 ${classes.input} ${this.props.reduxOptions[1][4]}`} readOnly value={option5} id='4q2'/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      reduxData: state.authState.data,
      reduxAnswers: state.authState.answers,
      reduxOptions: state.authState.options
    }
}
const mapDispatchToProps = dispatch => {
    return {
        saveData: (data) => dispatch(authActions.saveData(data)),
        saveAnswer: (answers) => dispatch(authActions.saveAnswer(answers)),
        saveOptions: (options) => dispatch(authActions.saveOption(options))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Type1))