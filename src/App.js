import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AboutUs from './containers/AboutUs/AboutUs'
import Home from './containers/Home/Home'
import StartTest from './containers/StartTest/StartTest'
import UserTest from './containers/UserTest/UserTest'
import Verify from './containers/Verify/Verify'
import Faq from './containers/FAQ/Faq'
import Profile from './containers/Profile/Profile'
import NotFound from './components/UnknownPage/UnknownPage'
import Landing from './containers/LandingPage/LandingPage'
import Interests from './containers/Interests/Interests'
import TermsAndConditions from './containers/TermsAndConditions/TermsAndConditions'
import Connectors from './containers/Connectors/Connectors'
import Settings from './containers/Settings/Settings'
import Advisors from './containers/Advisors/Advisors'
import Path from './containers/Path/Path'
import SpecificPath from './containers/Path/SpecificPath/SpecificPath'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path='/verify/:token' exact component={Verify}/>
            <Route path='/home' component={Home}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/interests' component={Interests}/>
            <Route path='/connectors' component={Connectors}/>
            <Route path='/settings' component={Settings}/>
            <Route path='/test' exact component={UserTest}/>
            <Route path='/test/start' component={StartTest}/>
            <Route path='/about' component={AboutUs}/>
            <Route path='/faq' component={Faq}/>
            <Route path='/My path' exact component={Path}/>
            <Route path='/My path/:role' exact component={SpecificPath}/>
            <Route path='/terms&conditions' component={TermsAndConditions}/>
            <Route path='/resetpassword' exact render={()=><Landing section='resetpassword'/>}/>
            <Route path='/resetpassword/:token' exact render={()=><Landing section='updatepassword'/>}/>
            <Route path='/login' render={()=><Landing section='login'/>}/>
            <Route path='/signup' render={()=><Landing section='signup'/>}/>
            <Route path='/advisors' component={Advisors}/>
            <Route path='/' exact render={()=><Landing section='landing'/>}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
export default App;