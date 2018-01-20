import React, { Component } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux'
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
          Actions.pop()
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
      <View>
        <Text>Order {order._id} : {order.status}</Text>
        <Text>Created At {order.createdAt}</Text>
        <Text>{order.firstname} {order.lastname}</Text>
        <Text>{order.email}</Text>

        <Text>Status</Text>
        
        <TouchableOpacity 
        onPress={() => this.setState({status: 'pending'})}>
          <Text style={this.state.status == 'pending' ? styles.pressed : styles.unpressed }>
          Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => this.setState({status: 'shipped'})}>
          <Text style={this.state.status == 'shipped' ? styles.pressed : styles.unpressed }>
          Shipped</Text>
        </TouchableOpacity>

        
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(tracking) => this.setState({tracking})}
        value={this.state.tracking}/>
        <TouchableOpacity onPress={this._onSubmitChanges.bind(this)}>
          <Text>Submit Changes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pressed: {
    color: 'blue',
    fontSize: 20,
  },
  unpressed: {
    color: 'gray',
    fontSize: 20,
  },
});

