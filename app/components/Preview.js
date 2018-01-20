import React, { Component } from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';



export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
  }
  _onPressOrder = () => {
    this.props.onPressItem(this.props.order)
  }

  render() {
    const { order } = this.props
    return (
      <View>
        <TouchableOpacity
        onPress={this._onPressOrder.bind(this)}>
                  <Text>Order# {order._id}</Text>
                  <Text>Time: {order.createdAt}</Text>
                  <Text>Items {order.items.length}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}