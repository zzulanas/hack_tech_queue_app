import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Image, Card } from 'react-native-elements'

export default class MenuItem extends Component {
  render() {
    return (
      <Card style={{flex: 1, flexDirection:'row', justifyContent: 'space-evenly', borderRadius: 15}} image={{uri: this.props.imageLink}}>
        <Text>{this.props.foodName}</Text>
        <Text>{this.props.price}</Text>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
    images: {
        borderRadius: 15,
        height: 100,
        width: 100
    }
})
