import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux'




export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <View>
        <Text>Orders</Text>
      </View>
    );
  }
}