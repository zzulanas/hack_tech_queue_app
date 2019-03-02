import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import QRCode from 'react-native-qrcode';

export default class Qr extends Component {
    render() {
        return (
            <View>
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
