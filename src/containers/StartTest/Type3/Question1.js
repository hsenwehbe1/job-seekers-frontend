import React, { Component } from 'react';
import classes from './Question1.css'
import Icon from './education.svg'
import Major from '../../../components/Hobby/Hobby'
import axios from '../../../axios'
import Sort from 'merge-sort'
import {connect} from 'react-redux'
import * as authActions from '../../../redux/actions/auth'
import { withRouter } from 'react-router-dom';
class Question1 extends Component {
    state = ({
        majors : [],
        roles: [],
        search: []
    })
    componentDidMount = ()=>{
        if(this.props.reduxAnswers[9]){
            this.setState({
                ...this.state,
                majors: [...this.props.reduxAnswers[9]]
            })
        }
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('students/retreiveallroles', config).then((response)=>{
            let arr = Sort(response.data)
            this.setState({
                roles: [...arr],
                search: [...arr]
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    majorHandler = (index)=>{
        let arr = [...this.state.majors]
        arr.splice(index, 1)
        let reduxAnswers = [...this.props.reduxAnswers]
        reduxAnswers[9] = arr
        this.props.saveAnswer(reduxAnswers)
        this.setState({
            majors: [...arr]
        })
    }
    searchHandler = (event)=>{
        let arr = []
        this.state.roles.forEach(element => {
            if(element.includes(event.target.value)){
                arr.push(element)
            }
        })
        if(arr.length===0){
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
        let arr = [...this.state.majors]
        let selected = this.state.search[event.target.id]
        arr.push(selected)
        let reduxAnswers = [...this.props.reduxAnswers]
        reduxAnswers[9] = arr
        this.props.saveAnswer(reduxAnswers)
        this.setState({
            majors: [...arr]
        })
    }
    render() {
        let css = ''
        let content = (
            this.state.majors.map((element, index)=>{
                return <Major key={`m${index}`} cross={true} text={element} index={index} handler={this.majorHandler}/>
            })
        )
        let list = (
            this.state.search.map((element, index)=>{
                if(this.state.majors.includes(element)){
                    return <div key={`o${index}`} className={`${classes.option} ${classes.selected}`} id={index}>{element}</div>
                }else{
                    return <div key={`o${index}`} className={classes.option} id={index} onClick={this.optionHandler}>{element}</div>
                }
            })
        )
        return (
            <div>
                <div className={classes.parent}>
                    <div className={`input-group ${classes.container} mt-5`}>
                        <div className={`input-group-prepend ${classes.borderless}`}>
                            <span className={`input-group-text ${classes.borderless}`}><img src={Icon} alt=''/></span>
                        </div>
                        <input onChange={this.searchHandler} className={`form-control ${classes.borderless}`} type="text" placeholder='Select major'/>
                    </div>
                </div>
                <div className={`${classes.dropdown}`}>
                    <div className={`${classes.options} ${css}`}>
                        {list}
                    </div>
                </div>
                <div className='mt-3 mb-3'>
                    {content}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
      reduxAnswers: state.authState.answers
    }
}
const mapDispatchToProps = dispatch => {
    return {
        saveAnswer: (answers) => dispatch(authActions.saveAnswer(answers))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question1))