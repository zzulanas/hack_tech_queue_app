import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Image, Card, Button } from 'react-native-elements'

export default class MenuItem extends Component {
    constructor(props){
        super(props);
    }
    onAddVal(){
        this.props.addTotal(this.props.price);
    }
  render() {
    return (
      <Card style={{justifyContent: 'space-evenly'}} containerStyle={{ borderRadius: 15}}>
        <Image style={{ width: 200, height: 200 }} source={{uri:this.props.picture}}/>
        <Text>{this.props.foodName}</Text>
        <Text>${this.props.price}</Text>
        <Button title="Order" onPress={this.onAddVal.bind(this)}/>
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
