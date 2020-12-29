import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from '../../axios';
import Spinner from '../Spinner/Spinner';
class Verify extends Component {
    componentDidMount(){
        if(this.props.match.params.token){
            axios.post('/students/verify', {token : this.props.match.params.token}).then((response)=>{
                localStorage.setItem('token', response.data.token)
                this.props.history.push('/home')
            }).catch((err)=>{
    
            })
        }
    }
    render() {
        let content = ''
        if(this.props.match.params.token){
            content = (
                <div>
                    Validating account...
                    <Spinner/>
                </div>
            )
        }else{
            content = <h4 className="display-4">Email has been sent to {this.props.email}</h4>
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}
const mapStateToProps = state => {
    //console.log(state)
    return {
        email : state.authState.email
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //saveQuestions: (name) => dispatch(actions.saveQuestions(name))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Verify);
