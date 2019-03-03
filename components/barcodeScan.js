import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class BarcodeScannerExample extends React.Component {
  state = {
    queueLeader: null,
    username: null,
    hasCameraPermission: null,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    fetch(`http://52.14.110.228:3000/getQueueRid?rid=${this.props.restID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({
        queueLeader: responseJson[0]["QRCode"],
        username: responseJson[0]["username"]
      })

    })
    .catch((error) => {
      console.error(error);
    })
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log(this.state.queueLeader);
    console.log(data);
    console.log(this.state.username);
    if(data == this.state.queueLeader){
        fetch(`http://52.14.110.228:3000/updateQueue?username=${this.state.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
    })
    .catch((error) => {
      console.error(error);
    })
    this.handleBarCodeScanned();
    }else{
        alert('Not right customer.');
    }
  }
}
