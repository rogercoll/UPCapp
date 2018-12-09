import React from 'react';
import {StyleSheet,View,Image,TextInput,TouchableOpacity,Text,StatusBar,ActivityIndicator,AsyncStorage} from 'react-native';
import { StackActions, NavigationActions, DrawerActions} from 'react-navigation';


let token = '';

const actionToDispatch = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'DrawerNavigator', params:{tet: 'roger'}} )], // Array!
});



export default class LoginForm extends React.Component{
	constructor(props) {
		super(props);
		this.state ={
            email :'',
			password:'',
			error: '', 
			loading: false
        };
	  }
	 _handlePress(){
		let that = this;
		this.setState({ loading: true });
		let link = "http://192.168.1.37:3000/?id="+this.state.email+"&password="+this.state.password;
		return fetch(link)
		.then((response) => response.json())
		.then((responseJson) => {
			that.setState({
			loading: false,
			dataSource: responseJson,
			}, function() {
				try {
					 AsyncStorage.setItem('TOKEN', responseJson.Token);
				  } catch (error) {
					// Error saving data
				  }
				console.log("Data from database got it sussesfully");
			});
			if(responseJson.Code == "200"){
				that.onLoginSuccess();
			}

		})
		.catch((error) => {
			console.error(error);
		});
		
	}
	onLoginFail() {
		this.setState({ error: 'Authentication Failed', loading: false });
	  }
	  _storeData = async () => {
		try {
		  await AsyncStorage.setItem('TOKEN', "GAAS");
		} catch (error) {
		  // Error saving data
		}
	  }

	  onLoginSuccess() {
		  
		token = this.state.email;
		this.setState({
		  email: '',
		  password: '',
		  loading: false,
		  error: ''
		});
		this.props.navigation.dispatch(actionToDispatch);
	  }
	
	renderButton(){
		if(this.state.loading){
			return(<TouchableOpacity style={styles.buttonContainer}>
			<ActivityIndicator size="large"/>
			</TouchableOpacity>)
		}else{
			return(
			<TouchableOpacity style={styles.buttonContainer} onPress={()=>this._handlePress()}>
				<Text style={styles.buttonText}>LOGIN</Text>
			</TouchableOpacity>)
		}
	}
	render(){
		return(
			<View style={styles.container}>
				<StatusBar
					barStyle="light-content"
				/>
				<TextInput
					placeholder="username"
					placeholderTextColor="rgba(255,255,255,0.7)"
					style={styles.input}
					underlineColorAndroid="rgba(0,0,0,0)"
					returnKeyType="next"
					onSubmitEditing={() => this.passwordInput.focus()}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
					onChangeText={(text)=> this.setState({email:text})}
				/>
				<TextInput
					placeholder="password"
					placeholderTextColor="rgba(255,255,255,0.7)"
					secureTextEntry={true}
					style={styles.input}
					underlineColorAndroid="rgba(0,0,0,0)"
					returnKeyType="go"
					ref={(input) => this.passwordInput = input}
					onChangeText={(text)=> this.setState({password:text})}
					onSubmitEditing={()=>this._handlePress()}
				/>
				{this.renderButton()}
				<Text style={styles.moreinfoText} onPress={()=>this.props.navigation.navigate('Login')}> More Info </Text>
				<Text> {this.dataSource}</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		padding: 20
	},
	input: {
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.2)',
		marginBottom: 12,
		color: 'white',
		paddingHorizontal: 10
	},
	buttonContainer:{
		height: 50,
		backgroundColor: '#e74c3c',
		paddingVertical: 15
	},
	buttonText:{
		textAlign: 'center',
		color: '#ffffff',
		fontWeight: '700'
	},
	moreinfoText: {
		color: '#ffffff',
		fontWeight: '900',
		textAlign: 'right',
		marginTop: 8
	}
});