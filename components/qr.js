import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import QRCode from 'react-native-qrcode';



export default class Qr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'ye'
        }
    }
    componentDidMount(){
        fetch('http://52.14.110.228:3000/howdi', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
              }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        this.setState({
            test: responseJson.username
        })
    }) 
}
    render() {
        return (
            <View>
                <Text>{this.state.test}</Text>
                <QRCode
                    value={this.props.text}
                    size={300}
                    bgColor='black'
                    fgColor='white' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});
