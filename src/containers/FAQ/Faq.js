import React, { Component } from 'react'
import classes from './Faq.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Collapse from '../../components/Collapse/Collapse'
export default class Home extends Component {
    render() {
        let questions = ['Question1', 'Question2', 'Question3', 'Question4', 'Question5', 'Question6', 'Question7']
        let answers = ['Answer1', 'Answer2', 'Answer3', 'Answer4', 'Answer5', 'Answer6', 'Answer7']
        let content = ''
        let ques = ''
        let id= ''
        let label = ''
        content = (
            answers.map((element, index)=>{
                ques = questions[index]
                id = `col${index}`
                label = `Q${index+1}`
                return (
                    <React.Fragment>
                        <Collapse className='mt-3 mb-3' label={label} id={id} question={ques}>{element}</Collapse><br></br>
                    </React.Fragment>
                )
            })
        )
        return (
            <React.Fragment>
                <div className="mt-4">
                    <HeaderBar/>
                    <div className={`${classes.body_container} px-3 mt-4`}>
                        <Sidebar page='faq'/>
                        <div className="container">
                            <div className={`${classes.upper_part} px-5`}>
                                <div className={`${classes.text_lg}`}>
                                    FAQs!
                                </div>
                                <div className={classes.fool}>
                                    <br></br>
                                    <div className={`${classes.bar} ${classes.pt_6} w-100`}>
                                        <div className={`w-100 ${classes.outer}`}>
                                            <div className={`w-100 p-3 bg-white d-flex ${classes.inner}`}>
                                                <i className={`fas fa-search ${classes.searchIcon}`}></i>
                                                <input className={`w-100 ${classes.search}`} type="text" placeholder="Search questions"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-5'>
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}