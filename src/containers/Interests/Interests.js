import React, { Component } from 'react'
import classes from './Interests.css'
import axios from '../../axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import WhiteSqure from '../../components/WhiteSquare/WhiteSquare'
import InterestRow from '../../components/InterestRow/InterestRow'
import imageTest from '../../assets/images/0.jpg'
import Select from 'react-select'
import Interest from './Interest/Interest'
import Sort from 'sort-algorithms-js'
export default class Interesets extends Component {
    state = {
        roles: [],
        colors : ['#3BC3EB', '#F89691', '#5ef7de'],
        interests: [],
        advisors: []
    }
    componentDidMount(){
        let config = {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('students/info', config).then((response)=>{
            this.setState({
                ...this.state,
                interests: [...response.data.interests]
            })
        }).catch((error)=>{

        })
        axios.get('students/retreiveallroles', config).then((response)=>{
            let arr = [...Sort.mergeSort(response.data)]
            let objArr = []
            arr.forEach((element, index) => {
                objArr.push({label: element, value: index})
            })
            this.setState({
                ...this.state,
                roles: [...objArr]
            })
        }).catch((error)=>{

        })
        axios.get('advisors/all', config).then((response)=>{
            this.setState({
                ...this.state,
                advisors: [...response.data]
            })
        }).catch((error)=>{

        })
    }
    selectHandler = (e)=>{
        console.log(e)
    }
    render() {
        const SelectStyle = {
            control: (base, state) => ({
                ...base,
                border: 0,
                boxShadow: 0,
                borderRadius:'6px',
                cursor: 'text'
            })
        }
        let content = ''
        content = (
            this.state.interests.map((element, index)=>{
                let data = []
                this.state.advisors.forEach(elem => {
                    if(elem.roles.includes(element)){
                        data.push(elem)
                    }
                })
                return (
                    <InterestRow data={data} text={element}/>
                )
            })
        )
        return (
            <div className="mt-4">
                <HeaderBar/>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <Sidebar/>
                    <div className="container">
                        <div className={`${classes.upper_part} px-0`}>
                            <div className={`${classes.text_lg}`}>
                                Your Interests
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-5">
                                    <p className='mt-3 font-weight-light'>Add new interests<strong className='font-weight-bold'> (up to 3)</strong></p>
                                    <div className={classes.select_container}>
                                        <Select className={`${classes.search}`} placeholder="Search" styles={SelectStyle} onChange={this.selectHandler} options={this.state.roles}/>
                                    </div>
                                    <div className='mt-3'>
                                        {this.state.interests.map((element, index)=>{
                                            return (
                                                <Interest text={element} key={index} color={this.state.colors[index]}/>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={`col-12 col-sm-12 col-md-7 ${classes.cont}`}>
                                    <WhiteSqure title="Top 3 careers recommended for you" setClass={false}>
                                        {content}
                                    </WhiteSqure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}