import React, { Component } from 'react'
import classes from './Path.css'
import axios from '../../axios'
import sortObjectArray from 'sort-objects-array'
import Sidebar from '../../components/Sidebar/Sidebar'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import PathContainer from './PathContainer/PathContainer'
import Pagination from '@material-ui/lab/Pagination'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from './Dialog/Dialog'
export default class Path extends Component {
    state = ({
        page: 1, // for pagination,
        highlight: 0,
        data: [],
        numberOfEntryLevelRoles : 0,
        numberOfAdvisors: 0,
        myAdvisors: [],
        dialog: false, // viewing the dialog,
        dialogData: []
    })
    componentDidMount(){
        let config = {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('students/allroles', config).then((response)=>{
            console.log(response.data)
            this.setState({
                ...this.state,
                data: [...response.data]
            })
        }).catch((err)=>{

        })
        axios.get('students/entrylevel', config).then((response)=>{
            this.setState({
                ...this.state,
                numberOfEntryLevelRoles: response.data.data,
                numberOfAdvisors: response.data.advisors
            })
        }).catch((err)=>{

        })
        axios.get('students/myadvisors', config).then((response)=>{
            this.setState({
                ...this.state,
                myAdvisors: [...response.data]
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
    moreAdvisorsHandler = (event, totalAdvisors)=>{
        this.setState({
            ...this.state,
            dialog: !this.state.dialog,
            dialogData: [...totalAdvisors]
        })
        event.stopPropagation()
    }
    closeDialog = ()=>{
        this.setState({
            ...this.state,
            dialog: false,
        })
    }
    render() {
        let content = ''
        let dialog = ''
        content = (
            this.state.data.map((element, key) => {
                let index = (this.state.page - 1)*10
                if(key>=index && key<=index+9){
                    //get images of advisors & 3 more
                    let i = 0
                    let j = 0
                    let totalAdvisors = []
                    let images = (
                        this.state.myAdvisors.map((elem, index) => {
                            if(elem.roles.includes(element.role)){
                                totalAdvisors.push(elem)
                                i++
                                if(i<=3){
                                    return <Tooltip onClick={(e)=>{window.location.pathname = `advisor/${elem._id}`; e.stopPropagation()}} title={`${elem.fname} ${elem.lname}`}><img src={`data:image/png;base64,${elem.image}`} alt='Advisor' style={{'marginRight':'5px'}} className='rounded-circle' width='30px' height='30px' key={`xd${index}`} id={`k${index}`}/></Tooltip>
                                }else{
                                    j++
                                }
                                if(j!==0){
                                    return <small onClick={(event)=>{this.moreAdvisorsHandler(event, totalAdvisors)}} className={`small ${classes.more}`}> & {j} more</small>
                                }
                            }
                        })
                    )
                    return (
                        <PathContainer handler={this.pathClickHandler} title={element.role} roles={element.jobs} salary={`$${element.salary}`} advisors={images} bullets={true} sort={false} key={key}/>
                    )
                }
            })
        )
        if(this.state.dialog){
            dialog = <Dialog handler={this.closeDialog} isShown={true} data={this.state.dialogData}/>
        }
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
                                    <div className={classes.blue}>{this.state.numberOfEntryLevelRoles}</div>
                                    <div className='font-weight-light'>Number of entry level roles</div>
                                </div>
                            </div>
                            <div className="col-6 col-md-3 mt-sm-4 mb-sm-4 mt-md-0 mb-md-0">
                                <div className={classes.card}>
                                    <div className={classes.red}>{this.state.numberOfAdvisors}</div>
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
                            <PathContainer handler={()=>{}} title='Job Title' roles='Open Entry Level Roles' salary='Average Starting Salary' advisors='Mentors in my network' bullets={false} sort={true} highlight={this.state.highlight} rolesSortHandler={this.rolesSortHandler} salarySortHandler={this.salarySortHandler}/>
                            {content}
                            <div className='pt-3 pb-3 text-center' style={{'minWidth':'1000px'}}><Pagination onChange={this.paginationHandler} className='d-inline-block' count={Math.ceil(this.state.data.length/10)} size="small" /></div>
                        </div>
                    </div>
                </div>
                {dialog}
            </div>
        )
    }
}