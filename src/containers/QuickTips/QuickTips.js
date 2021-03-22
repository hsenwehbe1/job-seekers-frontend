import React, { Component } from 'react'
import classes from './QuickTips.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Tip from './Tip/Tip'
export default class AboutUs extends Component {
    state = ({
        tab : true,
        data1 : ['It’s just as important to realize what it is you’re not good at. You can spend a lot of time trying to bring your math grade up from a B- to a B+, but is it even worth it if you hate every second? Why spend time becoming “less worse” at something that doesn’t even interest you? We don’t advocate failing any of your classes, but we do believe your time may be better spent becoming an expert in subjects that you are good at and do enjoy.', 'Continue to focus on subjects and hobbies that interest you, but also make sure you begin to get experiences outside of your home and school. It’s possible you have many other passions out there waiting to be discovered. You can also gain insight into how your interests can translate into real-life jobs. For example, if you love decorating and have a natural strength of organization you can turn that into a career in event planning, or interior design. But you may never be aware of all the career options available to you until you get outside of your comfort zone and explore.', "While some entry-level careers are more competitive than others, all jobs require work and preparation. Staying current on technology and industry trends gives you an advantage over other applicants. Most students are more up-to-date with technology than seasoned professionals, giving them the upper hand. Those same students however, show a lack of knowledge of industry trends. Visit your college library and read professional journals each month. These provide an in-depth look at the changing landscape inside your career and will help better prepare you for what's to come. Google offers a news subscription, customizable to any search word or phrase. Set up an automated search and receive up-to-date news alerts in your inbox each month.", "Students learn multiple skills in college. Some are related to your career; others may seem less useful. Open your mind to those so-called “useless” skills. They may come in handy one day. But don't stop there. The key is expansion. Expand your skills and knowledge. Companies look for team members with the ability to work in diverse settings. Look for courses that compliment your major. Anthropology majors can take a few business courses to increase their marketability. Photography students may want to take a few graphic design or art classes to help improve creativity and their “eye” for art.  Speak with your academic advisor for help selecting elective courses that compliment your major.", 'Where do you want to live? Will you have to move to a particular area to make it in your chosen career? What do you like to do all day? Is sitting at a desk for hours at a time going to make you miserable? Do you like working with other people, or do you prefer to work on solo projects most of the time? Do you want to have a lot of free time to spend with family or on hobbies? Will you be OK with working weekends and holidays? Do you want a job you can leave at the office, or are you OK with taking some work home with you?'],
        data2 : []
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