import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Qr from '../components/qr'
import { Font } from 'expo';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        We have no friends!
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});