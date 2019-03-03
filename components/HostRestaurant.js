import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class HostRestaurant extends Component {
  render() {
    const rid = this.props.rid;
    console.log(rid);
    return (
      <View>
          <Card title={this.props.name}>
          <Text> Do you work for {this.props.name} </Text>
          <Button title="I Work Here!" onPress={() => {this.props.navigation.navigate('toQRScanner',{rid : rid})}}/>
          </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
