import React,{useState,useEffect} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import classes from './Interests.css'
import WhiteSqure from '../../components/WhiteSquare/WhiteSquare'
const Interests = () => {
    return (
        <div className="mt-4">
            <HeaderBar/>
            <div className={`${classes.body_container} px-3 mt-4`}>
                <Sidebar/>
                <div className={`d-lg-flex flex-column ${classes.my_interests}`}>
                    <div>
                        <div>
                            My Interests
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    <div>
                        <div>
                            Add new interests(up to 8)
                        </div>
                        <div>

                        </div>
                    </div>
                    <div>
                        <div style={{width:'100%'}}>
                            <input style={{width:'100%'}} type="text" placeholder="Type your interest"/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <ul>
                                <li>computer science</li>
                                <li>Design</li>
                                <li>Writing</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`d-lg-flex flex-column ${classes.careers_recommended}`}>
                    <WhiteSqure title="Best 5 careers recommended for you" setClass={false}>
                        <div>UX/Ui UX/Ui UX/Ui</div>
                        <div>UX/Ui UX/Ui UX/Ui</div>
                        <div>UX/Ui UX/Ui UX/Ui</div>
                        <div>UX/Ui UX/Ui UX/Ui</div>
                        <div>UX/Ui UX/Ui UX/Ui</div>
                    </WhiteSqure>
                    <div style={{marginTop:'21px'}}>

                    </div>
                    <WhiteSqure title="top 10 skills must have !" setClass={false}>
                        <ul>
                            <li>Html</li>
                            <li>Jquery</li>
                            <li>Css</li>
                            <li>Nodejs</li>
                            <li>React</li>
                        </ul>
                    </WhiteSqure>
                </div>
            </div>
        </div>
    )
}
export default Interests;
