import React, { Component } from 'react'
import classes from './StartTest.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Question from '../../components/Question/Question'
import Result from '../../components/Result/Result'
import Hobby from '../../components/Hobby/Hobby'
import Answer from '../../components/Answer/Answer'
export default class Home extends Component {
    state = ({
        first:{
            questions:['section 1 question 1', 'section 1 question 2', 'section 1 question 3'],
            currentQues:1
        },
        second:{
            questions:['section 2 question 1', 'section 2 question 2', 'section 2 question 3'],
            currentQues:1
        },
        third:{
            questions:['section 3 question 1', 'section 3 question 2', 'section 3 question 3'],
            currentQues:1
        },
        fourth:{
            questions:['section 4 question 1', 'section 4 question 2', 'section 4 question 3'],
            currentQues:1
        },
        unSelectedHobbies: ['Drawing', 'Sports', 'Computer Science', 'Music', 'Swimming', 'Computer Hardware', 'Hand Craft', 'Reading'],
        selectedHobbies: [],
        section: 1
    })
    rightHandler = ()=>{
        let currentState = {...this.state}
        if(this.state.section===1){
            if(this.state.first.currentQues!==3){
                let obj = {...currentState.first}
                obj.currentQues = obj.currentQues + 1
                currentState.first = obj
                this.setState({
                    ...currentState
                })
            }else{
                currentState.section = 2
                this.setState({
                    ...currentState
                })
            }
        }else if(this.state.section===2){
            if(this.state.second.currentQues!==3){
                let obj = {...currentState.second}
                obj.currentQues = obj.currentQues + 1
                currentState.second = obj
                this.setState({
                    ...currentState
                })
            }else{
                currentState.section = 3
                this.setState({
                    ...currentState
                })
            }
        }else if(this.state.section===3){
            if(this.state.third.currentQues!==3){
                let obj = {...currentState.third}
                obj.currentQues = obj.currentQues + 1
                currentState.third = obj
                this.setState({
                    ...currentState
                })
            }else{
                currentState.section = 4
                this.setState({
                    ...currentState
                })
            }
        }else if(this.state.section===4){
            currentState.section = 5
            this.setState({
                ...currentState
            })
        }
    }
    questionHandler = (result, id)=>{
        console.log(result, id)
    }
    answerHandler = (answer, id)=>{
        console.log(answer, id)
    }
    leftHandler = ()=>{
        console.log('left')
    }
    selectHobbyHandler = (index)=>{
        console.log(`${this.state.unSelectedHobbies[index]} was selected`)
        let unSelected = [...this.state.unSelectedHobbies]
        let selected = [...this.state.selectedHobbies]
        unSelected.splice(index, 1);
        selected.push(this.state.unSelectedHobbies[index])
        this.setState({
            ...this.state,
            unSelectedHobbies: unSelected,
            selectedHobbies: selected
        })
    }
    unSelectHobbyHandler = (index)=>{
        console.log(`${this.state.selectedHobbies[index]} was unselected`)
        let unSelected = [...this.state.unSelectedHobbies]
        let selected = [...this.state.selectedHobbies]
        selected.splice(index, 1);
        unSelected.push(this.state.selectedHobbies[index])
        this.setState({
            ...this.state,
            unSelectedHobbies: unSelected,
            selectedHobbies: selected
        })
    }
    render() {
        let content = ''
        let question = ''
        let number = ''
        let css1 = ''
        let css2 = ''
        let css3 = ''
        let css4 = ''
        let unSelectedHobbies = ''
        let selectedHobbies = ''
        unSelectedHobbies = (
            this.state.unSelectedHobbies.map((element, index)=>{
                return(
                    <Hobby text={element} cross={false} index={index} key={index} handler={this.selectHobbyHandler}/>
                )
            })
        )
        selectedHobbies = (
            this.state.selectedHobbies.map((element, index)=>{
                return(
                    <Hobby text={element} cross={true} index={index} key={index} handler={this.unSelectHobbyHandler}/>
                )
            })
        )
        if(this.state.section===1){
            number = this.state.first.currentQues
            question = this.state.first.questions[this.state.first.currentQues-1]
            content = <Question number={number} rightHandler={this.rightHandler} leftHandler={this.leftHandler} question={question} questionHandler={this.questionHandler}/>
        }else if(this.state.section===2){
            number = this.state.second.currentQues
            css1 = `${classes.active} ${classes.bold}`
            question = this.state.second.questions[this.state.second.currentQues-1]
            content = <Question number={number} rightHandler={this.rightHandler} leftHandler={this.leftHandler} question={question} questionHandler={this.questionHandler}/>
        }else if(this.state.section===3){
            number = this.state.third.currentQues
            css1 = css2 = `${classes.active} ${classes.bold}`
            question = this.state.third.questions[this.state.third.currentQues-1]
            content = <Question number={number} rightHandler={this.rightHandler} leftHandler={this.leftHandler} question={question} questionHandler={this.questionHandler}/>
        }else if(this.state.section===4){
            number = this.state.fourth.currentQues
            css1 = css2 = css3 = `${classes.active} ${classes.bold}`
            content = (
                <div className={`${classes.box_shadow} p-4 mt-5`}>
                    <div className={classes.text_lg}>Add your hobbies</div>
                    <div>Click on your hobbies</div>
                    <div className='row mt-4'>
                        <div className="col-sm-12 col-md-6">
                            {unSelectedHobbies}
                        </div>
                        <div className={`col-sm-12 col-md-6 px-4 py-2 ${classes.box}`}>
                            <div className='pb-1 text-danger'>My Board</div>
                            <div>
                                {selectedHobbies}
                            </div>
                        </div>
                    </div>
                    <i onClick = {this.rightHandler} className={`fas fa-arrow-circle-right`}></i>
                </div>
            )
        }else if(this.state.section===5){
            //number = this.state.first.currentQues
            css1 = css2 = css3 = css4 = `${classes.active} ${classes.bold}`
            content = <Result/>
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
                                            <li className={`${classes.user} ${classes.active} ${classes.bold}`}>Your personality</li>
                                            <li className={`${classes.mobile} ${css1}`}>Your past career</li>
                                            <li className={`${classes.email} ${css2}`}>Your degree</li>
                                            <li className={`${classes.success} ${css3}`}>Your interests</li>
                                            <li className={`${classes.end} ${css4}`}></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={classes.trial}>
                                    {content}
                                    <Answer selected={true} handler={this.answerHandler} question='Ane belaab fabol?'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}