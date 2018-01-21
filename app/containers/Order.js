import React, { Component } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux'
import s from '../styles/global'
import Client from '../api/Client'
import { setToken, getToken, clearToken } from '../api/Storage'



export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.order.status,
      tracking: this.props.order.tracking,
      updating: false
    }
  }

 

  _onSubmitChanges = () => {
    this.setState({updating: true})
    const {token,order} = this.props
    new Client(token).updateOrder(order._id,this.state)
    .then((result) => {
        if (result.success) {
          //the token is good
          this.setState({updating: false})
          Actions.home({updated: result.order, token})
        } else {
          //he token is no good
          clearToken()
          this.setState({error: result.error,updating: false})
          Actions.login({token:false})
        }
      })
      .catch((error) => {
        //the API call is no good
        his.setState({error,updating: false})
      })
  }

  render() {
    const {order} = this.props
    return this.state.updating ? (
        <View>
          <Text>updating order...</Text>
        </View>
      ) : (
      <View style={s.container}>
        <Text>Order {order._id} : {order.status}</Text>
        <Text>Created At {order.createdAt}</Text>
        <Text>{order.firstname} {order.lastname}</Text>
        <Text>{order.email}</Text>
        { order.items.length > 0 ? order.items.map((item) => 
          <View  key={item.id} style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.qty}</Text>
            <Text>{item.formattedPrice}</Text>
          </View>
          ) : null }
        <Text>Status:</Text>
        <View style={styles.row}>
          <TouchableOpacity style={{flex:1}}
          onPress={() => this.setState({status: 'pending'})}>
            <Text style={this.state.status == 'pending' ? styles.pressed : styles.unpressed }>
            Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}}
          onPress={() => this.setState({status: 'shipped'})}>
            <Text style={this.state.status == 'shipped' ? styles.pressed : styles.unpressed }>
            Shipped</Text>
          </TouchableOpacity>
        </View>
        <Text>Tracking Number:</Text>
        <TextInput style={s.input} 
        onChangeText={(tracking) => this.setState({tracking})}
        value={this.state.tracking}/>
        <TouchableOpacity onPress={this._onSubmitChanges.bind(this)}>
          <Text  style={s.btn} >Submit Changes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10
  },
  row: {
    flexDirection: 'row',
  },
  unpressed: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
    backgroundColor: '#f3f3f3',
    margin: 5,
  },
  pressed: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
    backgroundColor: 'blue',
    color: 'white',
    margin: 5
  },

  
});

