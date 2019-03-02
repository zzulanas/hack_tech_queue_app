import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

export class Restaurant extends Component {
  render() {
    return (
      <View>
          <Card title={this.props.name}>
          <Text> Hi welcome to {this.props.name} </Text>
          <Button title="Get in line!" onPress={() => this.props.navigation.navigate('Restaurant')}/>
          </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
