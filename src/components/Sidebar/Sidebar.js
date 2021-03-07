import React, { Component } from 'react';
import SidebarIcons from '../SidebarIcons/SidebarIcons'
import {Link} from 'react-router-dom'
import classes from './Sidebar.css'
import Home from '../SidebarIcons/Icons/Home'
import Path from '../SidebarIcons/Icons/Path'
import CareerNews from '../SidebarIcons/Icons/CareerNews';
import QuickTips from '../SidebarIcons/Icons/QuickTips';
import About from '../SidebarIcons/Icons/About';
class Sidebar extends Component {
    state = ({
        isShown: false
    })
    togglerHandler = ()=>{
        this.setState({
            isShown: !this.state.isShown
        })
    }
    render() {
        let cssClass = ''
        let content = ''
        let content1 = ''
        let pages = {
            home: {
                active: false,
                color: '#133c59'
            },path: {
                active: false,
                color: '#133c59'
            },news: {
                active: false,
                color: '#133c59'
            },tips: {
                active: false,
                color: '#133c59'
            },about: {
                active: false,
                color: '#133c59'
            },terms: {
                color: '#133c59'
            },faq: {
                color: '#133c59'
            }
        }
        if(this.state.isShown){
            content1 = <i onClick={this.togglerHandler} className={`fa fa-times ${classes.toggler}`}></i>
            cssClass = classes.appear
        }else{
            content = <i onClick={this.togglerHandler} className={`fas fa-bars ${classes.toggler}`}></i>
            cssClass = classes.disappear
        }
        if(this.props.page==='home'){
            pages.home.active = true
            pages.home.color = '#007FEB'
        }else if(this.props.page==='about'){
            pages.about.active = true
            pages.about.color = '#007FEB'
        }else if(this.props.page==='path'){
            pages.path.active = true
            pages.path.color = '#007FEB'
        }else if(this.props.page==='faq'){
            pages.faq.color = '#007FEB'
        }else if(this.props.page==='terms&conditions'){
            pages.terms.color = '#007FEB'
        }else if(this.props.page==='tips'){
            pages.tips.active = true
            pages.tips.color = '#007FEB'
        }
        return (
            <div className={`${classes.main}`}>
                <div>
                    {content} 
                </div>
                <div className='position-relative'>
                    <div className="position-absolute" style={{'right':'7px', 'top':'2px'}}>{content1}</div>
                    <div className={`${classes.sidebar} bg-white ${cssClass}`}>
                        <SidebarIcons text='Home' selected={pages.home.active} icon={<Home color={pages.home.color}/>}/>
                        <SidebarIcons text='My path' selected={pages.path.active} icon={<Path color={pages.path.color}/>}/>
                        <SidebarIcons text='Careers news' icon={<CareerNews color='#133c59'/>}/>
                        <SidebarIcons text='Quick tips' selected={pages.tips.active} icon={<QuickTips color={pages.tips.color}/>}/>
                        <SidebarIcons text='About' selected={pages.about.active} icon={<About color={pages.about.color}/>}/>
                        <div className={`${classes.small_text} text-center`}>
                            <Link to='/terms&conditions' className={classes.link} style={{color: `${pages.terms.color}`}}>
                                T&Q
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link to='/faq' className={classes.link} style={{color: `${pages.faq.color}`}}>
                                FAQs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
