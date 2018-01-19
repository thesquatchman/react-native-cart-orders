import React, { Component } from 'react';
import {View,FlatList,TouchableOpacity,Text} from 'react-native'
import { Router, Stack, Scene, Actions, ActionConst } from 'react-native-router-flux';

import Client from '../api/Client'
import { setToken, getToken, clearToken } from '../api/Storage'



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false
    }
  }

   

  componentDidMount() {
    console.log(this.props)
    const {token} = this.props
    if (token){
      new Client(token).getOrders()
          .then((result) => {
            if (result.success) {
              //the token is good
              this.setState({data: result.orders})
            } else {
              //he token is no good
              console.log(result)
              clearToken()
              Actions.login({token:false})

            }
          })
          .catch((error) => {
            //the API call is no good
            console.log(error)
          })
    }
    
  }
  _onPressItem = (order) => {
    console.log(order)
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({item}) => (
    <View
      order={item}
      onPressItem={this._onPressItem}>
      <Text>{item._id}</Text>
      </View>
  )

  render() {
    return (
      <View>
        <Text>Home</Text>
         <FlatList
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}/>
      </View>
    )
  }
}