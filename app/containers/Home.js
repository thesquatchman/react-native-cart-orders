import React, { Component } from 'react';
import {View,FlatList,TouchableOpacity,Text,RefreshControl} from 'react-native'
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';

import Client from '../api/Client'
import { setToken, getToken, clearToken } from '../api/Storage'

import Preview from '../components/Preview'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: false,
      refreshing: false,
      error: false
    }
  }

  


  componentDidMount() {
    console.log(this.props)
    this._fetchData()
    
  }

  _fetchData = () => {
    const {token} = this.props
    if (token){
      this.setState({refreshing: true});
      new Client(token).getOrders()
          .then((result) => {
            if (result.success) {
              //the token is good
              this.setState({data: result.orders,refreshing: false})
            } else {
              //he token is no good
              clearToken()
              this.setState({error: result.error,refreshing: false})
              Actions.login({token:false})
            }
          })
          .catch((error) => {
            //the API call is no good
            his.setState({error,refreshing: false})
          })
    }
  }
  
  _onRefresh() {
    
    this._fetchData()
  } 


  _onPressItem = (order) => {
    Actions.order({order, token: this.props.token})
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({item}) => (
    <Preview
      order={item}
      onPressItem={this._onPressItem}>
    </Preview>
  )

  render() {
    return (
      <View>
        <Text>Home</Text>
        { this.state.error ? <Text>{this.state.error}</Text> :
         <FlatList
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            } 
            />
        }
      </View>
    )
  }
}