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
            content1 = <svg fill='#133C59' onClick={this.togglerHandler} className={classes.toggler1}><g><path d="M16 16V4h2v12h-2zM6 9l2.501-2.5-1.5-1.5-5 5 5 5 1.5-1.5-2.5-2.5h8V9H6z"></path></g></svg>
            cssClass = classes.appear
        }else{
            content = <svg fill='#133C59' onClick={this.togglerHandler} className={classes.toggler}><g><path d="M4 16V4H2v12h2zM13 15l-1.5-1.5L14 11H6V9h8l-2.5-2.5L13 5l5 5-5 5z"></path></g></svg>
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
        }else if(this.props.page==='news'){
            pages.news.active = true
            pages.news.color = '#007FEB'
        }
        return (
            <div className={`${classes.main}`}>
                <div>
                    {content} 
                </div>
                <div className='position-relative'>
                    <div className={classes.cross}>{content1}</div>
                    <div className={`${classes.sidebar} bg-white ${cssClass}`}>
                        <SidebarIcons text='Home' selected={pages.home.active} icon={<Home color={pages.home.color}/>}/>
                        <SidebarIcons text='My path' selected={pages.path.active} icon={<Path color={pages.path.color}/>}/>
                        <SidebarIcons text='Career news' selected={pages.news.active} icon={<CareerNews color={pages.news.color}/>}/>
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
