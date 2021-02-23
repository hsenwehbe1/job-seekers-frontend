import React, { Component } from 'react'
import classes from './Question4.css'
import {connect} from 'react-redux'
import * as authActions from '../../../../redux/actions/auth'
import { withRouter } from 'react-router-dom'
class Type1 extends Component{
    clickHandler = (event)=>{
        let arr = [...this.props.reduxAnswers]
        arr[3] = event.target.value
        this.props.saveAnswer(arr)
        let s = ['', '', '']
        s[event.target.id[0]] = classes.selected
        let r = [...this.props.reduxOptions]
        r[3] = s
        this.props.saveOptions(r)
    }
    render() {
        let option1 = ''
        let option2 = ''
        let option3 = ''
        if(this.props.reduxData.page){
            option1 = this.props.reduxData.questions.type1.q3[1]
            option2 = this.props.reduxData.questions.type1.q3[2]
            option3 = this.props.reduxData.questions.type1.q3[3]
        }
        return (
            <div className='mb-3'>
                <textarea onClick={this.clickHandler} type="text" className={`px-3 py-2 ${classes.input} ${this.props.reduxOptions[3][0]}`} readOnly value={option1} id='0q4'/><br></br>
                <textarea onClick={this.clickHandler} type="text" className={`px-3 py-2 mt-3 ${classes.input} ${this.props.reduxOptions[3][1]}`} readOnly value={option2} id='1q4'/><br></br>
                <textarea onClick={this.clickHandler} type="text" className={`px-3 py-2 mt-3 ${classes.input} ${this.props.reduxOptions[3][2]}`} readOnly value={option3} id='2q4'/>
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