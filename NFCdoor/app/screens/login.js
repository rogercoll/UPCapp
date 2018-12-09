import React from 'react';
import {StyleSheet,View,Image,Text,KeyboardAvoidingView,StatusBar,Dimensions} from 'react-native';
import LoginForm from './loginform';
const {width : WIDTH,height : HEIGHT} = Dimensions.get('window');

export default class LoginScreen extends React.Component{
	static  navigationOptions = {
		header: null
	}
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		}
	  }
	render(){
		if(this.state.isLoading){
			
		}
		return(
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<StatusBar backgroundColor='#c0392b' barStyle='light-content' />
				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={require('../assets/nfc-logo.png')} />
					<Text style={styles.title}> Login for NFC App </Text>
				</View>
				<View style={styles.formContainer}>
					<LoginForm navigation={this.props.navigation}/>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#c0392b'
	},
	logoContainer:{
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	logo: {
		width: 100,
		height: 100
	},
	title: {
		color: '#ffffff',
		marginTop: 10,
		width: 150,
		textAlign: 'center',
		opacity: 0.9
	},
	moreinfoContainer:{
		padding: 20,
		position: 'absolute',
		right: 5,
		bottom: 0
	},
	moreinfoText: {
		color: '#ffffff',
		fontWeight: '900'
	}
});