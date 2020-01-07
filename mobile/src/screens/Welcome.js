import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar } from 'react-native'

export default class Welcome extends Component {
  render() {
    return (
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <StatusBar barStyle="dark-content"/>
        <Text> Welcome </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
