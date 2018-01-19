import React, { Component } from 'react';
import { Router, Stack, Scene, Actions, ActionConst } from 'react-native-router-flux';
import { setToken, getToken, clearToken } from './api/Storage'

import Login from './containers/Login';
import Home from './containers/Home';
import Orders from './containers/Orders';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false
    }
  }

  componentWillMount = async () => {
    const token = await getToken()
    if (token) {
      this.setState({token: token})
      console.log(this.state)
      Actions.home({token: this.state.token})  
    }
  }

  _receivedToken = (token) => {
    this.setState({token}) //update state
    setToken(token) //update AsyncStorage with new token
    Actions.home({token}) 
  }


  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" token={this.state.token} passProps onReceivedToken={this._receivedToken.bind(this)} component={Login} title="Login"/>
          <Scene key="home" token={this.state.token} passProps  component={Home}/>
          <Scene key="orders" token={this.state.token} passProps  component={Orders} title="Orders"/>
        </Stack>
      </Router>
    );
  }
}