import React from 'react';
import {StyleSheet,View,Image,Text,KeyboardAvoidingView,StatusBar,Dimensions} from 'react-native';
import LoginForm from './loginform';
const {width : WIDTH,height : HEIGHT} = Dimensions.get('window');

export default class OkScreen extends React.Component{
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
			<View style={styles.container}>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#00ff00'
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