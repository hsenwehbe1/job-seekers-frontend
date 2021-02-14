import React, { Component } from 'react'
import classes from './Path.css'
import sortObjectArray from 'sort-objects-array'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import PathContainer from './PathContainer/PathContainer'
import Pagination from '@material-ui/lab/Pagination'
import axios from '../../axios'
export default class Path extends Component {
    state = ({
        page: 1, // for pagination,
        highlight: 0,
        data: []
    })
    componentDidMount(){
        axios.get('students/allroles').then((response)=>{

            this.setState({
                ...this.state,
                data: [...response.data]
            })
        }).catch((err)=>{

        })
    }
    rolesSortHandler = ()=>{
        let arr = [...sortObjectArray(this.state.data, 'sortJobs')]
        this.setState({
            ...this.state,
            highlight: 1,
            data: arr
        })
    }
    salarySortHandler = ()=>{
        let arr = [...sortObjectArray(this.state.data, 'sortSalary')]
        this.setState({
            ...this.state,
            highlight: 2,
            data: arr
        })
    }
    paginationHandler = (element, value)=>{
        this.setState({
            ...this.state,
            page: value
        })
    }
    pathClickHandler = (role)=>{
        this.props.history.push(`/my path/${role}`)
    }
    render() {
        let display = ''
        let content = ''
        content = (
            this.state.data.map((element, key) => {
                let index = (this.state.page - 1)*10
                if(key>=index && key<=index+9){
                    return (
                        <PathContainer handler={this.pathClickHandler} title={element.role} roles={element.jobs} salary={`$${element.salary}`} advisors={element.advisors} bullets={true} sort={false} key={key}/>
                    )
                }
            })
        )
        return (
            <div className="mt-4">
                <HeaderBar/>
                <div className={`${classes.body_container} px-3 mt-4`}>
                    <Sidebar page='path'/>
                    <div className="container">
                        <div className={`${classes.upper_part} px-0 row`}>
                            <div className="col-md-6">
                                <div className={`${classes.text_lg}`}>
                                    Set yourself up for success!
                                </div>
                                <div className='font-weight-light' style={{'width':'300px'}}>Explore in demand careers and majors that play on your strengths and interests</div>
                            </div>
                            <div className="col-6 col-md-3 mt-sm-4 mb-sm-4 mt-md-0 mb-md-0">
                                <div className={classes.card}>
                                    <div className={classes.blue}>40K</div>
                                    <div className='font-weight-light'>Number of entry level roles</div>
                                </div>
                            </div>
                            <div className="col-6 col-md-3 mt-sm-4 mb-sm-4 mt-md-0 mb-md-0">
                                <div className={classes.card}>
                                    <div className={classes.red}>76K</div>
                                    <div className='font-weight-light'>Number of active mentors</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className={`dropdown ${classes.center}`}>
                                <button className="btn btn-white dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-tags" style={{'fontSize':'12px'}}></i> Labels
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><span className='dropdown-item'>Hello</span></li>
                                    <li><span className='dropdown-item'>Hello</span></li>
                                    <li><span className='dropdown-item'>Hello</span></li>
                                </ul>
                            </div>
                            <PathContainer handler={()=>{}} title='Job Title' roles='Open Entry Level Roles' salary='Average Starting Salary' advisors='Advisors in my network' bullets={false} sort={true} highlight={this.state.highlight} rolesSortHandler={this.rolesSortHandler} salarySortHandler={this.salarySortHandler}/>
                            {content}
                            <div className='pt-3 pb-3 text-center' style={{'minWidth':'1000px'}}><Pagination onChange={this.paginationHandler} className='d-inline-block' count={Math.ceil(this.state.data.length/10)} size="small" /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}