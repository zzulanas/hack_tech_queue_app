import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, Input, List, ListItem, Divider } from 'react-native-elements';
import Restaurant from './components/Restaurant';
import HostRestaurant from './components/HostRestaurant';
import Qr from './components/qr';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import BarcodeScan from './components/barcodeScan';
import MenuItem from './components/MenuItem';

const styles = StyleSheet.create({
  buttonStyle: {
      padding: 100
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  billStyle: {
    fontSize: 20,
    textAlign:'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#bdf7ad',
    borderRadius: 15,
  }
})
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Default',
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput containerStyle={{ height: 100 }} placeholder="Customer Username" onChangeText={(text) => this.setState({ text })}></TextInput>
          <Button title="Customer" onPress={() => this.props.navigation.navigate('Details', {
          name: this.state.text
        })} />
        <Button title="Host" onPress={() => this.props.navigation.navigate('HostCredentials')} />
      </View>
    );
  }
  
}

class RestaurantScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.addTotalAmount = this.addTotalAmount.bind(this);
    this.state = {
      totalAmt: 0.0
    }
  }
  addTotalAmount(price){
    this.setState({
      totalAmt: this.state.totalAmt + price
    })
    console.log(this.state.totalAmt);
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.billStyle}>Total Bill: ${this.state.totalAmt}</Text>
        <MenuItem foodName='Lasagna' price={15} picture='https://static01.nyt.com/images/2015/10/15/dining/15RECIPE20DIN/15RECIPE20DIN-superJumbo.jpg'  addTotal={this.addTotalAmount.bind(this)}/>      
        <MenuItem foodName='Lasagna' price={15} picture='https://static01.nyt.com/images/2015/10/15/dining/15RECIPE20DIN/15RECIPE20DIN-superJumbo.jpg' addTotal={this.addTotalAmount.bind(this)} />      
        <MenuItem foodName='Lasagna' price={15} picture='https://static01.nyt.com/images/2015/10/15/dining/15RECIPE20DIN/15RECIPE20DIN-superJumbo.jpg' addTotal={this.addTotalAmount.bind(this)} />
      </ScrollView>
    );
  }
}

class ModalScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'BLUBLUB');
    const rid = navigation.getParam('rid', 0);
    console.log(username);
    console.log(rid);
    this.state = {
      test: username,
      restAd: rid,
      qrStr: username + '_ID',
    }
  }
  componentDidMount() {
    fetch(`http://52.14.110.228:3000/setUser?username=${this.state.test}&rid=${this.state.restAd}&QRString=${this.state.qrStr}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          test: responseJson["username"]
        })

      })
      .catch((error) => {
        console.error(error);
      })
  }
  render() {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
        {this.state.restAd == 0 ? <Text>Restaurant does not exist!</Text> : <Qr text={this.state.qrStr} />}
        <Text style={{ fontSize: 30 }}>{this.state.test} </Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Exit Queue"
        />
        <Button
          onPress={() => this.props.navigation.navigate('Restaurant')}
          title="Restaurant Menu"
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      lat:'',
      lon:''
    }
  }
  componentDidMount() {
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD8_SAGyQxwHsDDk7ezhiJmOX6k6mkigO4`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          location: JSON.stringify(responseJson["location"], null, 4),
        })

      })
      .catch((error) => {
        console.error(error);
      })
  }
  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('name', 'NO-ID');
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.state.location}</Text>
        <Restaurant navigation={this.props.navigation} username={username} name="Blaze Pizza" rid={1} />
        <Restaurant navigation={this.props.navigation} username={username} name="Taco Bell" rid={2} />
        <Restaurant navigation={this.props.navigation} username={username} name="Panera" rid={3} />
      </View>
    );
  }
}

class HostScreen extends React.Component {
  /*render() {
    return (
      <BarcodeScan restID={4}/>
    );
  }*/
  render() {
    //const { navigation } = this.props;
    //const username = navigation.getParam('name', 'NO-ID');
    //console.log(username);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <HostRestaurant navigation={this.props.navigation} name="Blaze Pizza" rid={1} />
        <HostRestaurant navigation={this.props.navigation} name="Taco Bell" rid={2} />
        <HostRestaurant navigation={this.props.navigation} name="Panera" rid={3} />
      </View>
    );
  }
}

class QRScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const rid = navigation.getParam('rid', 'NO-RID');
    this.state = {
      test: rid,
    }
  }/*
  componentDidMount() {
    fetch(`http://52.14.110.228:3000/getQueueRid?rid=${this.state.test}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        
        this.setState({
          username: responseJson[0]["username"]
        })

      })
      .catch((error) => {
        console.error(error);
      })
  }*/

  render() {
    return (
      <BarcodeScan restID={this.state.test} />
    );
  }

}

class DetailsHostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }
  componentDidMount() {
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD8_SAGyQxwHsDDk7ezhiJmOX6k6mkigO4`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          location: responseJson["location"]
        })

      })
      .catch((error) => {
        console.error(error);
      })
  }
  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('name', 'NO-ID');
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{JSON.stringify(this.state.location, null, 4)}</Text>
        <Restaurant navigation={this.props.navigation} username={username} name="Blaze Pizza" rid={1} />
        <Restaurant navigation={this.props.navigation} username={username} name="Taco Bell" rid={2} />
        <Restaurant navigation={this.props.navigation} username={username} name="Panera" rid={3} />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Restaurant: {
      screen: RestaurantScreen,
    },
    HostCredentials: {
      screen: HostScreen,
    },
    DetailHost: {
      screen: DetailsHostScreen,
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
    toQRScanner: {
      screen: QRScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
