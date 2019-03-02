import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Restaurant from './components/Restaurant';
import Qr from './components/qr';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="login" onPress={() => this.props.navigation.navigate('Details')}/>
      </View>
    );
  }
}

class RestaurantScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Hey its a restaurant</Text>
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a your check in!</Text>
        <Qr text="jhfalskdhflksadfsadf"/>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Exit Queue"
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Restaurant navigation={this.props.navigation} name="Blaze Pizza"/>
        <Restaurant navigation={this.props.navigation} name="Taco Bell"/>
        <Restaurant navigation={this.props.navigation} name="Panera"/>
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
