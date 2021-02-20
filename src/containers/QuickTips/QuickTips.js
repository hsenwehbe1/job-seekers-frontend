import React, { Component } from 'react'
import classes from './QuickTips.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Tip from './Tip/Tip'
export default class AboutUs extends Component {
    state = ({
        tab : true,
        data1 : ['General tips General tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tipsGeneral tips', 'General tips', 'General tips', 'General tips', 'General tips', 'General tips'],
        data2 : ['Specific tips', 'Specific tips', 'Specific tips', 'Specific tips', 'Specific tips', 'Specific tips']
    })
    render() {
        let tab1 = ''
        let tab2 = ''
        let content = ''
        if(this.state.tab){
            tab1 = classes.active
            content = (
                this.state.data1.map((element, key) => {
                    return <Tip number={key+1} key={key}>{element}</Tip>
                })
            )
        }else{
            tab2 = classes.active
            content = (
                this.state.data2.map((element, key) => {
                    return <Tip number={key+1} key={key}>{element}</Tip>
                })
            )
        }
        return (
            <div className="mt-4">
                <HeaderBar/>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <Sidebar page='tips'/>
                    <div className="container">
                        <div className={`px-0`}>
                            <div className={`${classes.text_lg}`}>
                                Quick Tips
                            </div>
                            <div className='mt-3'>
                                <div onClick={()=>{this.setState({tab: true})}} className={`${classes.tab} ${tab1}`}>
                                    General Tips
                                </div>
                                <div onClick={()=>{this.setState({tab: false})}} className={`${classes.tab} ${tab2}`}>
                                    Specific Tips
                                </div>
                            </div>
                            <div className='mt-4'>
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}