import React, { Component } from 'react'
import classes from './TermsAndConditions.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Box from './Box/Box'
export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="mt-4">
                    <HeaderBar/>
                    <div className={`${classes.body_container} px-3 mt-4`}>
                        <Sidebar page='terms&conditions'/>
                        <div className="container">
                            <div className={`${classes.upper_part} px-5`}>
                                <div className={`${classes.text_lg}`}>
                                    Terms & Conditions!
                                </div>
                                <div className={classes.fool}>
                                    <br></br>
                                    <div className={`${classes.bar} w-100`}>
                                        <Box title='Contact' number='1.1'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam, a delectus suscipit voluptates eligendi iusto ipsum vitae non nemo aut dolorem iste exercitationem rem assumenda unde officiis dignissimos. Laborum, non ex incidunt maiores nulla aperiam odio nemo amet expedita voluptates illum inventore repudiandae id deserunt distinctio aut. Harum, dolor?
                                        </Box><br></br>
                                        <Box title='Members and Visitors' number='1.2'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam, a delectus suscipit voluptates eligendi iusto ipsum vitae non nemo aut dolorem iste exercitationem rem assumenda unde officiis dignissimos. Laborum, non ex incidunt maiores nulla aperiam odio nemo amet expedita voluptates illum inventore repudiandae id deserunt distinctio aut. Harum, dolor?
                                        </Box><br></br>
                                        <Box title='Change' number='1.3'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam, a delectus suscipit voluptates eligendi iusto ipsum vitae non nemo aut dolorem iste exercitationem rem assumenda unde officiis dignissimos. Laborum, non ex incidunt maiores nulla aperiam odio nemo amet expedita voluptates illum inventore repudiandae id deserunt distinctio aut. Harum, dolor?
                                        </Box><br></br>
                                        <Box title='Obligations' number='1.4'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam, a delectus suscipit voluptates eligendi iusto ipsum vitae non nemo aut dolorem iste exercitationem rem assumenda unde officiis dignissimos. Laborum, non ex incidunt maiores nulla aperiam odio nemo amet expedita voluptates illum inventore repudiandae id deserunt distinctio aut. Harum, dolor?
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}