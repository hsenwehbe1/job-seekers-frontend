import React, { Component } from 'react'
import classes from './AboutUs.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import WhiteSqaure from '../../components/WhiteSquare/WhiteSquare'
import AboutUs1 from '../../assets/icons/AboutUs1.svg'
import AboutUs2 from '../../assets/icons/AboutUs2.svg'
import AboutUs3 from '../../assets/icons/AboutUs3.svg'
import AboutUs4 from '../../assets/icons/AboutUs4.svg'
export default class AboutUs extends Component {
    render() {
        return (
            <div className="mt-4">
                <HeaderBar/>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <Sidebar page='about'/>
                    <div className="container">
                        <div className={`${classes.upper_part} px-0`}>
                            <div className={`${classes.text_lg}`}>
                                About MentorEd!
                            </div>
                            <div className="row container">
                                <div className="col-md-12 col-lg-6 my-3">
                                    <img src={AboutUs1} alt="" className="img-fluid"/>
                                </div>
                                <div className="col-md-12 col-lg-6 my-3">
                                    <WhiteSqaure title='Overview'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam enim earum dolor quis voluptatum tenetur praesentium nemo ratione hic, officia a et delectus consectetur veritatis cumque maxime sed ab quo numquam tempore quasi? Vero fuga iusto quia molestiae omnis pariatur accusamus id temporibus, quo, ut, perferendis repudiandae! Cumque, perspiciatis odio.</WhiteSqaure>
                                </div>
                                <div className="col-md-12 col-lg-6 my-3 order-lg-0 order-2">
                                    <WhiteSqaure title='Vision'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est asperiores ex natus molestias consequatur, cupiditate illo animi, aliquam distinctio dolorum perspiciatis maxime numquam. Perspiciatis?</WhiteSqaure>
                                </div>
                                <div className="col-md-12 col-lg-6 my-3 order-lg-0 order-1">
                                    <img src={AboutUs2} alt="" className="img-fluid"/>
                                </div>
                                <div className="col-md-12 col-lg-6 my-3 order-lg-0 order-2">
                                    <img src={AboutUs3} alt="" className="img-fluid"/>
                                </div>
                                <div className="col-md-12 col-lg-6 my-3 order-lg-0 order-3">
                                    <WhiteSqaure title='Mission'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, sunt. Possimus, repellendus! Iste, autem magnam numquam praesentium exercitationem labore obcaecati!</WhiteSqaure>
                                </div>
                                <div className="col-md-12 col-lg-6 my-3 order-lg-0 order-4">
                                    <WhiteSqaure title='Who are we?'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum cumque, similique ea facilis sapiente at!</WhiteSqaure>
                                </div>
                                <div className="col-md-12 col-lg-6 my-3 order-lg-0 order-3">
                                    <img src={AboutUs4} alt="" className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}