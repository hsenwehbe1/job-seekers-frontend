import React, { Component } from 'react'
import axios from '../../axios'
import classes from './CareerNews.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import News from './New/New'
class CareerNews extends Component {
    state= ({
        data: []
    })
    componentDidMount(){
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('/students/news', config).then((response)=>{
            this.setState({
                data: [...response.data]
            })
        }).catch((err)=>{
    
        })
    }
    render() {
        let content = ''
        content = (
            this.state.data.map((element, index)=>{
                return (
                    <div key={index} className='col-12 col-md-4 col-lg-3' style={{'marginBottom':'30px'}}>
                        <News title={element.title} image={element.image} url={element.url}/>
                    </div>
                )
            })
        )
        return (
            <div className="mt-4">
                <HeaderBar/>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <Sidebar page='news'/>
                    <div className="container">
                        <div className={`${classes.upper_part} px-0`}>
                            <div className={`${classes.text_lg}`}>
                                Career News
                            </div>
                            <div className='row container' style={{'marginTop':'80px'}}>
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CareerNews