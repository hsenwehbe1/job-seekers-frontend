import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AboutUs from './containers/AboutUs/AboutUs'
import Home from './containers/Home/Home'
import Homepage from './containers/Homepage'
import Fetch from './containers/Landing'
import Signup from './containers/Signup'
import StartTest from './containers/StartTest/StartTest'
import UserTest from './containers/UserTest/UserTest'
import Verify from './containers/Verify'
import Faq from './containers/FAQ/Faq'
import NotFound from './components/UnknownPage/UnknownPage'
import Landing from './containers/LandingPage/LandingPage'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            {/**<Route path='/signup' component={Signup}/>**/}
            <Route path='/verify/:token' exact component={Verify}/>
            {/**<Route path='/home' component={Homepage}/>**/}
            <Route path='/home' component={Home}/>
            <Route path='/test' exact component={UserTest}/>
            <Route path='/test/start' component={StartTest}/>
            <Route path='/about' component={AboutUs}/>
            <Route path='/faq' component={Faq}/>
            <Route path='/resetpassword' exact render={()=><Landing section='resetpassword'/>}/>
            <Route path='/resetpassword/:token' exact render={()=><Landing section='updatepassword'/>}/>
            <Route path='/login' render={()=><Landing section='login'/>}/>
            <Route path='/signup' render={()=><Landing section='signup'/>}/>
            <Route path='/' exact render={()=><Landing section='landing'/>}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
export default App;