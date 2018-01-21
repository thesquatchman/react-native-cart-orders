import React, { Component } from 'react';
import {View,TextInput,StyleSheet,TouchableOpacity,Text} from 'react-native';
import s from '../styles/global'
import Client from '../api/Client'



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  _onPressButton = () => { 
    const body = this.state
    new Client().postLogin(body)
        .then((result) => {
          if (result.success) {
            //the token is good
            this.props.onReceivedToken(result.token)
          } else {
            //the token is no good
            console.log(result)
            
          }
        })
        .catch((error) => {
          //the API call is no good
          console.log(error)
        })
    
  }


  render() {
    return (
      <View style={s.container}>
        <TextInput style={s.input}
        placeholder={'email'}
        autoCapitalize={'none'}
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}/>
        <TextInput style={s.input}
        placeholder={'password'}
        autoCapitalize={'none'}
        secureTextEntry
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}/>
        <TouchableOpacity onPress={this._onPressButton.bind(this)}>
          <Text style={s.btn}>Submit</Text>
        </TouchableOpacity>

      </View>
    );
  }
}