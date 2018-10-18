import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,ScrollView,Dimensions, Image } from 'react-native';
import {createDrawerNavigator, DrawerItems, createStackNavigator} from 'react-navigation';
import HomeScreen from './home';
import Home2Screen from './home2';
import {Icon} from 'native-base';

const InnerStackNavigator = new createStackNavigator({
	TabNavigator : {screen : Home2Screen,
		navigationOptions:{
			drawerIcon: ({tintcolor}) => (
				<Icon name="home" style={{fontSize:24, color: tintcolor}} />
			),
		}
	},
})



const CustomDrawerComponent = (props) => (
	<SafeAreaView style = {{flex : 1, marginTop : 20}}>
		<View style={{height: 120, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
			<Image source={require('../assets/nfc-logo.png')} style={{height:100,width:100}} />
		</View>
		<ScrollView>
			<DrawerItems {...props}/>
		</ScrollView>
	</SafeAreaView>
)

const AppDrawerNavigator = new createDrawerNavigator({
	Home: InnerStackNavigator,
	Logout: HomeScreen
},{
	contentComponent: CustomDrawerComponent,
	contentOptions:{
		activeTintColor:'#A60A37'
	},
	
},
)

export default class Drawer extends React.Component {
	render() {
		return (
			<AppDrawerNavigator screenProps={{navigation: this.props.navigation}}/>
		);
	  }
}