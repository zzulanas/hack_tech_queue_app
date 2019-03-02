import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class Restaurant extends Component {
  render() {
    return (
      <View>
          <Card title={this.props.name}>
          <Text> Hi welcome to {this.props.name} </Text>
          <Button title="Get in line!" onPress={() => {this.props.navigation.navigate('MyModal')}}/>
          </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
