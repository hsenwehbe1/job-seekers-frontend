import React, { Component } from 'react'
import classes from './Connectors.css'
import axios from '../../axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Button from './Button/Button'
import AdvisorCard from './AdvisorCard/AdvisorCard'
import Spinner from '../../components/Spinner/Spinner'
export default class AboutUs extends Component {
    state = ({
        data : [],
        interets: ['All', 'Software Developer', 'Design', 'UI/UX'],
        filter:[true, false, false, false],
        role: 'All',
        spinner: false
    })
    componentDidMount(){
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        this.setState({
            ...this.state,
            spinner: true,
        })
        axios.get('advisors/all', config).then((response)=>{
            console.log(response.data)
            this.setState({
                ...this.state,
                data: [...response.data],
                spinner: false
            })
        }).catch((error)=>{
            
        })
    }
    filterHandler = (id)=>{
        let arr = [...this.state.filter]
        if(!arr[id]){
            let newArr = new Array(arr.length).fill(false)
            newArr[id] = true
            this.setState({
                ...this.state,
                filter: [...newArr],
                role: this.state.interets[id]
            })
        }
    }
    render() {
        console.log(this.state.data)
        let btns = ''
        let content = ''
        btns= (
            this.state.interets.map((element, index)=>{
                return (
                    <Button handler={this.filterHandler} key={index} id={index} selected={this.state.filter[index]}>{element}</Button>
                )
            })
        )
        content = (
            this.state.data.map((element, index)=>{
                if(this.state.role==='All'){
                    return (
                        <div key={`p${index}`} className="col-lg-2 col-md-4 col-12 mt-3">
                            <AdvisorCard key={`q${index}`} name={`${element.fname} ${element.lname}`} role={element.roles} advisorid={element._id} image={<img className='rounded-circle' src={`data:image/png;base64,${element.image}`} alt='profile' width='63px' height='63px'/>}/>
                        </div>
                    )
                }else{
                    if(element.roles.includes(this.state.role)){
                        return (
                            <div key={`p${index}`} className="col-lg-2 col-md-4 col-12 mt-3">
                                <AdvisorCard key={`q${index}`} name={`${element.fname} ${element.lname}`} role={element.roles} advisorid={element._id} image={<img className='rounded-circle' src={`data:image/png;base64,${element.image}`} alt='profile' width='63px' height='63px'/>}/>
                            </div>
                        )
                    }
                }
            })
        )
        return (
            <div className="mt-4">
                <HeaderBar/>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <Sidebar page=''/>
                    <div className="container">
                        <div className={`${classes.upper_part} px-0`}>
                            <div className={`${classes.text_lg}`}>
                                My Connectors
                            </div>
                            <div className="">
                                <div className="bg-white p-3 text-center mt-3" style={{'borderRadius':'7px', 'width':'150px'}}>
                                    <div style={{'fontSize':'26px', 'color':'#007FEB'}}>12</div>
                                    <div className='font-weight-light'>Connections</div>
                                </div>
                                <div className='mt-4'>
                                    {btns}
                                </div>
                                <div className=''>
                                    <div className="row">
                                        {this.state.spinner ? <Spinner/> : content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}