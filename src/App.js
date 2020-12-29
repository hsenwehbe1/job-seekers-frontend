import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './containers/homepage'
import Fetch from './components/landing'
import Signup from './containers/signup'
import Verify from './components/Verify/Verify'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path='/signup' component={Signup}/>
            <Route path='/verify/:token' component={Verify}/>
            <Route path='/verify' component={Verify}/>
            <Route path='/home' component={Homepage}/>
            <Route path='/' component={Fetch}/>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
export default App;